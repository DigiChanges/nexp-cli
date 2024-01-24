import copyTemplate from '../utils/cp.js';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';

const copyIndexFiles = async(vars, rootPath) =>
{
	 const rootDestinyPath = join(resolve(), `${vars.projectName}/src`);

   await copyTemplate(vars, join(rootPath, '/node-experience/src/closed.ts'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/src/command.ts'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/src/crons.ts'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/src/index.ts'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/src/initCommand.ts'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/src/initTestServer.ts'), rootDestinyPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/src/seed.ts'), rootDestinyPath);
	 await copyTemplate(vars, join(rootPath, 'templates/indexFiles/Shared/DI/container.ts'), `${rootDestinyPath}/Shared/DI/`);
	 await copyTemplate(vars, join(rootPath, 'templates/indexFiles/Config/validateEnv.ts'), `${rootDestinyPath}/Config/`);
};

export default copyIndexFiles;
