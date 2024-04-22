import { Test, TestingModule } from '@nestjs/testing';
import { RepresentantService } from './representant.service';

describe('RepresentantService', () => {
  let service: RepresentantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepresentantService],
    }).compile();

    service = module.get<RepresentantService>(RepresentantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
