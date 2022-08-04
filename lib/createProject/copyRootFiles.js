import copyTemplate from '../utils/cp.js';
import path from "path";

const copyRootFiles = async(vars, rootPath) =>
{
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/.circleci'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/.husky'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/config'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/docker'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/docs'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/infrastructure'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/tools'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/.commitlintrc.json'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/.env.dev'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/.eslintrc.json'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/.gitignore'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/.huskyrc'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/.prettierignore'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/.prettierrc'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/build.js'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/debug.build.sh'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/dev.build.sh'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/dev.init.sh'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/rootFiles/docker-compose.yml'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/Dockerfile'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/ecosystem.config.js'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/etsc.config.js'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/jest.config.js'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/jest-mongodb-config.js'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/LICENSE'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/lint-staged.config.js'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/Makefile'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/nodemon.json'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/prod.build.sh'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/README.md'), vars.projectName);
   await copyTemplate(vars, path.join(rootPath, 'templates/node-experience/tsconfig.json'), vars.projectName);
};

export default copyRootFiles;
