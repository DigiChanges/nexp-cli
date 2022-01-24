import IItemDomain from '../../InterfaceAdapters/IItemDomain';

import SaveDomainNameUseCase from '../../Domain/UseCases/Save<%= domainName %>UseCase';
import ListDomainNamePluralUseCase from '../../Domain/UseCases/List<%= domainNamePlural %>UseCase';
import GetDomainNameUseCase from '../../Domain/UseCases/Get<%= domainName %>UseCase';
import RemoveDomainNameUseCase from '../../Domain/UseCases/Remove<%= domainName %>UseCase';
import UpdateDomainNameUseCase from '../../Domain/UseCases/Update<%= domainName %>UseCase';
import ValidatorRequest from '../../../App/Presentation/Shared/ValidatorRequest';
import ItemRepPayload from '../../InterfaceAdapters/Payloads/ItemRepPayload';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';
import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import ItemUpdatePayload from '../../InterfaceAdapters/Payloads/ItemUpdatePayload';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';

class ItemController
{
    public async save(request: ItemRepPayload, authUser: IUserDomain): Promise<IItemDomain>
    {
        await ValidatorRequest.handle(request);

        const useCase = new SaveDomainNameUseCase();
        return await useCase.handle(request, authUser);
    }

    public async list(request: ICriteria): Promise<IPaginator>
    {
        await ValidatorRequest.handle(request);

        const useCase = new ListDomainNamePluralUseCase();
        return await useCase.handle(request);
    }

    public async getOne(request: IdPayload): Promise<IItemDomain>
    {
        await ValidatorRequest.handle(request);

        const useCase = new GetDomainNameUseCase();
        return await useCase.handle(request);
    }

    public async update(request: ItemUpdatePayload, authUser: IUserDomain): Promise<IItemDomain>
    {
        await ValidatorRequest.handle(request);

        const useCase = new UpdateDomainNameUseCase();
        return await useCase.handle(request, authUser);
    }

    public async remove(request: IdPayload): Promise<IItemDomain>
    {
        await ValidatorRequest.handle(request);

        const useCase = new RemoveDomainNameUseCase();
        return await useCase.handle(request);
    }
}

export default ItemController;
