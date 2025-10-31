import { Injectable } from '@nestjs/common';
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
  findOne(id: string) {
    return this.databaseService.user.findUnique({
      where: { id },
    });
  }

  // ✅ Update user
  update(id: string, data: any) {
    return this.databaseService.user.update({
      where: { id },
      data,
    });
  }

  // ✅ Delete user
  delete(id: string) {
    return this.databaseService.user.delete({
      where: { id },
    });
  }
}
