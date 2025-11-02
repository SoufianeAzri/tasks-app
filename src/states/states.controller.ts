import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { StatesService } from './states.service';
import { ReorderStatesDto } from './dto/reorder-states.dto';
import { CreateStateDto } from './dto/create-state.dto';

@Controller('states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Post()
  create(@Body() data: CreateStateDto) {
    return this.statesService.create(data);
  }

  @Get()
  findAll() {
    return this.statesService.findAll();
  }

  @Patch('reorder')
  async reorder(@Body() dto: ReorderStatesDto) {
    return this.statesService.reorderStatesManual(dto.statesIds);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.statesService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.statesService.delete(id);
  }
}
