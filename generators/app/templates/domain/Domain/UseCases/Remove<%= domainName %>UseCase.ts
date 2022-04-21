import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import I<%= domainName %>Domain from '../../InterfaceAdapters/I<%= domainName %>Domain';
import <%= domainName %>Service from '../Services/<%= domainName %>Service';

class Remove<%= domainName %>UseCase
{
    private <%= domainNameCamel %>Service = new <%= domainName %>Service();

    async handle(payload: IdPayload): Promise<I<%= domainName %>Domain>
    {
        const id = payload.getId();
        return await this.<%= domainNameCamel %>Service.remove(id);
    }
}

export default Remove<%= domainName %>UseCase;
