import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type EvaluateDocument = Evaluate & Document;

type Option = {
  option_text: string;
  is_correct: boolean;
};

type Question = {
  text: string;
  grade: number;
  options: Option[];
};

type Answers = {
  user: User;
  user_grade: number;
};

@Schema()
export class Evaluate {
  @Prop()
  title: string;
  @Prop()
  total_grade: number;
  @Prop()
  question: Question[];
  @Prop({
    type: [
      {
        user_grade: Number,
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      },
    ],
  })
  answers?: Answers[];
}

export const EvaluateSchema = SchemaFactory.createForClass(Evaluate);
