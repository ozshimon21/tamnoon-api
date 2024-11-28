import { IsString, IsNotEmpty, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Filter } from '../common';

export class RuleDto {
  @ApiProperty({
    description: 'The unique identifier of the rule',
    example: 'rule_123456',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'The name of the group this rule belongs to',
    example: 'production-assets',
  })
  @IsString()
  @IsNotEmpty()
  groupName: string;

  @ApiProperty({
    description: 'The filter configuration for the rule',
    example: {
      AND: [
        {
          key: 'tags.environment',
          operator: '=',
          value: 'production',
        },
      ],
    },
  })
  @IsObject()
  @IsNotEmpty()
  filter: Filter;
}
