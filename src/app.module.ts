import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { EvaluateModule } from './evaluate/evaluate.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/dist'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://victorh5900:IkTouXFfrCEO4Mfu@demarcotest.czbfbih.mongodb.net/',
    ),
    UsersModule,
    EvaluateModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
