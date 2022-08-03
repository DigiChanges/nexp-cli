import copyTemplate from './cp.js';

const copyIndexFiles = async(vars) =>
{
   const projectPath = `${vars.projectName}/src`;

   await copyTemplate(vars, 'templates/indexFiles', projectPath, false);
   await copyTemplate(vars, 'templates/node-experience/src/command.ts', projectPath);
   await copyTemplate(vars, 'templates/node-experience/src/crons.ts', projectPath);
   await copyTemplate(vars, 'templates/node-experience/src/exceptions.ts', projectPath);
   await copyTemplate(vars, 'templates/node-experience/src/index.ts', projectPath);
   await copyTemplate(vars, 'templates/node-experience/src/initCommand.ts', projectPath);
   await copyTemplate(vars, 'templates/node-experience/src/seed.ts', projectPath);
   await copyTemplate(vars, 'templates/node-experience/src/inversify.config.ts', projectPath);
};

export default copyIndexFiles;
