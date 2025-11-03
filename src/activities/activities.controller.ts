import { Controller, Get } from '@nestjs/common';
import { ActivitiesService } from './activities.service';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activityService: ActivitiesService) {}

  @Get()
  findAll() {
    return this.activityService.findAll();
  }
}
