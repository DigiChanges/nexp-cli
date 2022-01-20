import cors from 'koa-cors';
import helmet from 'koa-helmet';
import hbshbs from 'koa-hbs';
import koaPino from 'koa-pino-logger';

import AuthenticationMiddleware from '../../../../Auth/Presentation/Middlewares/Koa/AuthenticationMiddleware';
import RedirectRouteNotFoundMiddleware from '../../Middlewares/Koa/RedirectRouteNotFoundMiddleware';
import Throttle from '../../Middlewares/Koa/Throttle';
import VerifyTokenMiddleware from '../../../../Auth/Presentation/Middlewares/Koa/VerifyTokenMiddleware';
import IApp from '../../../InterfaceAdapters/IApp';
import Locales from '../Locales';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import IndexHandler from '../../Handlers/Koa/IndexHandler';
import RoleHandler from '../../../../Role/Presentation/Handlers/Koa/RoleHandler';
import UserHandler from '../../../../User/Presentation/Handlers/Koa/UserHandler';
import NotificationHandler from '../../../../Notification/Presentation/Handlers/Koa/NotificationHandler';<% if (fileDomain) { %>
import FileHandler from '../../../../File/Presentation/Handlers/Koa/FileHandler';<% } %>
import AuthHandler from '../../../../Auth/Presentation/Handlers/Koa/AuthHandler';
import IAppConfig from '../../../InterfaceAdapters/IAppConfig';
import WhiteListHandler from '../../../Tests/Koa/WhiteListHandler';
import { ErrorHandler } from './ErrorHandler';
import Logger from '../../../../Shared/Logger/Logger';
import MainConfig from '../../../../Config/mainConfig';<% if (orm == "MikroORM") { %>
import { RequestContext } from '@mikro-orm/core';
import { orm as mikroORM } from '../../../../Shared/Database/MikroORMCreateConnection';<% } %>

class AppKoa implements IApp
{
    public port?: number;
    private readonly app: Koa;
    private locales: Locales;
    private config: IAppConfig;

    constructor(config: IAppConfig)
    {
        this.port = config.serverPort || 8090;
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        this.app = require('koa-qs')(new Koa());
        this.locales = Locales.getInstance();
        this.config = config;
    }

    public initConfig()
    {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(hbshbs.middleware({
            viewPath: this.config.viewRouteEngine
        }));

        // Generic error handling middleware.
        this.app.use(ErrorHandler.handle);

        this.app.use(bodyParser({
            jsonLimit: '5mb'
        }));<% if (orm == "MikroORM") { %>

        this.app.use((ctx, next) => RequestContext.createAsync(mikroORM.em, next));<% } %>

        this.app.use(koaPino({ logger: <any>Logger }));

        this.app.use(Throttle);
        this.app.use(AuthenticationMiddleware);
        this.app.use(VerifyTokenMiddleware);
    }

    public build(): void
    {
        // Route middleware.
        this.app.use(IndexHandler.routes());
        this.app.use(IndexHandler.allowedMethods());

        this.app.use(WhiteListHandler.routes());
        this.app.use(WhiteListHandler.allowedMethods());

        this.app.use(RoleHandler.routes());
        this.app.use(RoleHandler.allowedMethods());

        this.app.use(UserHandler.routes());
        this.app.use(UserHandler.allowedMethods());

        this.app.use(NotificationHandler.routes());
        this.app.use(NotificationHandler.allowedMethods());<% if (fileDomain) { %>

        this.app.use(FileHandler.routes());
        this.app.use(FileHandler.allowedMethods());<% } %>

        this.app.use(AuthHandler.routes());
        this.app.use(AuthHandler.allowedMethods());

        this.app.use(RedirectRouteNotFoundMiddleware);
    }

    public listen(): any
    {
        return this.app.listen(this.port, () =>
        {
            Logger.debug(`Koa is listening to http://localhost:${this.port}`);
        });
    }

    public callback(): any
    {
        return this.app.callback();
    }
}

export default AppKoa;
