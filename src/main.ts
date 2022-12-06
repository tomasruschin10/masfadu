import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from '@payk/nestjs-winston';
import * as config from "config";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as admin from 'firebase-admin';
import { ServiceAccount } from "firebase-admin";
import * as e from 'express';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

const crPath = '/home/nodejs/public.crt';
const pkPath = '/home/nodejs/private.key';


async function bootstrap() {
  const express: any = e();

  const app = await NestFactory.create(AppModule, new ExpressAdapter(express));
    const url = config.get("server.url");


  const options = new DocumentBuilder()
  .addServer(url)
  .setTitle('Api Fadu')
  .setDescription('Api de Fadu para diversas fuentes')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const adminConfig: ServiceAccount = {
    "projectId": config.get("firebase.projectId"),
    "privateKey": config.get("private.private_key").replace(/\\n/g, '\n'),
    "clientEmail": config.get("private.client_email"),
  };
  // Initialize the firebase admin app
  
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: config.get("firebase.databaseURL"),
  });

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  
  const port = process.env.PORT || parseInt(config.get("server.port"));

  app.enableCors();
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalPipes(new ValidationPipe());

  await app.init();

  http.createServer(express).listen(port || 5000);
  let optionsNest: any = {};

  if (fs.existsSync(crPath) && fs.existsSync(pkPath)) {
    optionsNest = {
      cert: fs.readFileSync(crPath),
      key: fs.readFileSync(pkPath)
    }
    https.createServer(optionsNest, express).listen(443);
  }
}
bootstrap();
