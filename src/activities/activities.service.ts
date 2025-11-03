import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ActivitiesService {
  constructor(private readonly databaseService: DatabaseService) {}

  findAll() {
    return this.databaseService.activity.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async logActivity({
    userId,
    entityId,
    description,
    entityTitle,
    type,
    isOldState,
    oldState,
    newState,
  }: {
    userId: string;
    entityId: string;
    description: string;
    entityTitle?: string;
    type: number;
    isOldState: boolean;
    oldState?: string | null;
    newState?: string | null;
  }) {
    return this.databaseService.activity.create({
      data: {
        userId,
        entityType: 'TASK',
        entityId,
        description,
        entityTitle,
        type,
        isOldState,
        oldState,
        newState,
      },
    });
  }
}
