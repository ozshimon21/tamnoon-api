import { IsString, IsNotEmpty, IsArray, IsOptional, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AssetDto {
  @ApiProperty({
    description: 'The unique identifier of the asset',
    example: 'asset_123456',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    description: 'The name of the asset',
    example: 'Production Server',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The type of the asset',
    example: 'EC2',
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'Array of tags associated with the asset',
    example: [{ key: 'environment', value: 'production' }],
  })
  @IsArray()
  @IsNotEmpty()
  tags: Record<'key' | 'value', string>[];

  @ApiProperty({
    description: 'The cloud account information',
    example: { id: 'acc_123', name: 'AWS Production' },
  })
  @IsObject()
  @IsNotEmpty()
  cloudAccount: Record<'id' | 'name', string>;

  @ApiProperty({
    description: 'The ID of the asset owner',
    example: 'user_123456',
  })
  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @ApiProperty({
    description: 'The region where the asset is located',
    example: 'us-east-1',
  })
  @IsString()
  @IsNotEmpty()
  region: string;

  @ApiPropertyOptional({
    description: 'The name of the group this asset belongs to',
    example: 'production-servers',
  })
  @IsString()
  @IsOptional()
  groupName?: string;
}
