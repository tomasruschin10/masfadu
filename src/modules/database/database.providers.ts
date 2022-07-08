import { User } from 'src/models/user.entity';
import { createConnection } from 'typeorm';
import * as config from "config";
import { Image } from 'src/models/image.entity';
import { Role } from 'src/models/role.entity';
import { UserRole } from 'src/models/userRole.entity';

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
    User, Image, Role, UserRole]});

    return DB_CONFIG;
}

export const DatabaseConnection = extendDatabaseConfig(SERVER_CONFIG);

export const databaseProviders = [
  {
    provide: "DbConnectionToken",
    useFactory: async () =>  await createConnection(extendDatabaseConfig(SERVER_CONFIG)),
  }
];
