import { join, resolve } from 'path';
import { rm } from 'node:fs/promises';
import g from 'glob';
import { promisify } from 'util';

import pkg from 'lodash';
import { writeFile } from 'fs/promises';
const { last } = pkg;
import replace from 'replace-in-file';

const removeAllExtraFiles = async(vars, httpMapper) =>
{
    const mapperFilter = httpMapper.filter(item => vars.http !== item);
    const glob = promisify(g);
	  const rootDestinyPath = join(resolve(), vars.projectName);

    for (const http of mapperFilter)
    {
        const ormFiles = await glob(`${rootDestinyPath}/src/**/*${http}*.ts`);

        for (const file of ormFiles)
        {
            await rm(file, { force: true });
        }
    }
};

const cleanFilesInfo = async(vars, httpMapper) =>
{
    const mapperFilter = httpMapper.filter(item => vars.http === item);
    const httpChosen = last(mapperFilter);
	  const rootDestinyPath = join(resolve(), vars.projectName);

    const appFactoryFile = `import IApp from '../Application/Http/IApp';
import App${httpChosen} from '../Application/Http/App${httpChosen}';

class AppFactory
{
    static create(appName = 'App${httpChosen}'): IApp
    {
        const strategy: Record<string, any> = {
            [App${httpChosen}.name]: App${httpChosen}
        };

        return new strategy[appName]();
    }
}

export default AppFactory;

    `;

    await writeFile(`${rootDestinyPath}/src/Shared/Factories/AppFactory.ts`, appFactoryFile, { flag: 'w' });

		if (vars.orm !== 'MikroORM')
		{
	const options = {
		files: `${rootDestinyPath}/src/Shared/Application/Http/App${vars.http}.ts`,
		from: [`if (MainConfig.getInstance().getConfig().dbConfig.default === 'MikroORM')
        {
            this.app.use(ContextMikroORMKoaMiddleware);
        }

        `,
		    `import ContextMikroORM${vars.http}Middleware from '../../Presentation/Middlewares/ContextMikroORM${vars.http}Middleware';`
		],
		to: ''
	};

			await replace(options);
		}
};

const cleanHttp = async(vars, httpMapper) =>
{
    await removeAllExtraFiles(vars, httpMapper);
    await cleanFilesInfo(vars, httpMapper);
};

export default cleanHttp;
