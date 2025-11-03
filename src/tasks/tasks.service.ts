import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from 'generated/prisma';
import { CreateTaskDto } from './dto/create-task.dto';
import { ActivitiesService } from 'src/activities/activities.service';
import { buildTaskActivity } from 'src/activities/utils/activity.util';

@Injectable()
export class TasksService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly activityService: ActivitiesService,
  ) {}

  async create(data: CreateTaskDto) {
    const {
      title,
      description,
      beginDate,
      finishDate,
      stateId,
      managerId,
      periorite,
      teamMembersIds = [],
    } = data;

    const task = await this.databaseService.task.create({
      data: {
        title,
        description,
        periorite,
        beginDate: beginDate ? new Date(beginDate) : undefined,
        finishDate: finishDate ? new Date(finishDate) : undefined,
        state: stateId ? { connect: { id: stateId } } : undefined,
        manager: managerId ? { connect: { id: managerId } } : undefined,
        teamMembers: teamMembersIds.length
          ? { connect: teamMembersIds.map((id) => ({ id })) }
          : undefined,
      },
      select: this.taskSelect(),
    });

    const activity = buildTaskActivity('CREATE', undefined, task);

    if (activity !== null) {
      await this.activityService.logActivity({
        userId: '0',
        entityId: task.id,
        ...activity,
      });
    }

    return task;
  }

  async findAll() {
    return this.databaseService.task.findMany({
      select: this.taskSelect(),
    });
  }

  async findOne(id: string) {
    return this.databaseService.task.findUnique({
      where: { id },
      select: this.taskSelect(),
    });
  }

  async update(id: string, data: Partial<CreateTaskDto>) {
    const { stateId, managerId, teamMembersIds, ...rest } = data;

    const oldTask = await this.databaseService.task.findUnique({
      where: { id },
      select: this.taskSelect(),
    });

    const updatedTask = await this.databaseService.task.update({
      where: { id },
      data: {
        ...rest,
        state: stateId ? { connect: { id: stateId } } : undefined,
        manager: managerId ? { connect: { id: managerId } } : undefined,
        teamMembers: teamMembersIds
          ? { set: teamMembersIds.map((id) => ({ id })) }
          : undefined,
      },
      include: {
        state: true,
        manager: true,
        teamMembers: true,
      },
    });

    const activity = buildTaskActivity('UPDATE', oldTask, updatedTask);

    if (activity && oldTask) {
      await this.activityService.logActivity({
        userId: '0',
        entityId: oldTask?.id,
        ...activity,
      });
    }

    return updatedTask;
  }

  async delete(id: string) {
    return this.databaseService.task.delete({
      where: { id },
    });
  }

  // 👇 Helper to define consistent response shape
  private taskSelect() {
    return {
      id: true,
      title: true,
      description: true,
      addedDate: true,
      lastModified: true,
      beginDate: true,
      finishDate: true,
      stateId: true,
      managerId: true,
      periorite: true,
      state: {
        select: {
          id: true,
          name: true,
          color: true,
        },
      },
      manager: {
        select: this.memberSelect(),
      },
      teamMembers: {
        select: this.memberSelect(),
      },
      subtasks: {
        select: {
          id: true,
          title: true,
          status: true,
          lastModified: true,
          teamMembers: {
            select: this.memberSelect(),
          },
          manager: {
            select: this.memberSelect(),
          },
        },
      },
    };
  }

  private memberSelect() {
    return {
      id: true,
      name: true,
      email: true,
      // phoneNumber: true,
      // role: true,
    };
  }
}
