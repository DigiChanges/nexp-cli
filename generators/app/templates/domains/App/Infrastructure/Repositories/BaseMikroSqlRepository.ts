import { injectable, unmanaged } from 'inversify';
import { EntityRepository, EntitySchema, FindOneOptions } from '@mikro-orm/core';
import NotFoundException from '../../../Shared/Exceptions/NotFoundException';
import IByOptions from '../../InterfaceAdapters/IByOptions';
import IBaseRepository from '../../InterfaceAdapters/IBaseRepository';
import EntityManagerFactory from '../../../Shared/Factories/EntityManagerFactory'; // TODO: Refactor

@injectable()
abstract class BaseMikroSqlRepository<T> implements IBaseRepository<T>
{
    protected readonly entityName: string;
    protected repository: EntityRepository<any>;
    protected em = EntityManagerFactory.getEntityFactory();
    protected populate: string[];

    constructor(@unmanaged() entityName: string, @unmanaged() entitySchema: EntitySchema<any>, @unmanaged() populate: string[] = [])
    {
        this.entityName = entityName;
        this.repository = this.em.getRepository(entitySchema);
        this.populate = populate;
    }

    async save(entity: T): Promise<T>
    {
        await this.repository.persistAndFlush(entity);
        return entity;
    }

    async getOne(id: string): Promise<T>
    {
        const options = { populate: this.populate };
        const entity = await this.repository.findOne(id, (options as any));

        if (!entity)
        {
            throw new NotFoundException(this.entityName);
        }

        return entity;
    }

    async update(entity: T): Promise<T>
    {
        await this.repository.persistAndFlush(entity);
        return entity;
    }

    async delete(id: string): Promise<T>
    {
        const options = { populate: this.populate };
        const entity = await this.repository.findOne(id, (options as any));

        if (!entity)
        {
            throw new NotFoundException(this.entityName);
        }

        await this.repository.removeAndFlush(entity);

        return entity;
    }

    async getOneBy(condition: Record<string, any>, options: IByOptions = {}): Promise<T>
    {
        const { initThrow = true, populate = [] } = options;

        const entity = await this.repository.findOne(condition, ({ populate } as FindOneOptions<T>));

        if (initThrow && !entity)
        {
            throw new NotFoundException(this.entityName);
        }

        return entity;
    }

    async getBy(condition: Record<string, any>, options: IByOptions = { initThrow: false, populate: null }): Promise<T[]>
    {
        let { initThrow, populate } = options;

        initThrow = initThrow ?? false;
        populate = populate ?? null;

        const entities = await this.repository.find(condition, { populate } as any);

        if (initThrow && entities.length === 0)
        {
            throw new NotFoundException(this.entityName);
        }

        return entities;
    }

    async getInBy(condition: Record<string, string[]>): Promise<T[]>
    {
        const queryBuilder = this.em.createQueryBuilder<T>(this.entityName, 'i');
        const [key] = Object.keys(condition);

        return await queryBuilder
            .where({ [key]: { $in: condition[key] } })
            .andWhere('1 = 1')
            .getResultList();
    }

    async exist(condition: Record<string, any> | Record<string, any>[], select: string[], initThrow = false): Promise<any>
    {
        // @ts-ignore
        const exist = await this.repository.findOne(condition, { fields: select });

        if (initThrow && !exist)
        {
            throw new NotFoundException(this.entityName);
        }

        return exist;
    }
}

export default BaseMikroSqlRepository;
