import { Controller, Get, Post, Body, Param, Delete, Res, HttpStatus } from "@nestjs/common";
import { FastifyReply } from "fastify";
import { VoteService } from "./vote.service";
import { CreateVoteDto } from "./dto/create-vote.dto";
import { AppGateway } from "../app/app.gateway";

@Controller("vote")
export class VoteController {
	constructor(private readonly voteService: VoteService, private readonly appGateway: AppGateway) {}

	@Post()
	async create(@Body() createVoteDto: CreateVoteDto,  @Res() res: FastifyReply) {
		const result = await this.voteService.create(createVoteDto);
    if (typeof result == "string")
			return res.status(HttpStatus.BAD_REQUEST).send({ msg: result });
    this.appGateway.handleVote(result);
		return result;
	}

	@Get()
	findAll() {
		return this.voteService.findAll();
	}

	@Get("/findByCourse/:course")
	findOne(@Param("course") course: string) {
		return this.voteService.findByCourse(course);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		
		return this.voteService.remove(+id);
	}
}
