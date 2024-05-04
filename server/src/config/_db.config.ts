import { registerAs } from "@nestjs/config"
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('db', () => {
  return <TypeOrmModuleOptions>{
    type: process.env.DB_TYPE || 'mysql',
    host: process.env.DB_HOST,
    port: Number.parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PSWD,
    database: process.env.DB_NAME,
    extra: {
      connectionLimit: Number.parseInt(process.env.DB_CONN_LIMIT) || 100,
    },
    logger: 'file',
    logging: true,
    // 自动加载实体
    autoLoadEntities: true,
    migrations: ['src/migration/*.js'],
    legacySpatialSupport: false,
  }
})