import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RulesService } from './services/rules.service';
import { CreateRuleDto, RuleDto, UpdateRuleDto } from './dto';

@ApiTags('Rules')
@Controller('rules')
export class RulesController {
  constructor(private readonly rulesService: RulesService) {}

  /**
   * Creates new rule
   * @param createRuleDto
   * @returns the created rule
   */
  @ApiOperation({ summary: 'Create new rule' })
  @ApiCreatedResponse({
    description: 'The rule was created successfully',
    type: RuleDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Post()
  create(@Body() createRuleDto: CreateRuleDto): Promise<RuleDto> {
    return this.rulesService.create(createRuleDto);
  }

  /**
   * Retrieves all rules
   * @returns Array of all rules
   */
  @ApiOperation({ summary: 'Get all rules' })
  @ApiNoContentResponse({ description: 'No rules found' })
  @ApiOkResponse({
    description: 'Retrieved all rules successfully',
    type: [RuleDto],
  })
  @Get()
  async findAll(): Promise<RuleDto[]> {
    const result = await this.rulesService.findAll();
    if (!result?.length) {
      throw new HttpException('No rules found', HttpStatus.NO_CONTENT);
    }

    return result;
  }

  /**
   * Finds rule by ID
   * @param id - The ID of the rule to retrieve
   * @returns The found rule
   */
  @ApiOperation({ summary: 'Get rule by ID' })
  @ApiOkResponse({
    description: 'Retrieved rule successfully',
    type: RuleDto,
  })
  @ApiNotFoundResponse({ description: 'Rule not found' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<RuleDto> {
    return this.rulesService.findOne(id);
  }

  /**
   * Updates an existing rule
   * @param id - The ID of the rule to update
   * @param updateRuleDto - The update rule data transfer object
   * @returns The updated rule
   */
  @ApiOperation({ summary: 'Update rule by ID' })
  @ApiOkResponse({
    description: 'Rule updated successfully',
    type: RuleDto,
  })
  @ApiNotFoundResponse({ description: 'Rule not found' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRuleDto: UpdateRuleDto): Promise<RuleDto> {
    return this.rulesService.update(id, updateRuleDto);
  }

  /**
   * Removes a rule
   * @param id - The ID of the rule to delete
   * @returns The deletion result
   */
  @ApiOperation({ summary: 'Delete rule by ID' })
  @ApiOkResponse({ description: 'Rule deleted successfully' })
  @ApiNotFoundResponse({ description: 'Rule not found' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.rulesService.remove(id);
  }
}
