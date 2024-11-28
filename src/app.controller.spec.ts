import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RulesModule } from './modules/rules/rules.module';
import { AssetsModule } from './modules/assets/assets.module';
import { AssetsService } from './modules/assets/services/assets.service';
import { RulesService } from './modules/rules/services/rules.service';
import { RuleEngineService } from './modules/rules/services/rule-engine.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, AssetsService, RulesService, RuleEngineService],
      imports: [AssetsModule, RulesModule],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello I am Alive!"', async () => {
      // Act
      const result = await appController.getHello();

      // Assert
      expect(result).toBe('Hello I am Alive!');
    });
  });
});
