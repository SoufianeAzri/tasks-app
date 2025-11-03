import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import {
  subMonths,
  startOfMonth,
  endOfMonth,
  format,
  eachMonthOfInterval,
  startOfYear,
  endOfYear,
} from 'date-fns';
import { fr } from 'date-fns/locale';
import { taskSelect } from 'src/helpers';

@Injectable()
export class DashboardService {
  constructor(private readonly databaseService: DatabaseService) {}

  private calcPercentageChange(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  }

  async getDashboardStats() {
    const now = new Date();
    const thisMonthStart = startOfMonth(now);
    const thisMonthEnd = endOfMonth(now);
    const lastMonthStart = startOfMonth(subMonths(now, 1));
    const lastMonthEnd = endOfMonth(subMonths(now, 1));

    const [allusers, allstates, allTasks] = await Promise.all([
      this.databaseService.user.count(),
      this.databaseService.state.count(),
      this.databaseService.task.count(),
    ]);

    // --- Counts Percentage (users, tasks, states)
    const [usersThis, usersLast, tasksThis, tasksLast, statesThis, statesLast] =
      await Promise.all([
        this.databaseService.user.count({
          where: { addedDate: { gte: thisMonthStart, lte: thisMonthEnd } },
        }),
        this.databaseService.user.count({
          where: { addedDate: { gte: lastMonthStart, lte: lastMonthEnd } },
        }),
        this.databaseService.task.count({
          where: { addedDate: { gte: thisMonthStart, lte: thisMonthEnd } },
        }),
        this.databaseService.task.count({
          where: { addedDate: { gte: lastMonthStart, lte: lastMonthEnd } },
        }),
        this.databaseService.state.count({
          where: { createdAt: { gte: thisMonthStart, lte: thisMonthEnd } },
        }),
        this.databaseService.state.count({
          where: { createdAt: { gte: lastMonthStart, lte: lastMonthEnd } },
        }),
      ]);

    // --- 2️⃣ Tasks grouped by state
    const tasksByState = await this.databaseService.task.groupBy({
      by: ['stateId'],
      _count: { stateId: true },
    });

    const stateIds = tasksByState
      .map((t) => t.stateId)
      .filter((id): id is string => id !== null);

    const states = await this.databaseService.state.findMany({
      where: { id: { in: stateIds } },
      select: { id: true, name: true, color: true },
    });

    const tasksByStateWithName = tasksByState.map((t) => {
      const state = states.find((s) => s.id === t.stateId);
      return {
        state: state?.name || 'Inconnu',
        color: state?.color || '#ccc',
        count: t._count.stateId,
      };
    });

    // --- 3️⃣ Recent Users
    const recentUsers = await this.databaseService.user.findMany({
      take: 3,
      orderBy: { addedDate: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        addedDate: true,
        role: true,
      },
    });

    // --- 4️⃣ State Distribution (%)
    const totalTasks = await this.databaseService.task.count();
    const stateDistribution = tasksByStateWithName.map((s) => ({
      state: s.state,
      color: s.color,
      percentage:
        totalTasks > 0 ? ((s.count / totalTasks) * 100).toFixed(1) + '%' : '0%',
    }));

    // --- 5️⃣ Monthly state-task breakdown (converted to statesStats format)
    const monthsRange = eachMonthOfInterval({
      start: startOfYear(now), // ✅ start from January
      end: endOfYear(now), // ✅ end in December
    });

    // Prepare a map of all states
    const statesData = await this.databaseService.state.findMany({
      select: { id: true, name: true, color: true },
    });

    const stateMap: Record<
      string,
      { state: string; color: string; monthsTasksData: number[] }
    > = {};

    // Initialize stateMap for each known state
    statesData.forEach((s) => {
      stateMap[s.id] = {
        state: s.name,
        color: s.color,
        monthsTasksData: Array(monthsRange.length).fill(0),
      };
    });

    // Loop through each month and fill counts
    for (const [monthIndex, month] of monthsRange.entries()) {
      const monthStart = startOfMonth(month);
      const monthEnd = endOfMonth(month);

      const tasks = await this.databaseService.task.groupBy({
        by: ['stateId'],
        _count: { stateId: true },
        where: {
          addedDate: { gte: monthStart, lte: monthEnd },
        },
      });

      // Assign counts per state per month
      for (const t of tasks) {
        if (!t.stateId) return;
        const stateEntry = stateMap[t.stateId];
        if (stateEntry) {
          stateEntry.monthsTasksData[monthIndex] = t._count.stateId;
        } else {
          // Handle unknown state (if any)
          if (!stateMap['unknown']) {
            stateMap['unknown'] = {
              state: 'Inconnu',
              color: '#ccc',
              monthsTasksData: Array(monthsRange.length).fill(0),
            };
          }
          stateMap['unknown'].monthsTasksData[monthIndex] = t._count.stateId;
        }
      }
    }

    // Final formatted result
    const statesStats = Object.values(stateMap);

    const recentTasks = await this.databaseService.task.findMany({
      take: 3,
      orderBy: { addedDate: 'desc' },
      select: taskSelect(),
    });

    // --- Return all dashboard data
    return {
      users: {
        count: allusers,
        change: this.calcPercentageChange(usersThis, usersLast),
      },
      tasks: {
        count: allTasks,
        change: this.calcPercentageChange(tasksThis, tasksLast),
      },
      states: {
        count: allstates,
        change: this.calcPercentageChange(statesThis, statesLast),
      },
      tasksByState: tasksByStateWithName,
      stateDistribution,
      recentUsers,
      statesStats,
      recentTasks,
    };
  }
}
