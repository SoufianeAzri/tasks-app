import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    const existedUser = await this.databaseService.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });

    if (existedUser) {
      throw new ConflictException('The user already exists!');
    }

    return this.databaseService.user.create({ data: createUserDto });
  }

  // get all users 
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

  // get single user 
  findOne(id: string) {
    return this.databaseService.user.findUnique({
      where: { id },
    });
  }

  //  update user
  update(id: string, data: any) {
    return this.databaseService.user.update({
      where: { id },
      data,
    });
  }

  async findAllRelatedToTasks() {
    // get all users that are either managers or task members
    const users = await this.databaseService.user.findMany({
      where: {
        OR: [
          {
            tasksManaged: {
              some: {}, 
            },
          },
          {
            tasksMember: {
              some: {}, 
            },
          },
        ],
      },
    });

    return users;
  }

  async searchByName(name: string) {
    if (!name) {
      return [];
    }

    return this.databaseService.user.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
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

  // delete user
  async delete(id: string) {
    const user = await this.databaseService.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // check if the user is assigned as manager or team member in tasks
    const assignedToTasks = await this.databaseService.task.findFirst({
      where: {
        OR: [{ managerId: id }, { teamMembers: { some: { id: id } } }],
      },
    });

    // check if the user is assigned as manager or team member in subtasks
    const assignedToSubtasks = await this.databaseService.subtask.findFirst({
      where: {
        OR: [{ managerId: id }, { teamMembers: { some: { id: id } } }],
      },
    });

    // If the user is assigned anywhere, block deletion
    if (assignedToTasks || assignedToSubtasks) {
      throw new ForbiddenException(
        'Cannot delete user — they are assigned to one or more tasks or subtasks.',
      );
    }

    // safe to delete
    await this.databaseService.user.delete({
      where: { id: id },
    });

    return { message: 'User deleted successfully' };
  }
}
