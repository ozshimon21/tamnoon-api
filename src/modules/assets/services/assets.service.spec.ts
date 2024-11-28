import { Test, TestingModule } from '@nestjs/testing';
import { AssetsService } from './assets.service';
import { RulesModule } from '../../../modules/rules/rules.module';
import { RulesService } from '../../../modules/rules/services/rules.service';
import { RuleEngineService } from '../../../modules/rules/services/rule-engine.service';

describe('AssetsService', () => {
  let service: AssetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetsService, RulesService, RuleEngineService],
      imports: [RulesModule],
    }).compile();

    service = module.get<AssetsService>(AssetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
