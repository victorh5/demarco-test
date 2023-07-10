import { Module } from '@nestjs/common';
import { EvaluateService } from './evaluate.service';
import { EvaluateController } from './evaluate.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Evaluate, EvaluateSchema } from './entities/evaluate.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Evaluate.name, schema: EvaluateSchema },
    ]),
  ],
  controllers: [EvaluateController],
  providers: [EvaluateService],
})
export class EvaluateModule {}
