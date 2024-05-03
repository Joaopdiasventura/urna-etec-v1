import { Test, TestingModule } from "@nestjs/testing";
import { RepresentantController } from "./representant.controller";
import { RepresentantService } from "./representant.service";

describe("RepresentantController", () => {
	let controller: RepresentantController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [RepresentantController],
			providers: [RepresentantService],
		}).compile();

		controller = module.get<RepresentantController>(RepresentantController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
