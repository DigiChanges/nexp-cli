import 'reflect-metadata';
import { container, Lifecycle } from 'tsyringe';

import { FACTORIES, SERVICES, REPOSITORIES } from './Config/Injects';

import BcryptEncryptionStrategy from './Shared/Infrastructure/Encryption/BcryptEncryptionStrategy';
import Md5EncryptionStrategy from './Shared/Infrastructure/Encryption/Md5EncryptionStrategy';

import INotifierStrategy from './Notification/Shared/INotifierStrategy';
import EmailStrategy from './Notification/Shared/EmailStrategy';
import WebPushStrategy from './Notification/Shared/WebPushStrategy';

import AuthService from './Auth/Domain/Services/AuthService';
import UserService from './User/Domain/Services/UserService';

import IUserRepository from './User/Infrastructure/Repositories/IUserRepository';
import IRoleRepository from './Role/Infrastructure/Repositories/IRoleRepository';
import IItemRepository from './Item/Infrastructure/Repositories/IItemRepository';
import IFileRepository from './File/Infrastructure/Repositories/IFileRepository';
import INotificationRepository from './Notification/Infrastructure/Repositories/INotificationRepository';
import INotificationDomain from './Notification/Domain/Entities/INotificationDomain';
import ITokenDomain from './Auth/Domain/Entities/ITokenDomain';  

import UserMongooseRepository from './User/Infrastructure/Repositories/UserMongooseRepository';
import RoleMongooseRepository from './Role/Infrastructure/Repositories/RoleMongooseRepository';
import FileMongooseRepository from './File/Infrastructure/Repositories/FileMongooseRepository';
import ItemMongooseRepository from './Item/Infrastructure/Repositories/ItemMongooseRepository';
import NotificationMongooseRepository from './Notification/Infrastructure/Repositories/NotificationMongooseRepository';   

import IEncryption from './Shared/Infrastructure/Encryption/IEncryption';
import ITokenRepository from './Auth/Infrastructure/Repositories/ITokenRepository';
import TokenRedisRepository from './Auth/Infrastructure/Repositories/TokenRedisRepository';

/* Services */
container.register(SERVICES.AuthService, { useClass: AuthService }, { lifecycle: Lifecycle.Singleton });
container.register(SERVICES.UserService, { useClass: UserService }, { lifecycle: Lifecycle.Singleton });

/* Repositories */  
container.register<IUserRepository>(REPOSITORIES.IUserRepository, { useClass: UserMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
container.register<IRoleRepository>(REPOSITORIES.IRoleRepository, { useClass: RoleMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
container.register<IItemRepository>(REPOSITORIES.IItemRepository, { useClass: ItemMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
container.register<IFileRepository>(REPOSITORIES.IFileRepository, { useClass: FileMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
container.register<INotificationRepository<INotificationDomain>>(REPOSITORIES.INotificationRepository, { useClass: NotificationMongooseRepository }, { lifecycle: Lifecycle.ContainerScoped });
 container.register<ITokenRepository<ITokenDomain>>(REPOSITORIES.ITokenRepository, { useClass: TokenRedisRepository }, { lifecycle: Lifecycle.ContainerScoped });

// Shared
container.register<IEncryption>(FACTORIES.BcryptEncryptionStrategy, { useClass: BcryptEncryptionStrategy }, { lifecycle: Lifecycle.Singleton });
container.register<IEncryption>(FACTORIES.Md5EncryptionStrategy, { useClass: Md5EncryptionStrategy }, { lifecycle: Lifecycle.Singleton });

container.register<INotifierStrategy>(FACTORIES.EmailStrategy, { useClass: EmailStrategy }, { lifecycle: Lifecycle.Singleton });
container.register<INotifierStrategy>(FACTORIES.WebPushStrategy, { useClass: WebPushStrategy }, { lifecycle: Lifecycle.Singleton });

export default container;
