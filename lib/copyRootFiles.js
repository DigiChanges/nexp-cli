import copyTemplate from './cp.js';

const copyRootFiles = async(vars) =>
{
   await copyTemplate(vars, 'templates/node-experience/.circleci', 'dist');
   await copyTemplate(vars, 'templates/node-experience/.husky', 'dist');
   await copyTemplate(vars, 'templates/node-experience/config', 'dist');
   await copyTemplate(vars, 'templates/node-experience/docker', 'dist');
   await copyTemplate(vars, 'templates/node-experience/docs', 'dist');
   await copyTemplate(vars, 'templates/node-experience/infrastructure', 'dist');
   await copyTemplate(vars, 'templates/node-experience/tools', 'dist');
   await copyTemplate(vars, 'templates/node-experience/.commitlintrc.json', 'dist');
   await copyTemplate(vars, 'templates/node-experience/.dockerignore', 'dist');
   await copyTemplate(vars, 'templates/node-experience/.env.dev', 'dist');
   await copyTemplate(vars, 'templates/node-experience/.env.prod', 'dist');
   await copyTemplate(vars, 'templates/node-experience/.eslintrc.json', 'dist');
   await copyTemplate(vars, 'templates/node-experience/.gitignore', 'dist');
   await copyTemplate(vars, 'templates/node-experience/.huskyrc', 'dist');
   await copyTemplate(vars, 'templates/node-experience/.prettierignore', 'dist');
   await copyTemplate(vars, 'templates/node-experience/.prettierrc', 'dist');
   await copyTemplate(vars, 'templates/node-experience/build.js', 'dist');
   await copyTemplate(vars, 'templates/node-experience/debug.build.sh', 'dist');
   await copyTemplate(vars, 'templates/node-experience/dev.build.sh', 'dist');
   await copyTemplate(vars, 'templates/node-experience/dev.init.sh', 'dist');
   await copyTemplate(vars, 'templates/node-experience/docker-compose.debug.yml', 'dist');
   await copyTemplate(vars, 'templates/node-experience/docker-compose.sql.yml', 'dist');
   await copyTemplate(vars, 'templates/node-experience/Dockerfile', 'dist');
   await copyTemplate(vars, 'templates/node-experience/ecosystem.config.js', 'dist');
   await copyTemplate(vars, 'templates/node-experience/etsc.config.js', 'dist');
   await copyTemplate(vars, 'templates/node-experience/jest.config.js', 'dist');
   await copyTemplate(vars, 'templates/node-experience/jest-mongodb-config.js', 'dist');
   await copyTemplate(vars, 'templates/node-experience/LICENSE', 'dist');
   await copyTemplate(vars, 'templates/node-experience/lint-staged.config.js', 'dist');
   await copyTemplate(vars, 'templates/node-experience/Makefile', 'dist');
   await copyTemplate(vars, 'templates/node-experience/nodemon.json', 'dist');
   await copyTemplate(vars, 'templates/node-experience/prod.build.sh', 'dist');
   await copyTemplate(vars, 'templates/node-experience/README.md', 'dist');
   await copyTemplate(vars, 'templates/node-experience/tsconfig.json', 'dist');
};

export default copyRootFiles;
