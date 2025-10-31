import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { SubtasksService } from './subtasks.service';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';
import { ChangeSubtaskStatusDto } from './dto/change-subtask.dto';

@Controller('subtasks')
export class SubtasksController {
  constructor(private readonly subtasksService: SubtasksService) {}

  @Post()
  create(@Body() dto: CreateSubtaskDto) {
    return this.subtasksService.create(dto);
  }

  @Get()
  findAll() {
    return this.subtasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.subtasksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() dto: UpdateSubtaskDto) {
    return this.subtasksService.update(id, dto);
  }

  // 🟩 NEW: change subtask status
  @Patch(':id/status')
  changeStatus(
    @Param('id', ParseIntPipe) id: string,
    @Body() dto: ChangeSubtaskStatusDto,
  ) {
    return this.subtasksService.changeStatus(id, dto.status);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.subtasksService.remove(id);
  }
}
