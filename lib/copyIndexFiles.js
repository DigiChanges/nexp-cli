import copyTemplate from './cp.js';

const copyIndexFiles = async(vars) =>
{
   await copyTemplate(vars, 'templates/indexFiles', 'dist/src', false);
   await copyTemplate(vars, 'templates/node-experience/src/command.ts', 'dist/src');
   await copyTemplate(vars, 'templates/node-experience/src/crons.ts', 'dist/src');
   await copyTemplate(vars, 'templates/node-experience/src/exceptions.ts', 'dist/src');
   await copyTemplate(vars, 'templates/node-experience/src/initCommand.ts', 'dist/src');
   await copyTemplate(vars, 'templates/node-experience/src/seed.ts', 'dist/src');
   await copyTemplate(vars, 'templates/node-experience/src/serviceIdentifier.ts', 'dist/src');
};

export default copyIndexFiles;
