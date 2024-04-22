import { Module } from '@nestjs/common';
import { RepresentantModule } from './representant/representant.module';
import { VoteModule } from './vote/vote.module';
import { UnionModule } from './union/union.module';
import { AppGateway } from './app/app.gateway';

@Module({
  imports: [RepresentantModule, UnionModule, VoteModule],
  controllers: [],
  providers: [AppGateway]
})
export class AppModule {}
