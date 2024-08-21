import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import registerSwagger from './bootstrap/register-swagger'
import { validatePath } from './utils/validatePath';
import { parseBoolRaw } from './utils/parseBoolRaw';
async function bootstrap() {
  const logger = new Logger('Bootstrap')

  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const packageJson = await require(join(__dirname, '../package.json'))
  const cfgSrv = app.get(ConfigService)
  const globalPrefix = validatePath(cfgSrv.get('SERVER_BASE_PATH') || '/')
  app.setGlobalPrefix(globalPrefix)

  // Register Swagger
  if (parseBoolRaw(cfgSrv.get('SWAGGER_ENABLED')))
    await registerSwagger(app, cfgSrv, globalPrefix, packageJson.version)

  await app.listen(3000);
  logger.log(`App is running on ${await app.getUrl()}${cfgSrv.get('SWAGGER_SERVER_HOST')}${cfgSrv.get('SWAGGER_PATH')}`)
}
bootstrap();
