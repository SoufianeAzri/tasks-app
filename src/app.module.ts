import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { StatesModule } from './states/states.module';
import { TasksModule } from './tasks/tasks.module';
import { SubtasksModule } from './subtasks/subtasks.module';
import { ActivitiesModule } from './activities/activities.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [DatabaseModule, UsersModule, StatesModule, TasksModule, SubtasksModule, ActivitiesModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
