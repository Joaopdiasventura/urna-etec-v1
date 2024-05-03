import { Test, TestingModule } from "@nestjs/testing";
import { UnionController } from "./union.controller";
import { UnionService } from "./union.service";

describe("UnionController", () => {
	let controller: UnionController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UnionController],
			providers: [UnionService],
		}).compile();

		controller = module.get<UnionController>(UnionController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
