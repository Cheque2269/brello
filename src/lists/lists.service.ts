import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InputList } from './dto/lists.input';

@Injectable()
export class ListsService {
  constructor(private readonly prismaService: PrismaService) {}

  getAllLists() {
    return this.prismaService.lists.findMany();
  }

  getTasksByListId(listId: string) {
    return this.prismaService.tasks.findMany({
      where: {
        listId: listId,
      },
      orderBy: {
        position: 'asc',
      },
    });
  }

  createList(input: InputList) {
    return this.prismaService.lists.create({
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
