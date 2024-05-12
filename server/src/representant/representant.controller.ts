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
import { RepresentantService } from "./representant.service";
import { Representant } from "./entities/representant.entity";

@Controller("representant")
export class RepresentantController {
	constructor(private readonly representantService: RepresentantService) {}

	@Post()
	async create(
		@Body() createRepresentantDto: Representant,
		@Res() res: FastifyReply,
	) {
		const result = await this.representantService.create(
			createRepresentantDto,
		);

		if (typeof result == "string")
			return res.status(HttpStatus.BAD_REQUEST).send({ msg: result });

		return res.status(HttpStatus.CREATED).send(result);
	}

	@Get()
	findAll() {
		return this.representantService.findAll();
	}

	@Get(":course")
	findOne(@Param("course") course: string) {
		return this.representantService.findByCourse(course);
	}

	@Delete(":name")
	async remove(@Param("name") name: string, @Res() res: FastifyReply) {
		const result = await this.representantService.remove(name);

		if (typeof result == "string")
			return res.status(HttpStatus.BAD_REQUEST).send({ msg: result });

		return res.status(HttpStatus.OK).send(result);
	}
}
