import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class StatesService {
  constructor(private readonly databaseService: DatabaseService) {}

  // create(data: { name: string; color: string }) {
  //   return this.databaseService.state.create({ data });
  // }
  async create(data: { name: string; color: string }) {
    try {
      const lastState = await this.databaseService.state.findFirst({
        orderBy: { order: 'desc' },
      });

      const nextOrder = (lastState?.order ?? 0) + 1;

      return this.databaseService.state.create({
        data: { ...data, order: nextOrder },
      });
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

  findAll() {
    return this.databaseService.state.findMany({
      orderBy: {
        createdAt: 'asc', // oldest first
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

    // Delete the state
    await this.databaseService.state.delete({ where: { id } });

    // ✅ Reorder remaining states
    await this.reorderStates();
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
