import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class StatesService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(data: { name: string; color: string }) {
    return this.databaseService.state.create({ data });
  }

  findAll() {
    return this.databaseService.state.findMany();
  }

  update(id: number, data: { name?: string; color?: string }) {
    return this.databaseService.state.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.databaseService.state.delete({ where: { id } });
  }
}
