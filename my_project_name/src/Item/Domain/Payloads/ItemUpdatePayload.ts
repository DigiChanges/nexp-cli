import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import ItemRepPayload from './ItemRepPayload';
import IUserDomain from '../../../User/Domain/Entities/IUserDomain';

interface ItemUpdatePayload extends IdPayload, ItemRepPayload
{
    authUser: IUserDomain;
}

export default ItemUpdatePayload;
