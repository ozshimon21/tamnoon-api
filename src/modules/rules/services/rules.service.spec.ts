import { Test, TestingModule } from '@nestjs/testing';
import { RulesService } from './rules.service';
import { RuleEngineService } from './rule-engine.service';

describe('RulesService', () => {
  let service: RulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RulesService, RuleEngineService],
    }).compile();

    service = module.get<RulesService>(RulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
