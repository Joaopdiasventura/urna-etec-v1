import { Module } from "@nestjs/common";
import { VoteService } from "./vote.service";
import { VoteController } from "./vote.controller";
import { PrismaService } from "src/database/prisma.service";
import { AppGateway } from "src/app/app.gateway";

@Module({
	controllers: [VoteController],
	providers: [VoteService, PrismaService, AppGateway],
})
export class VoteModule {}
