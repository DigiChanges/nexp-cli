import 'reflect-metadata';
import './inversify.config';
import container from './register';

import supertest from 'supertest';

import DatabaseFactory from './Shared/Factories/DatabaseFactory';
import EventHandler from './Shared/Infrastructure/Events/EventHandler';
import { FACTORIES, REPOSITORIES } from './Config/Injects';
{{#ifEquals orm "Mongoose" }}
import TokenMongooseRepository from './Auth/Infrastructure/Repositories/TokenMongooseRepository'; {{/ifEquals}} {{#ifEquals orm "TypeORM" }}
import TokenTypeORMRepository from './Auth/Infrastructure/Repositories/TokenTypeORMRepository'; {{/ifEquals}} {{#ifEquals orm "MikroORM" }}
import TokenMikroORMRepository from './Auth/Infrastructure/Repositories/TokenMikroORMRepository'; {{/ifEquals}}

import { validateEnv } from './Config/validateEnv';
import ITokenDomain from './Auth/Domain/Entities/ITokenDomain';
import SeedFactory from './Shared/Factories/SeedFactory';
import Locales from './Shared/Presentation/Shared/Locales';
import MainConfig from './Config/MainConfig';
import IApp from './Shared/Application/Http/IApp';
import { Lifecycle } from 'tsyringe';
import MockStrategy from './Notification/Tests/MockStrategy';
import INotifierStrategy from './Notification/Shared/INotifierStrategy';
import AppFactory from './Shared/Factories/AppFactory';
import ICreateConnection from './Shared/Infrastructure/Database/ICreateConnection';
import ITokenRepository from './Auth/Infrastructure/Repositories/ITokenRepository';
import { urlAlphabet } from 'nanoid';
import { customAlphabet } from 'nanoid/async';

const initTestServer = async(): Promise<any> =>
{
    validateEnv();

    const config = MainConfig.getInstance().getConfig();

    const databaseFactory: DatabaseFactory = new DatabaseFactory();
    const dbConnection: ICreateConnection = databaseFactory.create();

    const nanoId = customAlphabet(urlAlphabet, 5);
    const dbName = await nanoId();
    const newMongoUri = `${process.env.MONGO_URL}${dbName}`;

    dbConnection.initConfigTest(newMongoUri);
    await dbConnection.create();

    const eventHandler = EventHandler.getInstance();
    await eventHandler.setListeners();

    void Locales.getInstance();
    {{#ifEquals orm "Mongoose" }}
    container.register<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository, { useClass: TokenMongooseRepository }, { lifecycle: Lifecycle.Singleton });{{/ifEquals}} {{#ifEquals orm "TypeORM" }}
    container.register<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository, { useClass: TokenTypeORMRepository }, { lifecycle: Lifecycle.Singleton });{{/ifEquals}} {{#ifEquals orm "MikroORM" }}
    container.register<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository, { useClass: TokenMikroORMRepository }, { lifecycle: Lifecycle.Singleton });{{/ifEquals}}
    container.register<INotifierStrategy>(FACTORIES.EmailStrategy, { useClass: MockStrategy }, { lifecycle: Lifecycle.Singleton });

    const app: IApp = AppFactory.create(config.app.default);

    app.initConfig({
        serverPort: 8088
    });
    await app.build();

    const application = app.callback();
    const request: supertest.SuperAgentTest = supertest.agent(application);

    const seed = new SeedFactory();
    await seed.init();

    return { request, dbConnection };
};

export default initTestServer;
