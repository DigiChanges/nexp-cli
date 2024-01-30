import { join, resolve } from 'path';
import { rm } from 'node:fs/promises';
import g from 'glob';
import { promisify } from 'util';
import {remove} from 'fs-extra'

const cleanOrm = async(vars, ormMapper) =>
{
		const DockerORMFolder = {
			Mongoose: "mongo",
			MikroORM: "postgres"
		}

    const glob = promisify(g);
    const mapperFilter = ormMapper.filter(item => vars.orm !== item);
	  const rootDestinyPath = join(resolve(), vars.projectName);

    for (const orm of mapperFilter)
    {
				remove(`${rootDestinyPath}/docker/${DockerORMFolder[orm]}`)

        const ormFiles = await glob(`${rootDestinyPath}/src/**/*${orm}*.ts`);

        for (const file of ormFiles)
        {
            await rm(file, { force: true });
        }
    }
};

export default cleanOrm;
