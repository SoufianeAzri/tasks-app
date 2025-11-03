import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { DatabaseModule } from 'src/database/database.module';
import { ActivitiesModule } from 'src/activities/activities.module';

@Module({
  imports: [DatabaseModule, ActivitiesModule],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
