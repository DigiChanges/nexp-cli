import moment from 'moment';
import { Transformer } from '@digichanges/shared-experience';

import IUserDomain from '../../Domain/Entities/IUserDomain';
import RoleTransformer from '../../../Role/Presentation/Transformers/RoleTransformer';
import IUserTransformer from './IUserTransformer';

class UserTransformer extends Transformer
{
    private roleTransformer: RoleTransformer;

    constructor()
    {
        super();
        this.roleTransformer = new RoleTransformer();
    }

    public async transform(user: IUserDomain): Promise<IUserTransformer>
    {
        return {
            id: user.getId(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            birthday: user.birthday,
            documentType: user.documentType,
            documentNumber: user.documentNumber,
            gender: user.gender,
            phone: user.phone,
            country: user.country,
            address: user.address,
            enable: user.enable,
            roles: await this.roleTransformer.handle(user.getRoles()),
            permissions: user.permissions,
            createdAt: moment(user.createdAt).utc().unix(),
            updatedAt: moment(user.updatedAt).utc().unix()
        };
    }
}

export default UserTransformer;
