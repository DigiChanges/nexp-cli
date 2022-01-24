import { EntitySchema } from 'typeorm';
import DomainName from '../../Domain/Entities/<%= domainName %>';

const ItemSchema = new EntitySchema<DomainName>({
    name: 'Item',
    target: DomainName,
    tableName: 'items',
    columns: {
        _id: {
            type: 'uuid',
            primary: true,
            unique: true
        },
        name: {
            type: String
        },
        type: {
            type: Number
        },
        createdAt: {
            name: 'createdAt',
            type: 'timestamp with time zone',
            createDate: true
        },
        updatedAt: {
            name: 'updatedAt',
            type: 'timestamp with time zone',
            updateDate: true
        }
    },
    relations: {
        createdBy: {
            type: 'many-to-one',
            target: 'User',
            joinColumn: true,
            eager: true
        },
        lastModifiedBy: {
            type: 'many-to-one',
            target: 'User',
            joinColumn: true,
            eager: true
        }
    }
});

export default ItemSchema;
