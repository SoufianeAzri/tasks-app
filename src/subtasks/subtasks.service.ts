import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';

@Injectable()
export class SubtasksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(dto: CreateSubtaskDto) {
    const { teamMembersIds, ...data } = dto;

    const subtask = await this.databaseService.subtask.create({
      data: {
        ...data,
        status: false,
        teamMembers: teamMembersIds
          ? { connect: teamMembersIds.map((id) => ({ id })) }
          : undefined,
      },
      select: this.subtaskSelect(),
    });

    return subtask;
  }

  async findAll() {
    return this.databaseService.subtask.findMany({
      select: this.subtaskSelect(),
    });
  }

  async findOne(id: string) {
    return this.databaseService.subtask.findUnique({
      where: { id },
      select: this.subtaskSelect(),
    });
  }

  async update(id: string, dto: UpdateSubtaskDto) {
    const { teamMembersIds, ...data } = dto;

    const updated = await this.databaseService.subtask.update({
      where: { id },
      data: {
        ...data,
        ...(teamMembersIds && {
          teamMembers: { set: teamMembersIds.map((id) => ({ id })) },
        }),
      },
      select: this.subtaskSelect(),
    });

    return updated;
  }

  // change status
  async changeStatus(id: string, status: boolean) {
    const updated = await this.databaseService.subtask.update({
      where: { id },
      data: { status },
      select: this.subtaskSelect(),
    });
    return updated;
  }

  async remove(id: string) {
    return this.databaseService.subtask.delete({
      where: { id },
    });
  }

  private subtaskSelect() {
    return {
      id: true,
      title: true,
      status: true,
      taskId: true,
      managerId: true,
      addedDate: true,
      lastModified: true,
      manager: {
        select: this.memberSelect(),
      },
      teamMembers: {
        select: this.memberSelect(),
      },
    };
  }

  private memberSelect() {
    return {
      id: true,
      name: true,
      email: true,
    };
  }
}
