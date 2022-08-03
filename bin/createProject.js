import inquirer from 'inquirer';
import { Listr } from 'listr2';

import welcomeBox from '../lib/boxen.js';
import copyIndexFiles from '../lib/copyIndexFiles.js';
import createFolders from '../lib/createFolders.js';
import copyRootFiles from '../lib/copyRootFiles.js';
import cleanDomains from '../lib/cleanDomains/cleanDomains.js';
import copyDomainFiles from '../lib/copyDomainFiles.js';
import getChoices from '../lib/getChoices.js';
import createPackageJson from '../lib/package.js';

const createProject = async() =>
{
    console.log(welcomeBox);

    const { orms, https } = await getChoices();

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'Project Name',
          default: 'my-project-name'
        },
        {
          type: 'list',
          name: 'orm',
          message: 'Choose an ORM.',
          choices: orms,
          default: 'Mongoose'
        },
        {
          type: 'list',
          name: 'http',
          message: 'Choose an HTTP Library.',
          choices: https,
          default: 'Koa'
        }
      ])
      .then((answers) =>
      {
          answers.projectName = answers.projectName.trim().replaceAll(' ', '_').replaceAll('-', '_');

          console.log(answers);
          const tasks = new Listr([
              {
                  title: 'Create Directories',
                  task: async() =>
                  {
                      await createFolders(answers);
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
                      await cleanDomains(answers);
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
