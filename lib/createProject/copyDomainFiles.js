import copyTemplate from '../utils/cp.js';
import path from "path";

// TODO: Add dynamic copy templates with glob
const copyDomainFiles = async(vars, rootPath) =>
{
   const projectPath = `${vars.projectName}/src`;

   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/src/Auth'), projectPath);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/src/Config'), projectPath);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/src/File'), projectPath);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/src/Item'), projectPath);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/src/Notification'), projectPath);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/src/Role'), projectPath);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/src/Shared'), projectPath);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/src/User'), projectPath);
};

export default copyDomainFiles;
