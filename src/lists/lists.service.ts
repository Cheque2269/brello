import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InputList } from './dto/lists.input';

@Injectable()
export class ListsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllLists() {
    return await this.prismaService.lists.findMany();
  }

  async getTasksByListId(listId: string) {
    return await this.prismaService.tasks.findMany({
      where: {
        listId: listId,
      },
      orderBy: {
        position: 'asc',
      },
    });
  }

  async createList(input: InputList) {
    return await this.prismaService.lists.create({
      data: {
        name: input.name,
        tasks: {
          createMany: {
            data: input.tasks.map((x, i) => ({
              title: x.title,
              position: i,
            })),
          },
        },
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        tasks: true,
      },
    });
  }
}
