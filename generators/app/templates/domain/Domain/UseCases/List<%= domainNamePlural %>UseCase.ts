import { ICriteria, IPaginator } from '@digichanges/shared-experience';
import <%= domainName %>Service from '../Services/<%= domainName %>Service';

class List<%= domainNamePlural %>UseCase
{
    private <%= domainNameCamel %>Service = new <%= domainName %>Service();

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        return await this.<%= domainNameCamel %>Service.list(payload);
    }
}

export default List<%= domainNamePlural %>UseCase;
