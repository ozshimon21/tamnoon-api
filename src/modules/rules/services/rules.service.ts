import { Injectable } from '@nestjs/common';
import { uuidv7 } from 'uuidv7';
import { Asset } from 'src/modules/assets/entities/asset.entity';
import { mockRules } from '../data/rules-mock-data';
import { RuleEngineService } from './rule-engine.service';
import { CreateRuleDto, RuleDto, UpdateRuleDto } from '../dto';
import { Rule } from '../entities/rule.entity';

@Injectable()
export class RulesService {
  private rules = mockRules;

  constructor(private readonly ruleEngineService: RuleEngineService) {}

  async create(createRuleDto: CreateRuleDto): Promise<RuleDto> {
    const ruleToCreate: Rule = {
      id: uuidv7(),
      ...createRuleDto,
    };

    this.rules.push(ruleToCreate);

    return ruleToCreate;
  }

  async findAll(): Promise<RuleDto[]> {
    return this.rules;
  }

  async findOne(id: string): Promise<Rule> {
    return this.rules.find((rule) => rule.id === id);
  }

  async update(id: string, updateRuleDto: UpdateRuleDto): Promise<RuleDto> {
    const ruleIndex = this.rules.findIndex((rule) => rule.id === id);
    if (ruleIndex == -1) {
      throw new Error('Rule not found');
    }

    this.rules[ruleIndex] = {
      ...this.rules[ruleIndex],
      ...updateRuleDto,
    };

    return this.rules[ruleIndex];
  }

  async remove(id: string): Promise<void> {
    this.rules = this.rules.filter((rule) => rule.id !== id);
  }

  // NOTE: we assume that each asset has only one rule match or none.
  async getMatchingGroupName(asset: Asset): Promise<string> {
    const match = this.rules.find((rule) => this.ruleEngineService.matchesRule(asset, rule));
    return match ? match.groupName : undefined;
  }

  async isMatchingRule(ruleId: string, asset: Asset): Promise<boolean> {
    const rule = await this.findOne(ruleId);
    return this.ruleEngineService.matchesRule(asset, rule);
  }
}
