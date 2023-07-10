import { IsArray, IsNumber, IsString } from 'class-validator';
import { Evaluate } from '../entities/evaluate.entity';
import { User } from 'src/users/entities/user.entity';

type Option = {
  option_text: string;
  is_correct: boolean;
};

type Question = {
  text: string;
  grade: number;
  options: Option[];
};

export class CreateEvaluateDto extends Evaluate {
  @IsString()
  title: string;
  @IsNumber()
  total_grade: number;
  @IsArray()
  question: Question[];
  @IsArray()
  student_answers?: User[];
}
