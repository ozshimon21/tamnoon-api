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
import { AssetDto, CreateAssetDto, UpdateAssetDto } from './dto';
import { AssetsService } from './services/assets.service';

@ApiTags('Assets')
@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  /**
   * Creates new asset
   * @param createAssetDto
   * @returns the created asset
   */
  @ApiOperation({ summary: 'Create new asset' })
  @ApiCreatedResponse({ description: 'The asset was created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Post()
  create(@Body() createAssetDto: CreateAssetDto): Promise<AssetDto> {
    return this.assetsService.create(createAssetDto);
  }

  /**
   * Retrieves all assets
   * @returns Array of all assets
   */
  @ApiOperation({ summary: 'Get all assets' })
  @ApiNoContentResponse({ description: 'No assets found' })
  @ApiOkResponse({
    description: 'Retrieved all assets successfully',
    type: [AssetDto],
  })
  @Get()
  async findAll() {
    const result = await this.assetsService.findAll();
    if (!result?.length) {
      throw new HttpException('No assets found', HttpStatus.NO_CONTENT);
    }

    return result;
  }

  /**
   * Finds asset by ID
   * @param id - The ID of the asset to retrieve
   * @returns The found asset
   */
  @ApiOperation({ summary: 'Get asset by ID' })
  @ApiOkResponse({
    description: 'Retrieved asset successfully',
    type: AssetDto,
  })
  @ApiNotFoundResponse({ description: 'Asset not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assetsService.getAssetById(id);
  }

  /**
   * Updates an existing asset
   * @param id - The ID of the asset to update
   * @param updateAssetDto - The update asset data transfer object
   * @returns The updated asset
   */
  @ApiOperation({ summary: 'Update asset by ID' })
  @ApiOkResponse({
    description: 'Asset updated successfully',
    type: AssetDto,
  })
  @ApiNotFoundResponse({ description: 'Asset not found' })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
    return this.assetsService.update(id, updateAssetDto);
  }

  /**
   * Removes an asset
   * @param id - The ID of the asset to delete
   * @returns The deletion result
   */
  @ApiOperation({ summary: 'Delete asset by ID' })
  @ApiOkResponse({ description: 'Asset deleted successfully' })
  @ApiNotFoundResponse({ description: 'Asset not found' })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.assetsService.delete(id);
  }

  /**
   * Gets the matching group for an asset
   * @param id - The ID of the asset
   * @returns The matching group information
   */
  @ApiOperation({ summary: 'Get matching group for asset' })
  @ApiOkResponse({
    description: 'Retrieved matching group successfully',
    type: String,
  })
  @ApiNotFoundResponse({ description: 'Asset not found' })
  @Get(':id/matching-group')
  getMatchingGroup(@Param('id') id: string) {
    return this.assetsService.findMatchingGroup(id);
  }

  /**
   * Assigns groups to assets based on rules
   * @returns Void promise indicating completion
   */
  @ApiOperation({ summary: 'Assign groups to assets' })
  @ApiOkResponse({ description: 'Groups assigned successfully' })
  @Post('assign-groups')
  async assignGroups(): Promise<void> {
    this.assetsService.assignGroups();
  }

  /**
   * Tests a rule
   * @param createRuleDto - The rule id to test
   * @returns Array of matching asset ids
   */
  @ApiOperation({ summary: 'Test rule against all assets' })
  @ApiOkResponse({
    description: 'Rule test completed successfully',
    type: [String],
  })
  @ApiBadRequestResponse({ description: 'Invalid rule definition' })
  @Get('test-rule/:ruleId')
  testRule(@Param('ruleId') ruleId: string): Promise<string[]> {
    return this.assetsService.testRule(ruleId);
  }
}
