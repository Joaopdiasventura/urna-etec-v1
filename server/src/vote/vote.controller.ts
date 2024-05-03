import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Res,
	HttpStatus,
} from "@nestjs/common";
import { FastifyReply } from "fastify";
import { VoteService } from "./vote.service";
import { CreateVoteDto } from "./dto/create-vote.dto";
import { AppGateway } from "../app/app.gateway";
import { Vote } from "./entities/vote.entity";

@Controller("vote")
export class VoteController {
	constructor(
		private readonly voteService: VoteService,
		private readonly appGateway: AppGateway,
	) {}

	sendVote = (result: Vote) => {
		this.appGateway.handleVote(result);
		return result;
	};

	@Post()
	async create(
		@Body() createVoteDto: CreateVoteDto,
		@Res() res: FastifyReply,
	) {
		const result = await this.voteService.create(createVoteDto);

		return res
			.status(
				HttpStatus[
					typeof result == "string" ? "BAD_REQUEST" : "CREATED"
				],
			)
			.send(
				typeof result == "string"
					? { msg: result }
					: this.sendVote(result),
			);
	}

	@Get()
	findAll() {
		return this.voteService.findAll();
	}

	@Get("/findByCourse/:course")
	async findOne(@Param("course") course: string, @Res() res: FastifyReply) {
		const result = await this.voteService.findByCourse(course);
		return res
			.status(
				HttpStatus[typeof result == "string" ? "BAD_REQUEST" : "OK"],
			)
			.send(typeof result == "string" ? { msg: result } : result);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.voteService.remove(+id);
	}
}
