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
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/create-course.dto";

@Controller("course")
export class CourseController {
	constructor(private readonly courseService: CourseService) {}

	@Post()
	async create(
		@Body() createCourseDto: CreateCourseDto,
		@Res() res: FastifyReply,
	) {
		const result = await this.courseService.create(createCourseDto);

		return typeof result == "string"
			? res.status(HttpStatus.BAD_REQUEST).send({ msg: result })
			: res.status(HttpStatus.CREATED).send(result);
	}

	@Get()
	async findAll() {
		return await this.courseService.findAll();
	}

	@Get("/not")
	async findNotConcluded() {
		return await this.courseService.findNotConcluded();
	}

	@Post(":name")
	async conclude(@Param("name") name: string, @Res() res: FastifyReply) {
		const result = await this.courseService.conclude(name);

		return typeof result == "string"
			? res.status(HttpStatus.BAD_REQUEST).send({ msg: result })
			: res.status(HttpStatus.CREATED).send(result);
	}

	@Delete(":name")
	async remove(@Param("name") name: string, @Res() res: FastifyReply) {
		const result = await this.courseService.delete(name);

		return res
			.status(
				HttpStatus[typeof result == "string" ? "BAD_REQUEST" : "OK"],
			)
			.send(typeof result == "string" ? { msg: result } : result);
	}
}
