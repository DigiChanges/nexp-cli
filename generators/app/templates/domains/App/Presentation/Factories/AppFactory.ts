import IApp from '../../InterfaceAdapters/IApp';<% if (http == "Express") { %>
import AppExpress from '../Shared/Express/AppExpress';<% } %><% if (http == "Koa") { %>
import AppKoa from '../Shared/Koa/AppKoa';<% } %>
import IAppConfig from '../../InterfaceAdapters/IAppConfig';

class AppFactory
{
    static create(appName = 'AppExpress', config: IAppConfig): IApp
    {
        const strategy: Record<string, any> = {<% if (http == "Express") { %>
            [AppExpress.name]: AppExpress<% } %><% if (http == "Koa") { %>
            [AppKoa.name]: AppKoa<% } %>
        };

        return new strategy[appName](config);
    }
}

export default AppFactory;
