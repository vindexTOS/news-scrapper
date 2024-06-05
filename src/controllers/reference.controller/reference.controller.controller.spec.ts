import { Test, TestingModule } from '@nestjs/testing';
import { ReferenceControllerController } from './reference.controller.controller';

describe('ReferenceControllerController', () => {
  let controller: ReferenceControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReferenceControllerController],
    }).compile();

    controller = module.get<ReferenceControllerController>(ReferenceControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
