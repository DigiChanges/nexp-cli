import { writeFile } from 'node:fs/promises';

const packageJson = {
  name: '  node experience algo-text',
  version: '1.14.5',
  description: '',
  scripts: {
    'build': 'etsc',
    'command': 'npx ts-node src/command.ts',
    'ci': 'npm run ts-check && npm run lint',
    'clean': 'rimraf dist/src/*',
    'cpy-ci': 'cp .env.dev .env',
    'debug': 'nodemon --inspect=0.0.0.0:9229 src/index.ts',
    'dev': 'nodemon',
    'docker:command': 'docker-compose exec node yarn command',
    'lint-fix': 'eslint -c .eslintrc.json ./src --fix',
    'lint': 'eslint -c .eslintrc.json ./src',
    'pre-commit': 'lint-staged',
    'pre-check': 'yarn ts-check && yarn lint',
    'prepare': 'husky install',
    'start': 'node dist/createProject.js',
    'test': 'jest --runInBand --coverage',
    'test-watch': 'npx jest --watch --silent --coverage=false',
    'tsc': 'tsc',
    'ts-check': 'tsc -p tsconfig.json --noEmit',
    'transpile': 'node build.js',
    'sync-db': 'npx ts-node src/App/Presentation/Commands/SynchronizeMikroORM.ts',
    'watch': 'nodemon dist/src/createProject.js'
  },
  keywords: [],
  author: 'Digichanges',
  license: 'MIT',
  dependencies: {
    '@digichanges/shared-experience': '^0.8.0',
    '@koa/multer': '^3.0.0',
    '@mikro-orm/core': '^5.2.3',
    '@mikro-orm/postgresql': '^5.2.3',
    'axios': '^0.26.1',
    'bcrypt': '^5.0.1',
    'class-validator': '^0.13.2',
    'commander': '^9.1.0',
    'compression': '^1.7.4',
    'config': '^3.3.7',
    'cors': '^2.8.5',
    'dotenv': '^16.0.0',
    'envalid': '^7.3.0',
    'express': '^4.17.3',
    'express-handlebars': '^5.3.5',
    'express-rate-limit': '^5.5.1',
    'faker': '^5.5.3',
    'fs-extra': '^10.0.1',
    'handlebars': '^4.7.7',
    'helmet': '^5.0.2',
    'i18n': '^0.14.2',
    'inversify': '^6.0.1',
    'inversify-express-utils': '^6.4.3',
    'inversify-inject-decorators': '^3.1.0',
    'jwt-simple': '^0.5.6',
    'koa': '^2.13.4',
    'koa-bodyparser': '^4.3.0',
    'koa-cors': '^0.0.16',
    'koa-hbs': '^0.9.0',
    'koa-helmet': '^6.1.0',
    'koa-qs': '^3.0.0',
    'koa-ratelimit': '^5.0.1',
    'koa-router': '^10.1.1',
    'lodash': '^4.17.21',
    'md5': '^2.3.0',
    'minio': '^7.0.26',
    'moment': '^2.29.2',
    'mongoose': '^6.2.8',
    'multer': '^1.4.5-lts.1',
    'node-cron': '^3.0.0',
    'nodemailer': '6.7.3',
    'pg-mem': '^2.6.3',
    'pg-promise': '^10.11.1',
    'promise-events': '^0.2.4',
    'reflect-metadata': '^0.1.13',
    'shelljs': '^0.8.5',
    'tedis': '^0.1.12',
    'ts-mixer': '^6.0.1',
    'tslog': '^3.3.3',
    'typeorm': '^0.3.6',
    'uuid': '^8.3.2',
    'web-push': '^3.4.5'
  },
  devDependencies: {
    '@commitlint/cli': '^16.2.4',
    '@commitlint/config-conventional': '^16.2.1',
    '@shelf/jest-mongodb': '^3.0.2',
    '@types/bcrypt': '^5.0.0',
    '@types/compression': '^1.7.2',
    '@types/config': '^0.0.41',
    '@types/cors': '^2.8.12',
    '@types/express': '^4.17.13',
    '@types/express-handlebars': '^3.1.0',
    '@types/express-rate-limit': '^5.1.3',
    '@types/faker': '^5.5.9',
    '@types/fs-extra': '^8.1.2',
    '@types/helmet': '^0.0.48',
    '@types/i18n': '^0.13.2',
    '@types/jest': '^27.4.1',
    '@types/jwt-simple': '^0.5.33',
    '@types/koa': '^2.13.4',
    '@types/koa-bodyparser': '^4.3.7',
    '@types/koa-cors': '^0.0.2',
    '@types/koa-hbs': '^1.0.7',
    '@types/koa-ratelimit': '^4.2.4',
    '@types/koa-router': '^7.4.4',
    '@types/koa__multer': '^2.0.4',
    '@types/lodash': '^4.14.180',
    '@types/md5': '^2.3.2',
    '@types/minio': '^7.0.12',
    '@types/multer': '^1.4.7',
    '@types/node-cron': '^3.0.1',
    '@types/nodemailer': '^6.4.4',
    '@types/pg': '^8.6.5',
    '@types/shelljs': '^0.8.11',
    '@types/supertest': '^2.0.12',
    '@types/uuid': '^8.3.4',
    '@types/validator': '^13.7.1',
    '@types/web-push': '^3.3.2',
    '@typescript-eslint/eslint-plugin': '^5.16.0',
    '@typescript-eslint/parser': '^5.16.0',
    'cpy-cli': '^3.1.1',
    'esbuild': '^0.14.49',
    'esbuild-node-externals': '^1.4.1',
    'esbuild-node-tsc': '^1.8.6',
    'esbuild-plugin-tsc': '^0.3.1',
    'eslint': '^8.11.0',
    'eslint-plugin-import': '^2.25.4',
    'eslint-plugin-prefer-arrow': '^1.2.3',
    'husky': '^7.0.4',
    'jest': '^28.1.3',
    'jest-environment-jsdom': '^28.1.3',
    'lint-staged': '^11.3.0-beta.2',
    'nodemon': '^2.0.19',
    'npm-run-all': '^4.1.5',
    'prettier': '^2.6.0',
    'rimraf': '^3.0.2',
    'supertest': '^6.2.4',
    'ts-jest': '^28.0.6',
    'ts-node': '^10.9.1',
    'typescript': '^4.6.4'
  },
  engines: {
    yarn: '^1.*'
  }
};

const createPackageJson = async(vars) =>
{
    if (vars.orm !== 'MikroORM')
    {
        delete packageJson.scripts['sync-db'];
        delete packageJson.dependencies['@mikro-orm/core'];
        delete packageJson.dependencies['@mikro-orm/postgresql'];
    }
    if (vars.orm !== 'TypeORM')
    {
        delete packageJson.devDependencies['@types/pg'];
        delete packageJson.dependencies['pg-mem'];
        delete packageJson.dependencies['pg-promise'];
        delete packageJson.dependencies['typeorm'];
    }
    if (vars.orm !== 'Mongoose')
    {
        delete packageJson.dependencies['mongoose'];
        delete packageJson.devDependencies['@types/mongodb'];
        delete packageJson.devDependencies['@types/mongooseStrategy'];
    }
    if (vars.orm !== 'MikroORM' || vars.orm !== 'TypeORM')
    {
        delete packageJson.dependencies['pg'];
        delete packageJson.dependencies['pg-promise'];
        delete packageJson.devDependencies['@types/pg'];
    }
    if (vars.orm !== 'Koa')
    {
        const dep = [
          '@koa/multer',
          'koa',
          'koa-bodyparser',
          'koa-cors',
          'koa-hbs',
          'koa-helmet',
          'koa-qs',
          'koa-ratelimit',
          'koa-router'
        ];

        const devDep = [
          '@types/koa',
          '@types/koa-bodyparser',
          '@types/koa-cors',
          '@types/koa-hbs',
          '@types/koa-ratelimit',
          '@types/koa-router',
          '@types/koa__multer'
        ];

        dep.forEach((index) =>
{
           delete packageJson.dependencies[index];
        });

        devDep.forEach((index) =>
{
           delete packageJson.devDependencies[index];
        });
    }
    if (vars.orm !== 'Express')
    {
        delete packageJson.dependencies['express'];
        delete packageJson.dependencies['express-handlebars'];
        delete packageJson.dependencies['express-rate-limit'];
        delete packageJson.dependencies['inversify-express-utils'];
        delete packageJson.devDependencies['@types/express'];
        delete packageJson.devDependencies['@types/express-handlebars'];
        delete packageJson.devDependencies['@types/express-rate-limit'];
    }

    // TODO: Order key in dependencies and devDependencies

    packageJson.name = vars.projectName;
    await writeFile('dist/package.json', JSON.stringify(packageJson, null, 4));
};

export default createPackageJson;
