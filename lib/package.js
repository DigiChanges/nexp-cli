import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'path';

const readPackageJson = async(vars) =>
{
    const path = resolve('templates/node-experience/package.json');
    const packageJson = JSON.parse((await readFile(path)).toString());

    packageJson.name = vars.name;

    return packageJson;
};

const createPackageJson = async(vars) =>
{
    const packageJson = readPackageJson(vars);

    if (vars.orm !== 'MikroORM')
    {
        delete packageJson.scripts['sync-db'];
        delete packageJson.dependencies['@mikro-orm/core'];
        delete packageJson.dependencies['@mikro-orm/postgresql'];
        delete packageJson.dependencies['pg-mem'];
    }
    if (vars.orm !== 'TypeORM')
    {
        delete packageJson.devDependencies['@types/pg'];
        delete packageJson.dependencies['pg-mem'];
        delete packageJson.dependencies['pg-promise'];
        delete packageJson.dependencies['typeorm'];
    }
    if (vars.orm !== 'Mongoose')
    {
        delete packageJson.dependencies['mongoose'];
        delete packageJson.devDependencies['@types/mongodb'];
        delete packageJson.devDependencies['@types/mongooseStrategy'];
    }
    if (vars.orm !== 'MikroORM' || vars.orm !== 'TypeORM')
    {
        delete packageJson.dependencies['pg'];
        delete packageJson.dependencies['pg-promise'];
        delete packageJson.devDependencies['@types/pg'];
    }
    if (vars.orm !== 'Koa')
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
    if (vars.orm !== 'Express')
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

    packageJson.name = vars.projectName;
    await writeFile('dist/package.json', JSON.stringify(packageJson, null, 4));
};

export default createPackageJson;
