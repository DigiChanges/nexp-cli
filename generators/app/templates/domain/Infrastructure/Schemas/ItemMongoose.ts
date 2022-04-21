import { Schema } from 'mongoose';
import DomainName from '../../Domain/Entities/<%= domainName %>';
import { v4 as uuidv4 } from 'uuid';

const ItemSchema: any = new Schema<DomainName>({
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    type: { type: Number, required: true },
    createdBy: { type: Schema.Types.String, ref: 'User' },
    lastModifiedBy: { type: Schema.Types.String, ref: 'User' }
}, { timestamps: true });

ItemSchema.loadClass(DomainName);

export default ItemSchema;
