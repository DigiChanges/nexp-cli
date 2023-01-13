import { readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'path';

const readPackageJson = async(vars, rootPath) =>
{
    const path = join(rootPath, 'templates/node-experience/package.json');
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
    if (vars.orm !== 'TypeORM')
    {
        delete packageJson.devDependencies['@types/pg'];
        delete packageJson.dependencies['pg-promise'];
        delete packageJson.dependencies['typeorm'];
    }
    if (vars.orm === 'Mongoose')
    {
        delete packageJson.dependencies['pg'];
        delete packageJson.dependencies['pg-promise'];
        delete packageJson.devDependencies['@types/pg'];
        delete packageJson.devDependencies['pg-mem'];
    }
    if (vars.http !== 'Koa')
    {
        const dep = [
          '@koa/multer',
          'koa',
          'koa-bodyparser',
          'koa-cors',
          'koa-hbs',
          'koa-helmet',
          'koa-qs',
          'koa-ratelimit',
          'koa-router'
        ];

        const devDep = [
          '@types/koa',
          '@types/koa-bodyparser',
          '@types/koa-cors',
          '@types/koa-hbs',
          '@types/koa-ratelimit',
          '@types/koa-router',
          '@types/koa__multer'
        ];

        dep.forEach((index) =>
{
           delete packageJson.dependencies[index];
        });

        devDep.forEach((index) =>
{
           delete packageJson.devDependencies[index];
        });
    }
    if (vars.http !== 'Express')
    {
        delete packageJson.dependencies['express'];
        delete packageJson.dependencies['express-rate-limit'];
        delete packageJson.dependencies['inversify-express-utils'];
        delete packageJson.dependencies['compression'];
        delete packageJson.devDependencies['@types/express'];
        delete packageJson.devDependencies['@types/express-rate-limit'];
        delete packageJson.devDependencies['@types/compression'];
    }

    // TODO: Order key in dependencies and devDependencies
	  const rootDestinyPath = join(resolve(), vars.projectName);

    packageJson.name = vars.projectName;
    await writeFile(`${rootDestinyPath}/package.json`, JSON.stringify(packageJson, null, 4));
};

export default createPackageJson;
