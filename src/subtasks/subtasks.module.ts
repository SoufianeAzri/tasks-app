import { Module } from '@nestjs/common';
import { SubtasksService } from './subtasks.service';
import { SubtasksController } from './subtasks.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [SubtasksService],
  controllers: [SubtasksController],
  imports: [DatabaseModule],
})
export class SubtasksModule {}
