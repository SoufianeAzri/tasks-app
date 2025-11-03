import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  exports: [ActivitiesService],
  providers: [ActivitiesService],
  controllers: [ActivitiesController]
})
export class ActivitiesModule {}
