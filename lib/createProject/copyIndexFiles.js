import copyTemplate from '../utils/cp.js';
import path from 'path';

const copyIndexFiles = async(vars, rootPath) =>
{
	 const rootDestinyPath = path.join(path.resolve(), `${vars.projectName}/src`);

   await copyTemplate(vars, path.join(rootPath, 'templates/indexFiles'), rootDestinyPath, false);
   await copyTemplate(vars, path.join(rootPath, '/templates/node-experience/src/command.ts'), rootDestinyPath);
   await copyTemplate(vars, path.join(rootPath, '/templates/node-experience/src/crons.ts'), rootDestinyPath);
   await copyTemplate(vars, path.join(rootPath, '/templates/node-experience/src/exceptions.ts'), rootDestinyPath);
   await copyTemplate(vars, path.join(rootPath, '/templates/node-experience/src/index.ts'), rootDestinyPath);
   await copyTemplate(vars, path.join(rootPath, '/templates/node-experience/src/initCommand.ts'), rootDestinyPath);
   await copyTemplate(vars, path.join(rootPath, '/templates/node-experience/src/seed.ts'), rootDestinyPath);
   await copyTemplate(vars, path.join(rootPath, '/templates/node-experience/src/inversify.config.ts'), rootDestinyPath);
};

export default copyIndexFiles;