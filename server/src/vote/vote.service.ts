import { Injectable } from "@nestjs/common";
import { CreateVoteDto } from "./dto/create-vote.dto";
import { PrismaService } from "src/database/prisma.service";
import { Vote } from "./entities/vote.entity";
import { allVotes, aVote } from "./entities/allVote";

@Injectable()
export class VoteService {
	constructor(private readonly prisma: PrismaService) {}

	async create(createVoteDto: CreateVoteDto): Promise<Vote | string> {
		const representant = await this.prisma.representant.findUnique({
			where: { name: createVoteDto.representant },
		});

		if (!representant)
			return "Esse aluno não se candidatou para representante";

		const union = await this.prisma.union.findUnique({
			where: { name: createVoteDto.union },
		});

		if (!union) return "Essa chapa não existe";

		return await this.prisma.vote.create({ data: { ...createVoteDto } });
	}

	async findAll(): Promise<allVotes> {
		const representants = await this.prisma.representant.findMany();
		const unions = await this.prisma.union.findMany();

		const allRepresentantsVotes = [];
		const allUnionsVotes = [];

		for (let i = 0; i < representants.length; i++) {
			const { name } = representants[i];
			const votes = await this.prisma.vote.count({
				where: { representant: name },
			});
			allRepresentantsVotes.push({ name, votes });
		}

		for (let i = 0; i < unions.length; i++) {
			const { name } = unions[i];
			const votes = await this.prisma.vote.count({
				where: { union: name },
			});
			allUnionsVotes.push({ name, votes });
		}

		return {
			representants: allRepresentantsVotes,
			unions: allUnionsVotes,
		};
	}

	async findByCourse(course: string): Promise<allVotes | string> {
		const existCourse = await this.prisma.course.findUnique({
			where: { name: course },
		});

		if (!existCourse) return "Esse curso não está cadastrado";

		const representants = await this.prisma.representant.findMany({
			where: { course },
		});

		const allRepresentantsVotes: aVote[] = [];
		const allUnionsVotes: aVote[] = [];

		for (let i = 0; i < representants.length; i++) {
			const { name } = representants[i];
			allRepresentantsVotes.push({ name, votes: 0 });

			const votes = await this.prisma.vote.findMany({
				where: { representant: name },
			});

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

		return {
			representants: allRepresentantsVotes,
			unions: allUnionsVotes,
		};
	}

	remove(id: number) {
		return `This action removes a #${id} vote`;
	}
}
