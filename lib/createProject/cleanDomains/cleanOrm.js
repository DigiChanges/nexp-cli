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
    const ormChosen = last(mapperFilter);
	  const rootDestinyPath = join(resolve(), vars.projectName);

    const ormFactoryFile = `import MainConfig from '../../../Config/MainConfig';
import Create${ormChosen}Connection from '../Database/Create${ormChosen}Connection';
import ICreateConnection from '../Database/ICreateConnection';

type DbValueProp = typeof Create${ormChosen}Connection;

class DatabaseFactory
{
    private readonly dbDefault: string;
    private config = MainConfig.getInstance().getConfig();

    constructor(dbDefault?: string)
    {
        this.dbDefault = dbDefault ?? this.config.dbConfig.default;
    }

    create(_db?: string): ICreateConnection
    {
        const db = _db ?? this.dbDefault;
        const { dbConfig } = this.config;
        const config = dbConfig[db];

        const strategy = new Map<string, DbValueProp>();
        strategy.set('${ormChosen}', Create${ormChosen}Connection);

        return new (strategy.get(db))(config);
    }
}

export default DatabaseFactory;

    `;

    await writeFile(`${rootDestinyPath}/src/Main/Infrastructure/Factories/DatabaseFactory.ts`, ormFactoryFile, { flag: 'w' });
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
