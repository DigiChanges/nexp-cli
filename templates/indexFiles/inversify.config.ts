import 'reflect-metadata';
import { Container } from 'inversify';

import FormatResponder from './App/Presentation/Shared/FormatResponder';
import IFormatResponder from './Shared/InterfaceAdapters/IFormatResponder';{{#ifEquals http "Express" }}
import Responder from './App/Presentation/Shared/Express/Responder';{{/ifEquals}}

import IUserRepository from './User/Infrastructure/Repositories/IUserRepository';
import IRoleRepository from './Role/Infrastructure/Repositories/IRoleRepository';{{#if fileDomain }}
import IFileRepository from './File/Infrastructure/Repositories/IFileRepository';{{/if}}
import INotificationRepository from './Notification/Infrastructure/Repositories/INotificationRepository';

import { REPOSITORIES } from './Config/Injects/repositories';
import { TYPES } from './Config/Injects/types';

{{#ifEquals orm "Mongoose" }}
import UserMongoRepository from './User/Infrastructure/Repositories/UserMongoRepository';
import RoleMongoRepository from './Role/Infrastructure/Repositories/RoleMongoRepository';{{#if fileDomain }}
import FileMongoRepository from './File/Infrastructure/Repositories/FileMongoRepository';{{/if}}
import NotificationMongoRepository from './Notification/Infrastructure/Repositories/NotificationMongoRepository';
{{/ifEquals}} {{#ifEquals orm "TypeORM" }}
import UserSqlRepository from './User/Infrastructure/Repositories/UserSqlRepository';{{#if fileDomain }}
import FileSqlRepository from './File/Infrastructure/Repositories/FileSqlRepository';{{/if}}
import RoleSqlRepository from './Role/Infrastructure/Repositories/RoleSqlRepository';
// import NotificationSqlRepository from './Notification/Infrastructure/Repositories/NotificationSqlRepository';
{{/ifEquals}} {{#ifEquals orm "MikroORM" }}
import RoleMikroSqlRepository from './Role/Infrastructure/Repositories/RoleMikroSqlRepository';
import UserMikroSqlRepository from './User/Infrastructure/Repositories/UserMikroSqlRepository';{{#if fileDomain }}
import FileMikroSqlRepository from './File/Infrastructure/Repositories/FileMikroSqlRepository';{{/if}}
// import NotificationSqlRepository from './Notification/Infrastructure/Repositories/NotificationMikroSqlRepository';
{{/ifEquals}}

import TokenRedisRepository from './Auth/Infrastructure/Repositories/TokenRedisRepository';

import { ITokenRepository } from '@digichanges/shared-experience';

import ITokenDomain from './Auth/Domain/Entities/ITokenDomain';
import INotificationDomain from './Notification/Domain/Entities/INotificationDomain';
import INotificationFactory from './Notification/Shared/INotificationFactory';
import { FACTORIES } from './Config/Injects/factories';
import NotificationFactory from './Notification/Shared/NotificationFactory';

const container = new Container();

/* Libs */{{#ifEquals http "Express" }}
container.bind<Responder>(TYPES.Responder).to(Responder);{{/ifEquals}}
container.bind<IFormatResponder>(TYPES.IFormatResponder).to(FormatResponder);

/* Repositories */{{#ifEquals orm "TypeORM" }}
container.bind<IUserRepository>(REPOSITORIES.IUserRepository).to(UserSqlRepository);
container.bind<IRoleRepository>(REPOSITORIES.IRoleRepository).to(RoleSqlRepository);{{#if fileDomain }}
container.bind<IFileRepository>(REPOSITORIES.IFileRepository).to(FileSqlRepository);{{/if}}
// container.bind<INotificationRepository<INotificationDomain>>(REPOSITORIES.INotificationRepository).to(NotificationMongoRepository);
{{/ifEquals}} {{#ifEquals orm "MikroORM" }}
container.bind<IRoleRepository>(REPOSITORIES.IRoleRepository).to(RoleMikroSqlRepository);
container.bind<IUserRepository>(REPOSITORIES.IUserRepository).to(UserMikroSqlRepository);{{#if fileDomain }}
container.bind<IFileRepository>(REPOSITORIES.IFileRepository).to(FileMikroSqlRepository);{{/if}}
// container.bind<INotificationRepository<INotificationDomain>>(REPOSITORIES.INotificationRepository).to(NotificationMongoRepository);
{{/ifEquals}} {{#ifEquals orm "Mongoose" }}
container.bind<IUserRepository>(REPOSITORIES.IUserRepository).to(UserMongoRepository);
container.bind<IRoleRepository>(REPOSITORIES.IRoleRepository).to(RoleMongoRepository);{{#if fileDomain }}
container.bind<IFileRepository>(REPOSITORIES.IFileRepository).to(FileMongoRepository);{{/if}}
container.bind<INotificationRepository<INotificationDomain>>(REPOSITORIES.INotificationRepository).to(NotificationMongoRepository);{{/ifEquals}}

container.bind<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository).to(TokenRedisRepository);

/* Factories */
container.bind<INotificationFactory>(FACTORIES.INotificationFactory).to(NotificationFactory);

export default container;
