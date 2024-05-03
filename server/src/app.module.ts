import { Module } from '@nestjs/common';
import { RepresentantModule } from './representant/representant.module';
import { VoteModule } from './vote/vote.module';
import { UnionModule } from './union/union.module';
import { AppGateway } from './app/app.gateway';
import { CourseModule } from './course/course.module';

@Module({
  imports: [RepresentantModule, UnionModule, VoteModule, CourseModule],
  controllers: [],
  providers: [AppGateway]
})
export class AppModule {}
