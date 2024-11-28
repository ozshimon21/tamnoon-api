import { Module } from '@nestjs/common';
import { RulesController } from './rules.controller';
import { RulesService } from './services/rules.service';
import { RuleEngineService } from './services/rule-engine.service';

@Module({
  controllers: [RulesController],
  providers: [RulesService, RuleEngineService],
  exports: [RulesService, RuleEngineService],
})
export class RulesModule {}
