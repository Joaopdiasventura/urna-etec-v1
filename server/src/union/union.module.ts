import { Module } from "@nestjs/common";
import { UnionService } from "./union.service";
import { UnionController } from "./union.controller";
import { PrismaService } from "src/database/prisma.service";

@Module({
	controllers: [UnionController],
	providers: [UnionService, PrismaService],
})
export class UnionModule {}
