import { Module } from '@nestjs/common';
import { AssetsController } from './assets.controller';
import { RulesModule } from '../rules/rules.module';
import { AssetsService } from './services/assets.service';

@Module({
  controllers: [AssetsController],
  providers: [AssetsService],
  exports: [AssetsService],
  imports: [RulesModule],
})
export class AssetsModule {}
