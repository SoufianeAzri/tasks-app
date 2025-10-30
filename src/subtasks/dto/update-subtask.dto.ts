import { CreateSubtaskDto } from "./create-subtask.dto";
import { PartialType } from "@nestjs/mapped-types"

export class UpdateSubtaskDto extends PartialType(CreateSubtaskDto) {}