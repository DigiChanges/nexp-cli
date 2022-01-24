import <%= domainName %>UpdatePayload from '../../InterfaceAdapters/Payloads/<%= domainName %>UpdatePayload';
import I<%= domainName %>Domain from '../../InterfaceAdapters/I<%= domainName %>Domain';
import <%= domainName %>Service from '../Services/<%= domainName %>Service';

class Update<%= domainName %>UseCase
{
    private <%= domainNameCamel %>Service = new <%= domainName %>Service();

    async handle(payload: <%= domainName %>UpdatePayload): Promise<I<%= domainName %>Domain>
    {
        return await this.<%= domainNameCamel %>Service.update(payload);
    }
}

export default Update<%= domainName %>UseCase;
