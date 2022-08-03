import copyTemplate from '../utils/cp.js';

const copyRootFiles = async(vars) =>
{
   await copyTemplate(vars, 'templates/node-experience/.circleci', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/.husky', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/config', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/docker', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/docs', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/infrastructure', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/tools', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/.commitlintrc.json', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/.dockerignore', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/.env.dev', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/.eslintrc.json', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/.gitignore', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/.huskyrc', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/.prettierignore', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/.prettierrc', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/build.js', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/debug.build.sh', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/dev.build.sh', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/dev.init.sh', vars.projectName);
   await copyTemplate(vars, 'templates/rootFiles/docker-compose.yml', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/Dockerfile', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/ecosystem.config.js', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/etsc.config.js', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/jest.config.js', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/jest-mongodb-config.js', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/LICENSE', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/lint-staged.config.js', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/Makefile', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/nodemon.json', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/prod.build.sh', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/README.md', vars.projectName);
   await copyTemplate(vars, 'templates/node-experience/tsconfig.json', vars.projectName);
};

export default copyRootFiles;
