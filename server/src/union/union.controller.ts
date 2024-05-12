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
import { UnionService } from "./union.service";
import { Union } from "./entities/union.entity";

@Controller("union")
export class UnionController {
	constructor(private readonly unionService: UnionService) {}

	@Post()
	async create(@Body() createUnionDto: Union, @Res() res: FastifyReply) {
		const result = await this.unionService.create(createUnionDto);

		if (typeof result == "string")
			return res.status(HttpStatus.BAD_REQUEST).send({ msg: result });

		return res.status(HttpStatus.CREATED).send(result);
	}

	@Get()
	findAll() {
		return this.unionService.findAll();
	}

	@Delete(":name")
	async remove(@Param("name") name: string, @Res() res: FastifyReply) {
		const result = await this.unionService.remove(name);

		if (typeof result == "string")
			return res.status(HttpStatus.BAD_REQUEST).send({ msg: result });

		return res.status(HttpStatus.OK).send(result);
	}
}
