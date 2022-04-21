import <%= domainName %>RepPayload from '../../InterfaceAdapters/Payloads/<%= domainName %>RepPayload';
import I<%= domainName %>Domain from '../../InterfaceAdapters/I<%= domainName %>Domain';
import <%= domainName %>Service from '../Services/<%= domainName %>Service';

class Save<%= domainName %>UseCase
{
    private <%= domainNameCamel %>Service = new <%= domainName %>Service();

    async handle(payload: <%= domainName %>RepPayload): Promise<I<%= domainName %>Domain>
    {
        return await this.<%= domainNameCamel %>Service.create(payload);
    }
}

export default Save<%= domainName %>UseCase;
