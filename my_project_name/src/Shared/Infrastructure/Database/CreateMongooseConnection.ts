import mongoose from 'mongoose';
import MainConfig from '../../../Config/MainConfig';

import UserMongooseDocument from '../../../User/Infrastructure/Schemas/UserMongooseDocument';
import RoleMongooseDocument from '../../../Role/Infrastructure/Schemas/RoleMongooseDocument';
import ItemMongooseDocument from '../../../Item/Infrastructure/Schemas/ItemMongooseDocument';
import FileMongooseDocument from '../../../File/Infrastructure/Schemas/FileMongooseDocument';
import NotificationMongooseDocument from '../../../Notification/Infrastructure/Schemas/NotificationMongooseDocument';
import ITokenMongooseDocument from '../../../Auth/Infrastructure/Schemas/ITokenMongooseDocument';

import ItemSchema from '../../../Item/Infrastructure/Schemas/ItemMongoose';

import RoleSchema from '../../../Role/Infrastructure/Schemas/RoleMongoose';
import UserSchema from '../../../User/Infrastructure/Schemas/UserMongoose';
import FileSchema from '../../../File/Infrastructure/Schemas/FileMongoose';
import { EmailNotificationSchema, NotificationSchema, PushNotificationSchema } from '../../../Notification/Infrastructure/Schemas/NotificationMongoose';
import TokenSchema from '../../../Auth/Infrastructure/Schemas/TokenMongoose';
import ICreateConnection from './ICreateConnection';

export let connection: mongoose.Connection = null;

class CreateMongooseConnection implements ICreateConnection
{
    private readonly config: any;
    private uri: string;
    private readonly options: any;

    constructor(config: any)
    {
        this.config = config;
        this.uri = '';
        this.options = {
            autoIndex: true
        };
    }

    async initConfig()
    {
        const config = MainConfig.getInstance().getConfig().dbConfig.Mongoose;
        this.uri = `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`;

        if (config.ssl === true)
        {
            this.options['ssl'] = config.ssl;
            this.options['sslValidate'] = config.sslValidate;
            this.options['sslCA'] = config.sslCA;
            this.options['replicaSet'] = config.replicaSet;
            this.uri = `${config.driver}://${config.username}:${config.password}@${config.host}/${config.database}?authSource=admin`;
        }
    }

    async initConfigTest(uri: string)
    {
        this.uri = uri;
    }

    async create(): Promise<any>
    {
        connection = mongoose.createConnection(this.uri);

        // Domain
        connection.model<UserMongooseDocument>('User', UserSchema);
        connection.model<RoleMongooseDocument>('Role', RoleSchema);
        connection.model<ItemMongooseDocument>('Item', ItemSchema);
        connection.model<FileMongooseDocument>('File', FileSchema);

        // Infrastructure
        const NotificationModel = connection.model<NotificationMongooseDocument>('Notification', NotificationSchema);
        NotificationModel.discriminator('EmailNotification', EmailNotificationSchema);
        NotificationModel.discriminator('PushNotification', PushNotificationSchema);
        connection.model<ITokenMongooseDocument>('Token', TokenSchema);

        return connection;
    }

    async close(): Promise<any>
    {
        await connection.close(true);
    }

    async drop(): Promise<any>
    {
        const collections = await connection.db.collections();

        for (const collection of collections)
        {
            await collection.drop();
        }
    }
}

export default CreateMongooseConnection;
