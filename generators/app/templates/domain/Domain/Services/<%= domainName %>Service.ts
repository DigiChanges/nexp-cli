import <%= domainName %>RepPayload from '../../InterfaceAdapters/Payloads/<%= domainName %>RepPayload';
import I<%= domainName %>Domain from '../../InterfaceAdapters/I<%= domainName %>Domain';
import <%= domainName %> from '../Entities/<%= domainName %>';
import I<%= domainName %>Repository from '../../InterfaceAdapters/I<%= domainName %>Repository';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import <%= domainName %>UpdatePayload from '../../InterfaceAdapters/Payloads/ItemUpdatePayload';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';

class <%= domainName %>Service
{
    @containerFactory(REPOSITORIES.I<%= domainName %>Repository)
    private repository: I<%= domainName %>Repository;

    async persist(<%= domainNameCamel %>: I<%= domainName %>Domain, payload: <%= domainName %>RepPayload): Promise<I<%= domainName %>Domain>
    {
        return await this.repository.save(<%= domainNameCamel %>);
    }

    async create(payload: <%= domainName %>RepPayload): Promise<I<%= domainName %>Domain>
    {
        const <%= domainNameCamel %> = new <%= domainName %>();

        return await this.persist(<%= domainNameCamel %>, payload);
    }

    async update(payload: <%= domainName %>UpdatePayload): Promise<I<%= domainName %>Domain>
    {
        const id = payload.getId();
        const <%= domainNameCamel %>: I<%= domainName %>Domain = await this.getOne(id);

        return await this.persist(<%= domainNameCamel %>, payload);
    }

    async getOne(id: string): Promise<I<%= domainName %>Domain>
    {
        return await this.repository.getOne(id);
    }

    async remove(id: string): Promise<I<%= domainName %>Domain>
    {
        return await this.repository.delete(id);
    }

    async list(payload: ICriteria): Promise<IPaginator>
    {
        return await this.repository.list(payload);
    }
}

export default <%= domainName %>Service;
