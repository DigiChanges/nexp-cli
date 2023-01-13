import copyTemplate from '../utils/cp.js';
import { join, resolve } from 'path';

const copyRootFiles = async(vars, rootPath) =>
{
	 const rootDestinyPath = join(resolve(), vars.projectName);

	 await copyTemplate(vars, join(rootPath, 'templates/node-experience/.circleci'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/.husky'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/config'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/docker'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/docs'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/infrastructure'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/tools'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/.commitlintrc.json'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/.env.dev'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/.eslintrc.json'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/.huskyrc'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/.prettierignore'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/.prettierrc'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/build.js'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/dev.build.sh'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/dev.init.sh'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/rootFiles/docker-compose.yml'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/Dockerfile'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/ecosystem.config.js'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/etsc.config.js'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/jest.config.js'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/jest-mongodb-config.js'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/LICENSE'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/lint-staged.config.js'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/Makefile'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/nodemon.json'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/prod.build.sh'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/README.md'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, 'templates/node-experience/tsconfig.json'), rootDestinyPath);
};

export default copyRootFiles;
