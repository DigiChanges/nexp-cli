import copyTemplate from '../utils/cp.js';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

const copyRootFiles = async(vars, rootPath) =>
{
	 const rootDestinyPath = join(resolve(), vars.projectName);

   await copyTemplate(vars, join(rootPath, '/node-experience/.github'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/.husky'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/config'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/docker'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/infrastructure'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/tools'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/.commitlintrc.json'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/.dockerignore'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/.env.dev'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/.env.test'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/.eslintrc'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/.gitignore'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/.huskyrc'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/.npmrc'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/Dockerfile'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/jest.config.js'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/jest-mongodb-config.js'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/LICENSE'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/lint-staged.config.js'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/Makefile'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/nexp.svg'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/nodemon.json'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/pnpm-lock.yaml'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/README.md'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/rimraf_cpy.mjs'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/sonar-project.properties'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/tsconfig.json'), rootDestinyPath);
	 await copyTemplate(vars, join(rootPath, '/node-experience/.dependency-cruiser.js'), rootDestinyPath);
	 await copyTemplate(vars, join(rootPath, '/node-experience/artillery.yml'), rootDestinyPath);
	 await copyTemplate(vars, join(rootPath, 'templates/rootFiles/docker-compose.yml'), rootDestinyPath);
};

export default copyRootFiles;
