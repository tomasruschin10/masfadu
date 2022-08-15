import { User } from 'src/models/user.entity';
import { createConnection } from 'typeorm';
import * as config from "config";
import { Image } from 'src/models/image.entity';
import { Role } from 'src/models/role.entity';
import { UserRole } from 'src/models/userRole.entity';
import { Activity } from 'src/models/activity.entity';
import { Advertisement } from 'src/models/advertisement.entity';
import { Career } from 'src/models/career.entity';
import { Feedback } from 'src/models/feedback.entity';
import { Notice } from 'src/models/notice.entity';
import { Notification } from 'src/models/notification.entity';
import { OfferCategory } from 'src/models/offerCategory.entity';
import { Offer } from 'src/models/offer.entity';
import { SubjectCategory } from 'src/models/subjectCategory.entity';
import { Subject } from 'src/models/subject.entity';
import { UserSubject } from 'src/models/userSubject.entity';
import { ResourceCategory } from 'src/models/resourceCategory.entity';
import { Resource } from 'src/models/resource.entity';
import { Partner } from 'src/models/partner.entity';

interface IEnvironmentConfig {
    db: IDBConfig;
  }
  interface IDBConfig {
    type: string;
    host: string | any;
    port: number | any;
    username: string | any;
    password: string | any;
    database: string | any;
    synchronize?:boolean; 
    logging?:boolean;
    autoLoadEntities?:boolean;
  
  }
  export const env = process.env.NODE_ENV ?? 'development'
  export const SERVER_CONFIG = {
      db: {
        type: 'mysql',
        host: config.get("database.host"),
        port: parseInt(config.get("database.port")),
        username: config.get("database.username"),
        password: config.get("database.password"),
        database: config.get("database.database"),
        logging: true,
        synchronize:   env === 'development' ? false : true,   
        // synchronize:  true, 
        autoLoadEntities: true
    
      }
  }
export function extendDatabaseConfig(source: IEnvironmentConfig){
  const DB_CONFIG: any = {};
  Object.assign(DB_CONFIG, source.db, {entities: [
    User, Image, Role, UserRole, Activity, Partner, Advertisement, Career, Feedback, Notice, Notification, OfferCategory, Offer, SubjectCategory, Subject, UserSubject, ResourceCategory, Resource]});

    return DB_CONFIG;
}

export const DatabaseConnection = extendDatabaseConfig(SERVER_CONFIG);

export const databaseProviders = [
  {
    provide: "DbConnectionToken",
    useFactory: async () =>  await createConnection(extendDatabaseConfig(SERVER_CONFIG)),
  }
];
