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

	async findAll(): Promise<Course[]> {
		return await this.prisma.course.findMany();
	}
	async findNotConcluded(): Promise<Course[]> {
		return await this.prisma.course.findMany({
			where: { concluded: false },
		});
	}

	async delete(name: string): Promise<Course | string> {
		const course = await this.prisma.course.findUnique({ where: { name } });
		if (!course) return "Esse curso não está cadastrado";
		return await this.prisma.course.delete({ where: { name } });
	}
}
