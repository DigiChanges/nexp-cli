import 'reflect-metadata';
import { Container } from 'inversify';
import MainConfig from './Config/mainConfig';

import FormatResponder from './App/Presentation/Shared/FormatResponder';
import IFormatResponder from './Shared/InterfaceAdapters/IFormatResponder';
import Responder from './App/Presentation/Shared/Express/Responder';

import IItemRepository from './Item/InterfaceAdapters/IItemRepository';
import IUserRepository from './User/InterfaceAdapters/IUserRepository';
import IRoleRepository from './Role/InterfaceAdapters/IRoleRepository';<% if (fileDomain) { %>
import IFileRepository from './File/InterfaceAdapters/IFileRepository';<% } %>

import { REPOSITORIES } from './Config/Injects/repositories';
import { TYPES } from './Config/Injects/types';

<% if (orm == "Mongoose") { %>
import ItemMongoRepository from './Item/Infrastructure/Repositories/ItemMongoRepository';
import UserMongoRepository from './User/Infrastructure/Repositories/UserMongoRepository';
import RoleMongoRepository from './Role/Infrastructure/Repositories/RoleMongoRepository';<% if (fileDomain) { %>
import FileMongoRepository from './File/Infrastructure/Repositories/FileMongoRepository';<% } %>
<% } %><% if (orm == "TypeORM") { %>
import ItemSqlRepository from './Item/Infrastructure/Repositories/ItemSqlRepository';
import UserSqlRepository from './User/Infrastructure/Repositories/UserSqlRepository';<% if (fileDomain) { %>
import FileSqlRepository from './File/Infrastructure/Repositories/FileSqlRepository';<% } %>
import RoleSqlRepository from './Role/Infrastructure/Repositories/RoleSqlRepository';
<% } %><% if (orm == "MikroORM") { %>
import RoleMikroSqlRepository from './Role/Infrastructure/Repositories/RoleMikroSqlRepository';
import UserMikroSqlRepository from './User/Infrastructure/Repositories/UserMikroSqlRepository';
import ItemMikroSqlRepository from './Item/Infrastructure/Repositories/ItemMikroSqlRepository';<% if (fileDomain) { %>
import FileMikroSqlRepository from './File/Infrastructure/Repositories/FileMikroSqlRepository';<% } %><% } %>

import TokenRedisRepository from './Auth/Infrastructure/Repositories/TokenRedisRepository';

import { ITokenRepository } from '@digichanges/shared-experience';

import ITokenDomain from './Auth/InterfaceAdapters/ITokenDomain';
import INotificationRepository from './Notification/InterfaceAdapters/INotificationRepository';
import INotificationDomain from './Notification/InterfaceAdapters/INotificationDomain';
import NotificationMongoRepository from './Notification/Infrastructure/Repositories/NotificationMongoRepository';
import INotificationFactory from './Notification/Shared/INotificationFactory';
import { FACTORIES } from './Config/Injects/factories';
import NotificationFactory from './Notification/Shared/NotificationFactory';

const container = new Container();

/* Libs */
container.bind<Responder>(TYPES.Responder).to(Responder);
container.bind<IFormatResponder>(TYPES.IFormatResponder).to(FormatResponder);

/* Repositories */<% if (orm == "TypeORM") { %>
container.bind<IItemRepository>(REPOSITORIES.IItemRepository).to(ItemSqlRepository);
container.bind<IUserRepository>(REPOSITORIES.IUserRepository).to(UserSqlRepository);
container.bind<IRoleRepository>(REPOSITORIES.IRoleRepository).to(RoleSqlRepository);<% if (fileDomain) { %>
container.bind<IFileRepository>(REPOSITORIES.IFileRepository).to(FileSqlRepository);<% } %>
<% } %><% if (orm == "MikroORM") { %>
container.bind<IItemRepository>(REPOSITORIES.IItemRepository).to(ItemMikroSqlRepository);
container.bind<IRoleRepository>(REPOSITORIES.IRoleRepository).to(RoleMikroSqlRepository);
container.bind<IUserRepository>(REPOSITORIES.IUserRepository).to(UserMikroSqlRepository);<% if (fileDomain) { %>
container.bind<IFileRepository>(REPOSITORIES.IFileRepository).to(FileMikroSqlRepository);<% } %>
// container.bind<INotificationRepository<INotificationDomain>>(REPOSITORIES.INotificationRepository).to(NotificationMongoRepository);
<% } %><% if (orm == "Mongoose") { %>
container.bind<IItemRepository>(REPOSITORIES.IItemRepository).to(ItemMongoRepository);
container.bind<IUserRepository>(REPOSITORIES.IUserRepository).to(UserMongoRepository);
container.bind<IRoleRepository>(REPOSITORIES.IRoleRepository).to(RoleMongoRepository);<% if (fileDomain) { %>
container.bind<IFileRepository>(REPOSITORIES.IFileRepository).to(FileMongoRepository);<% } %>
container.bind<INotificationRepository<INotificationDomain>>(REPOSITORIES.INotificationRepository).to(NotificationMongoRepository);<% } %>

container.bind<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository).to(TokenRedisRepository);

/* Factories */
container.bind<INotificationFactory>(FACTORIES.INotificationFactory).to(NotificationFactory);

export default container;
