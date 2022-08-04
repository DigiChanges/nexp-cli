import moment from 'moment';
import Transformer from '../../../Shared/Presentation/Shared/Transformer';

import IRoleDomain from '../../Domain/Entities/IRoleDomain';
import IRoleTransformer from './IRoleTransformer';

class RoleTransformer extends Transformer
{
    public async transform(role: IRoleDomain): Promise<IRoleTransformer>
    {
        return {
            id: role.getId(),
            name: role.name,
            slug: role.slug,
            permissions: role.permissions ? role.permissions : null,
            enable: role.enable,
            createdAt: moment(role.createdAt).utc().unix(),
            updatedAt: moment(role.updatedAt).utc().unix()
        };
    }
}

export default RoleTransformer;
