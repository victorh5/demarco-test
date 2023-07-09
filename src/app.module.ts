import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/dist'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://victorh5900:IkTouXFfrCEO4Mfu@demarcotest.czbfbih.mongodb.net/',
    ),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
