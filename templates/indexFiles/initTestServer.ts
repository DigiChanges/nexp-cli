import 'reflect-metadata';

import supertest from 'supertest';

import { ICreateConnection, ITokenRepository } from '@digichanges/shared-experience';


import DatabaseFactory from './Shared/Factories/DatabaseFactory';
import EventHandler from './Shared/Events/EventHandler';
import { REPOSITORIES } from './Config/Injects/repositories';{{#ifEquals orm 'Mongoose' }}
import TokenMongoRepository from './Auth/Infrastructure/Repositories/TokenMongoRepository';{{/ifEquals}} {{#ifEquals orm 'TypeORM' }}
import TokenSqlRepository from './Auth/Infrastructure/Repositories/TokenSqlRepository';{{/ifEquals}} {{#ifEquals orm 'MikroORM' }}
import TokenMikroSqlRepository from './Auth/Infrastructure/Repositories/TokenMikroSqlRepository';{{/ifEquals}}
import { validateEnv } from './Config/validateEnv';
import container from './inversify.config';
import ITokenDomain from './Auth/Domain/Entities/ITokenDomain';
import SeedFactory from './Shared/Factories/SeedFactory';
import AppFactory from './App/Presentation/Factories/AppFactory';
import Locales from './App/Presentation/Shared/Locales';
import { FACTORIES } from './Config/Injects/factories';
import INotificationFactory from './Notification/Shared/INotificationFactory';
import MockNotificationFactory from './Notification/Tests/MockNotificationFactory';

const initTestServer = async(): Promise<any> =>
{
    validateEnv();

    const databaseFactory: DatabaseFactory = new DatabaseFactory();
    const dbConnection: ICreateConnection = databaseFactory.create();

    dbConnection.initConfigTest(process.env.MONGO_URL);
    await dbConnection.create();

    const eventHandler = EventHandler.getInstance();
    await eventHandler.setListeners();

    void Locales.getInstance();

    container.unbind(REPOSITORIES.ITokenRepository);{{#ifEquals orm 'Mongoose' }}
    container.bind<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository).to(TokenMongoRepository);{{/ifEquals}} {{#ifEquals orm 'TypeORM' }}
    container.bind<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository).to(TokenSqlRepository);{{/ifEquals}} {{#ifEquals orm 'MikroORM' }}
    container.bind<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository).to(TokenMikroSqlRepository);{{/ifEquals}}

    container.unbind(FACTORIES.INotificationFactory);
    container.bind<INotificationFactory>(FACTORIES.INotificationFactory).to(MockNotificationFactory);

    const app = AppFactory.create('App{{http}}',
        viewRouteEngine: `${process.cwd()}/dist/src/App/Presentation/Views`,
        serverPort: 8088
    });

    app.initConfig();
    app.build();

    const application = app.callback();
    const request: supertest.SuperAgentTest = supertest.agent(application);

    const seed = new SeedFactory();
    await seed.init();

    return { request, dbConnection };
};

export default initTestServer;

