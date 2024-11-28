import { Injectable } from '@nestjs/common';
import { CreateAssetDto } from '../dto/create-asset.dto';
import { UpdateAssetDto } from '../dto/update-asset.dto';
import { Asset } from '../entities/asset.entity';
import { AssetNotFoundException } from '../errors/errors';
import { uuidv7 } from 'uuidv7';
import { mockAssets } from '../data/assets-mock-data';
import { RulesService } from '../../rules/services/rules.service';
import { RuleEngineService } from '../../rules/services/rule-engine.service';

@Injectable()
export class AssetsService {
  private assets = mockAssets;

  constructor(
    private readonly rulesService: RulesService,
    private readonly ruleEngineService: RuleEngineService,
  ) {}

  async create(createAssetDto: CreateAssetDto): Promise<Asset> {
    const assetToCreate: Asset = {
      id: uuidv7(),
      ...createAssetDto,
    };

    this.assets.push(assetToCreate);

    return assetToCreate;
  }

  async getAssetById(id: string): Promise<Asset> {
    return this.assets.find((asset) => asset.id === id);
  }

  async update(id: string, updateData: UpdateAssetDto) {
    const assetIndex = this.assets.findIndex((asset) => asset.id === id);

    if (assetIndex == -1) {
      throw new AssetNotFoundException();
    }

    this.assets[assetIndex] = {
      ...this.assets[assetIndex],
      ...updateData,
    };

    return this.assets[assetIndex];
  }

  async findAll(): Promise<Asset[]> {
    return this.assets;
  }

  async delete(id: string): Promise<void> {
    this.assets = this.assets.filter((asset) => asset.id !== id);
  }

  async queryAssetsByName(name: string) {
    return this.assets.find((asset) => asset.name === name);
  }

  async assignGroups(): Promise<void> {
    this.assets.forEach(async (asset) => {
      asset.groupName = await this.rulesService.getMatchingGroupName(asset);
    });
  }

  async findMatchingGroup(id: string): Promise<string> {
    const assetIndex = this.assets.findIndex((asset) => asset.id === id);

    if (assetIndex == -1) {
      throw new AssetNotFoundException();
    }

    return await this.rulesService.getMatchingGroupName(this.assets[assetIndex]);
  }

  async testRule(id: string): Promise<string[]> {
    const rule = await this.rulesService.findOne(id);

    const assets = await this.findAll();

    const matchingAssets = assets
      .filter((asset) => this.ruleEngineService.matchesRule(asset, rule))
      .map((match) => match.id);

    return matchingAssets;
  }
}
