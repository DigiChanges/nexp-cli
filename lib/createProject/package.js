import { readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'path';

const readPackageJson = async(vars, rootPath) =>
{
    const path = join(rootPath, '/node-experience/package.json');
    const packageJson = JSON.parse((await readFile(path)).toString());

    packageJson.name = vars.projectName;

    return packageJson;
};

const createPackageJson = async(vars, rootPath) =>
{
    const packageJson = await readPackageJson(vars, rootPath);

    if (vars.orm !== 'Mongoose')
    {
        delete packageJson.dependencies['mongoose'];
        delete packageJson.dependencies['mongodb'];
        delete packageJson.devDependencies['@types/mongodb'];
        delete packageJson.devDependencies['@types/mongoose'];
    }
    if (vars.orm !== 'MikroORM')
    {
        delete packageJson.dependencies['@mikro-orm/core'];
        delete packageJson.dependencies['@mikro-orm/postgresql'];
    }
    if (vars.orm === 'Mongoose')
    {
        delete packageJson.dependencies['pg'];
        delete packageJson.dependencies['pg-promise'];
        delete packageJson.devDependencies['@types/pg'];
        delete packageJson.devDependencies['pg-mem'];
    }

    // TODO: Order key in dependencies and devDependencies
	  const rootDestinyPath = join(resolve(), vars.projectName);

    packageJson.name = vars.projectName;
    await writeFile(`${rootDestinyPath}/package.json`, JSON.stringify(packageJson, null, 4));
};

export default createPackageJson;
