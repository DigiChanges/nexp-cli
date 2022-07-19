import copyTemplate from './cp.js';

const copyDomainFiles = async(vars) =>
{
   await copyTemplate(vars, 'templates/node-experience/src/App', 'dist/src');
   await copyTemplate(vars, 'templates/node-experience/src/Auth', 'dist/src');
   await copyTemplate(vars, 'templates/node-experience/src/Config', 'dist/src');

   if (vars.fileDomain)
   {
      await copyTemplate(vars, 'templates/node-experience/src/File', 'dist/src');
   }

   await copyTemplate(vars, 'templates/node-experience/src/Item', 'dist/src');
   await copyTemplate(vars, 'templates/node-experience/src/Notification', 'dist/src');
   await copyTemplate(vars, 'templates/node-experience/src/Role', 'dist/src');
   await copyTemplate(vars, 'templates/node-experience/src/Shared', 'dist/src');
   await copyTemplate(vars, 'templates/node-experience/src/User', 'dist/src');
};

export default copyDomainFiles;
