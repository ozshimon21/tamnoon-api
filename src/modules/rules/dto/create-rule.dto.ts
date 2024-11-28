import { OmitType } from '@nestjs/swagger';
import { RuleDto } from './rule.dto';

export class CreateRuleDto extends OmitType(RuleDto, ['id'] as const) {}
