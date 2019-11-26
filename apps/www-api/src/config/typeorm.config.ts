import { TypeOrmModuleOptions} from '@nestjs/typeorm';
import env from '../environments/environment';

const dbConfig = env.db;
console.log(dbConfig);

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.RDS_HOSTNAME || dbConfig.host,
    port: parseInt(process.env.RDS_PORT, 10) || dbConfig.port,
    username: process.env.RDS_USERNAME || dbConfig.username,
    password: process.env.RDS_PASSWORD || dbConfig.password,
    database: process.env.RDS_DB_NAME || dbConfig.database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'], // , __dirname + '/../../../apps/www-api/**/*.entity.{js,ts}'],
    synchronize: dbConfig.synchronize, // 스키마를 매번 동기화, 출시 버전에서는 제거하는 것이 바람직
}
console.log(typeOrmConfig);
