import { ConflictException, Injectable } from '@nestjs/common';
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
      return await this.databaseService.state.create({ data });
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
    return this.databaseService.state.findMany();
  }

  update(id: string, data: { name?: string; color?: string }) {
    return this.databaseService.state.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.databaseService.state.delete({ where: { id } });
  }
}
