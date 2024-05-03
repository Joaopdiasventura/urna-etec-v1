import { Test, TestingModule } from "@nestjs/testing";
import { UnionService } from "./union.service";

describe("UnionService", () => {
	let service: UnionService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UnionService],
		}).compile();

		service = module.get<UnionService>(UnionService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
