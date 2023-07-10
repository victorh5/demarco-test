import { Injectable } from '@nestjs/common';
import { CreateEvaluateDto } from './dto/create-evaluate.dto';
import { UpdateEvaluateDto } from './dto/update-evaluate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Evaluate, EvaluateDocument } from './entities/evaluate.entity';
import { Model } from 'mongoose';

@Injectable()
export class EvaluateService {
  constructor(
    @InjectModel(Evaluate.name) private evaluateModel: Model<EvaluateDocument>,
  ) {}

  create(createEvaluateDto: CreateEvaluateDto) {
    const evaluate = new this.evaluateModel(createEvaluateDto);
    return evaluate.save();
  }

  findAll() {
    return this.evaluateModel.find();
  }

  findOne(id: string) {
    return this.evaluateModel.findById(id);
  }

  update(id: string, updateEvaluateDto: UpdateEvaluateDto) {
    return this.evaluateModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateEvaluateDto,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.evaluateModel
      .deleteOne({
        _id: id,
      })
      .exec();
  }
}
