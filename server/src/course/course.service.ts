import { Injectable } from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import { PrismaService } from "src/database/prisma.service";
import { Course } from "./entities/course.entity";

@Injectable()
export class CourseService {
	constructor(private readonly prisma: PrismaService) {}
	async create(createCourseDto: CreateCourseDto): Promise<Course | string> {
		const existCouse = await this.prisma.course.findUnique({
			where: { ...createCourseDto },
		});

		if (existCouse) return "Esse curso já está cadastrado";

		return await this.prisma.course.create({
			data: { ...createCourseDto },
		});
	}

	findAll() {
		return `This action returns all course`;
	}

	findOne(id: number) {
		return `This action returns a #${id} course`;
	}

	remove(id: number) {
		return `This action removes a #${id} course`;
	}
}
