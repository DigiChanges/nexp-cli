import { resolve } from 'path';
import { rm } from 'node:fs/promises';

const cleanOrm = async(vars, rootPath, domains, ormMapper) =>
{
    const mapperFilter = ormMapper.filter(item => vars.orm !== item.ormName);

    for (const element of mapperFilter)
    {
        for (const domain of domains)
        {
            const domainRepository = resolve(`${rootPath}/src/${domain.name}/Infrastructure/Repositories/${domain.fileInfra}${element.repositoryName}Repository.ts`);
            const domainSchema = resolve(`${rootPath}/src/${domain.name}/Infrastructure/Schemas/${domain.fileInfra}${element.schemaName}.ts`);

            await rm(domainRepository, { force: true });
            await rm(domainSchema, { force: true });
        }
    }
};

export default cleanOrm;
