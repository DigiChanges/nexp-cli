import { join, resolve } from 'path';
import { rm } from 'node:fs/promises';
import pkg from 'lodash';
import { writeFile } from 'fs/promises';
const { last } = pkg;
import g from 'glob';
import { promisify } from 'util';

const cleanFilesInfo = async(vars, httpMapper) =>
{
    const mapperFilter = httpMapper.filter(item => vars.orm === item);
    const ormChoosen = last(mapperFilter);
	  const rootDestinyPath = join(resolve(), vars.projectName);

    const ormFactoryFile = `import MainConfig from '../../Config/MainConfig';
import ${ormChoosen}CreateConnection from '../Infrastructure/Database/Create${ormChoosen}Connection';
import ICreateConnection from '../Infrastructure/Database/ICreateConnection';

class DatabaseFactory
{
    private dbDefault: string;

    constructor(dbDefault?: string)
    {
        this.dbDefault = dbDefault;
    }

    create(): ICreateConnection
    {
        const mainConfig = MainConfig.getInstance();

        if (!this.dbDefault)
        {
            this.dbDefault = mainConfig.getConfig().dbConfig.default;
        }

        const dbConfig: any = mainConfig.getConfig().dbConfig;
        const config = dbConfig[this.dbDefault];

        const createConnections: Record<string, any> = {
            ${ormChoosen}: ${ormChoosen}CreateConnection
        };

        return new createConnections[this.dbDefault](config);
    }
}

export default DatabaseFactory;

    `;

    await writeFile(`${rootDestinyPath}/src/Shared/Factories/DatabaseFactory.ts`, ormFactoryFile, { flag: 'w' });
};

const cleanOrm = async(vars, ormMapper) =>
{
    const glob = promisify(g);
    const mapperFilter = ormMapper.filter(item => vars.orm !== item);
	  const rootDestinyPath = join(resolve(), vars.projectName);

    for (const orm of mapperFilter)
    {
        const ormFiles = await glob(`${rootDestinyPath}/src/**/*${orm}*.ts`);

        for (const file of ormFiles)
        {
            await rm(file, { force: true });
        }
    }

    await cleanFilesInfo(vars, ormMapper);
};

export default cleanOrm;
