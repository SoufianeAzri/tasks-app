import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class StatesService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(data: { name: string; color: string }) {
    return this.databaseService.state.create({ data });
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
