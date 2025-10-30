import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { StatesService } from './states.service';

@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Post()
  create(@Body() data: { name: string; color: string }) {
    return this.statesService.create(data);
  }

  @Get()
  findAll() {
    return this.statesService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.statesService.update(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.statesService.delete(+id);
  }
}
