import { ICreateConnection } from '@digichanges/shared-experience';
import MainConfig from '../../Config/mainConfig';<% if (orm == 'TypeORM') { %>
import TypeORMCreateConnection from '../Database/TypeORMCreateConnection';<% } %><% if (orm == 'Mongoose') { %>
import MongooseCreateConnection from '../Database/MongooseCreateConnection';<% } %><% if (orm == 'MikroORM') { %>
import MikroORMCreateConnection from '../Database/MikroORMCreateConnection';<% } %>

class DatabaseFactory
{
    private dbDefault: string;

    constructor(dbDefault?: string)
    {
        this.dbDefault = dbDefault;
    }

    create(): ICreateConnection
    {
        const mainConfig = MainConfig.getInstance();

        if (!this.dbDefault)
        {
            this.dbDefault = mainConfig.getConfig().dbConfig.default;
        }

        const dbConfig: any = mainConfig.getConfig().dbConfig;
        const config = dbConfig[this.dbDefault];

        const createConnections: Record<string, any> = {
            <%= orm %>: <%= orm %>CreateConnection
        };

        return new createConnections[this.dbDefault](config);
    }
}

export default DatabaseFactory;
