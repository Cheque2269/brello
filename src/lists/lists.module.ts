import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ListsResolver } from './lists.resolver';
import { ListsService } from './lists.service';

@Module({
  providers: [ListsResolver, ListsService],
  imports: [PrismaModule],
})
export class ListsModule {}
