import { Controller, Get, Post, Body, Param, Res } from "@nestjs/common";
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

	sendVote(vote: Vote) {
		this.appGateway.handleVote(vote);
		return vote;
	}

	@Post()
	async create(
		@Body() createVoteDto: CreateVoteDto,
		@Res() res: FastifyReply,
	) {
		const result = await this.voteService.create(createVoteDto);

		return typeof result == "string"
			? res.status(400).send({ msg: result })
			: res.status(201).send(this.sendVote(result));
	}

	@Get()
	async getAll(@Res() res: FastifyReply) {
		const representants = await this.voteService.findAllRepresentants();
		const unions = await this.voteService.findAllUnions();

		const allRepresentantsVotes = [];
		const allUnionsVotes = [];

		for (let i = 0; i < representants.length; i++) {
			const { name } = representants[i];
			const votes = await this.voteService.findVotesByRepresentant(name);
			allRepresentantsVotes.push({ name, votes });
		}

		for (let i = 0; i < unions.length; i++) {
			const { name } = unions[i];
			const votes = await this.voteService.findVotesByRepresentant(name);
			allUnionsVotes.push({ name, votes });
		}

		return res.status(200).send({
			Representantes: allRepresentantsVotes,
			Chapas: allUnionsVotes,
		});
	}

	@Get("/getByCourse/:course")
	async getByCourse(
		@Param("course") course: string,
		@Res() res: FastifyReply,
	) {
		const existCourse = await this.voteService.findCourse(course);

		if (!existCourse)
			return res.status(400).send({ msg: "Esse curso não existe" });

		const representants =
			await this.voteService.findRepresentantsByCourse(course);

		const allRepresentantsVotes = [];
		const allUnionsVotes = [];

		for (let i = 0; i < representants.length; i++) {
			const { name } = representants[i];
			allRepresentantsVotes.push({ name, votes: 0 });

			const votes = await this.voteService.findVotesByRepresentant(name);

			for (let j = 0; j < votes.length; j++) {
				allRepresentantsVotes[i].votes++;

				const existUnion = allUnionsVotes.some(
					(vote) => votes[j].union == vote.name,
				);

				if (!existUnion) {
					allUnionsVotes.push({ name: votes[j].union, votes: 0 });
				}

				const index = allUnionsVotes.findIndex(
					(vote) => votes[j].union == vote.name,
				);

				allUnionsVotes[index].votes++;
			}
		}

		return res.status(200).send({
			Representantes: allRepresentantsVotes,
			Chapas: allUnionsVotes,
		});
	}
}
