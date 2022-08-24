import {HttpModule, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule,winstonConsoleFormat } from '@payk/nestjs-winston';
import * as winston from 'winston';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Connection} from "typeorm";
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { DatabaseConnection } from './modules/database/database.providers';
import { controllers } from './modules/shared/providers/controllers.providers';
import { APP_GUARD } from '@nestjs/core';
import { FirestorageModule } from './controllers/firestorage/firestorage.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseConnection),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        host: 'smtp-relay.gmail.com',
        port: 587,
        secure: false, // upgrade later with STARTTLS
        requireTLS: true, 
        pool: true,
        tls: { secureProtocol: "TLSv1_method" },
        auth: {
          user: "ruizgarcesariel@gmail.com",
          pass: "cwzxatrmeqinoigc",
        },
      },
      defaults: {
        from:'"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: process.cwd() + '/templates/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
    WinstonModule.forRoot({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'default' },
      transports: [

        new winston.transports.Console({
          format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.colorize({ all: true }),
              winstonConsoleFormat
          )
        })
      ]
    }),
      ...controllers,
      FirestorageModule
      
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  constructor(private connection: Connection) {
  }

}
