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
    
		return res
			.status(
				HttpStatus[typeof result == "string" ? "BAD_REQUEST" : "CREATED"],
			)
			.send(typeof result == "string" ? { msg: result } : result);
	}

	@Get()
	findAll() {
		return this.courseService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.courseService.findOne(+id);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.courseService.remove(+id);
	}
}
