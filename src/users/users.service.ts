import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createUserDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({ data: createUserDto });
  }

  // ✅ Get all users (only user info)
  findAll() {
    return this.databaseService.user.findMany();
  }

  // ✅ Get single user (only user info)
  findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: { id },
    });
  }

  // ✅ Update user
  update(id: number, data: any) {
    return this.databaseService.user.update({
      where: { id },
      data,
    });
  }

  // ✅ Delete user
  delete(id: number) {
    return this.databaseService.user.delete({
      where: { id },
    });
  }
}
