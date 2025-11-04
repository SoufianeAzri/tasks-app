import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';
import { CreateStateDto } from './dto/create-state.dto';

@Injectable()
export class StatesService {
  constructor(private readonly databaseService: DatabaseService) {}

  // create(data: { name: string; color: string }) {
  //   return this.databaseService.state.create({ data });
  // }
  async create(data: CreateStateDto) {
    const findState = await this.databaseService.state.findFirst({
      where: { OR: [{ name: data.name }, { color: data.color }] },
    });

    if (findState) {
      throw new ConflictException(
        'State with this name or color already exists',
      );
    }

    const lastState = await this.databaseService.state.findFirst({
      orderBy: { order: 'desc' },
    });

    const nextOrder = (lastState?.order ?? 0) + 1;

    return this.databaseService.state.create({
      data: { ...data, order: nextOrder },
    });
  }

  findAll() {
    return this.databaseService.state.findMany({
      orderBy: {
        order: 'asc', // oldest first
      },
    });
  }

  update(id: string, data: { name?: string; color?: string }) {
    try {
      return this.databaseService.state.update({ where: { id }, data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            'State with this name or color already exists',
          );
        }
      }
      throw error;
    }
  }

  async delete(id: string) {
    const state = await this.databaseService.state.findUnique({
      where: { id },
    });
    if (!state) throw new NotFoundException('State not found');

    // Check if state has related tasks
    const relatedTasksCount = await this.databaseService.task.count({
      where: { stateId: id },
    });

    if (relatedTasksCount > 0) {
      throw new ForbiddenException(
        'Cannot delete this state because it has related tasks',
      );
    }

    // delete the state
    await this.databaseService.state.delete({ where: { id } });

    // reorder remaining states
    await this.reorderStates();
  }

  async reorderStatesManual(statesIds: string[]) {
    if (!statesIds || !statesIds.length) {
      throw new Error('No states provided for reordering');
    }

    await this.databaseService.$transaction(
      statesIds.map((id, index) =>
        this.databaseService.state.update({
          where: { id },
          data: { order: index + 1 },
        }),
      ),
    );

    return this.databaseService.state.findMany({
      orderBy: { order: 'asc' },
    });
  }

  private async reorderStates() {
    const states = await this.databaseService.state.findMany({
      orderBy: { order: 'asc' },
    });

    await this.databaseService.$transaction(
      states.map((state, index) =>
        this.databaseService.state.update({
          where: { id: state.id },
          data: { order: index + 1 },
        }),
      ),
    );
  }
}
