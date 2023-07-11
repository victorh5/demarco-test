import { Module } from '@nestjs/common';
import { EvaluateService } from './evaluate.service';
import { EvaluateController } from './evaluate.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Evaluate, EvaluateSchema } from './entities/evaluate.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Evaluate.name, schema: EvaluateSchema },
    ]),
  ],
  controllers: [EvaluateController],
  providers: [
    EvaluateService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class EvaluateModule {}
