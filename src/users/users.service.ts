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
  findAll(name?: string) {
    if (name) {
      return this.databaseService.user.findMany({
        where: {
          name,
        },
      });
    }
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

  async searchByName(name: string) {
    if (!name) {
      return [];
    }

    return this.databaseService.user.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive', // case-insensitive search
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        role: true,
      },
    });
  }

  // ✅ Delete user
  delete(id: string) {
    return this.databaseService.user.delete({
      where: { id },
    });
  }
}
