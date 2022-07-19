import welcomeBox from '../lib/boxen.js';
import createPackageJson from '../lib/package.js';

import inquirer from 'inquirer';
import { Listr } from 'listr2';
import copyIndexFiles from '../lib/copyIndexFiles.js';
import createFolders from '../lib/createFolders.js';
import copyRootFiles from '../lib/copyRootFiles.js';
import index from '../lib/cleanDomains/index.js';
import copyDomainFiles from '../lib/copyDomainFiles.js';

const createProject = () =>
{
    console.log(welcomeBox);
    const ormLists = ['Mongoose', 'TypeORM', 'MikroORM'];
    const choicesOrms = ormLists.map(orm => ({ name: orm, value: orm }));

    const httpFrameworksList = ['Koa', 'Express'];
    const choicesHttpFrameworks = httpFrameworksList.map(framework => ({ name: framework, value: framework }));

    inquirer
      .prompt([
        /* Pass your questions in here */
        {
          type: 'input',
          name: 'projectName',
          message: 'Project Name',
          default: 'my-project-name'
        },
        {
          type: 'confirm',
          name: 'fileDomain',
          message: 'Would you like to install File Domain?',
          default: true
        },
        {
          type: 'list',
          name: 'orm',
          message: 'Choose an ORM.',
          choices: choicesOrms,
          default: 'Mongoose'
        },
        {
          type: 'list',
          name: 'http',
          message: 'Choose an HTTP Library.',
          choices: choicesHttpFrameworks,
          default: 'Koa'
        }
      ])
      .then((answers) =>
      {
          answers.projectName = answers.projectName.trim().replaceAll(' ', '-');

          console.log(answers);
          const tasks = new Listr([
              {
                  title: 'Create Directories',
                  task: async() =>
                  {
                      await createFolders('dist/src', answers);
                  }
              },
              {
                  title: 'Copy Index Files',
                  task: async() =>
                  {
                      await copyIndexFiles(answers);
                  }
              },
              {
                  title: 'Copy Root Files',
                  task: async() =>
                  {
                      await copyRootFiles(answers);
                  }
              },
              {
                  title: 'Copy Domain Files',
                  task: async() =>
                  {
                      await copyDomainFiles(answers);
                  }
              },
              {
                  title: 'Clean Domain Files',
                  task: async() =>
                  {
                      await index(answers);
                  }
              },
              {
                  title: 'Create Package JSON',
                  task: async() =>
                  {
                      await createPackageJson(answers);
                  }
              }
          ]);

          tasks.run().catch(err =>
          {
            console.error(err);
          });
      })
      .catch((error) =>
      {
        if (error.isTtyError)
        {
          console.log('Prompt couldn\'t be rendered in the current environment');
        }
        else
        {
            console.log('Something else went wrong');
            throw error;
        }
      });
};

export default createProject;
