import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import I<%= domainName %>Domain from '../../InterfaceAdapters/I<%= domainName %>Domain';
import <%= domainName %>Service from '../Services/<%= domainName %>Service';

class Get<%= domainName %>UseCase
{
    private <%= domainNameCamel %>Service = new <%= domainName %>Service();

    async handle(payload: IdPayload): Promise<I<%= domainName %>Domain>
    {
        const id = payload.getId();
        return await this.itemService.getOne(id);
    }
}

export default Get<%= domainName %>UseCase;
