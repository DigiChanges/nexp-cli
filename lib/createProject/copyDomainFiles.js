import copyTemplate from '../utils/cp.js';
import { join, resolve } from 'path';

// TODO: Add dynamic copy templates with glob
const copyDomainFiles = async(vars, rootPath) =>
{
	 const projectPath = join(resolve(), `${vars.projectName}/src`);

	 await copyTemplate(vars, join(rootPath, '/node-experience/src/Auth'), projectPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/src/Config'), projectPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/src/Item'), projectPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/src/Main'), projectPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/src/Notification'), projectPath);
   await copyTemplate(vars, join(rootPath, '/node-experience/src/Shared'), projectPath);
};

export default copyDomainFiles;
