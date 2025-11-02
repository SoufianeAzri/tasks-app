import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from 'generated/prisma';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly databaseService: DatabaseService) {}

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

    return this.databaseService.task.create({
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

    return this.databaseService.task.update({
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
