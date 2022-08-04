import copyTemplate from '../utils/cp.js';
import path from 'path';

const copyIndexFiles = async(vars, rootPath) =>
{
   const projectPath = `${vars.projectName}/src`;

   await copyTemplate(vars, path.join(rootPath, 'templates/indexFiles'), projectPath, false);
   await copyTemplate(vars, path.join(rootPath, '/templates/node-experience/src/command.ts'), projectPath);
   await copyTemplate(vars, path.join(rootPath, '/templates/node-experience/src/crons.ts'), projectPath);
   await copyTemplate(vars, path.join(rootPath, '/templates/node-experience/src/exceptions.ts'), projectPath);
   await copyTemplate(vars, path.join(rootPath, '/templates/node-experience/src/index.ts'), projectPath);
   await copyTemplate(vars, path.join(rootPath, '/templates/node-experience/src/initCommand.ts'), projectPath);
   await copyTemplate(vars, path.join(rootPath, '/templates/node-experience/src/seed.ts'), projectPath);
   await copyTemplate(vars, path.join(rootPath, '/templates/node-experience/src/inversify.config.ts'), projectPath);
};

export default copyIndexFiles;
