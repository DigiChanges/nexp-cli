import inquirer from 'inquirer';
import { Listr } from 'listr2';

import welcomeBox from './welcome.js';
import copyIndexFiles from '../lib/createProject/copyIndexFiles.js';
import createFolders from '../lib/createProject/createFolders.js';
import copyRootFiles from '../lib/createProject/copyRootFiles.js';
import cleanDomains from '../lib/createProject/cleanDomains/cleanDomains.js';
import copyDomainFiles from '../lib/createProject/copyDomainFiles.js';
import createPackageJson from '../lib/createProject/package.js';
import setEvnVar from '../lib/createProject/setEnvVar.js';
import simpleGit from 'simple-git';
import fs from 'fs-extra';

const createProject = async() =>
{
    console.log(welcomeBox);

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
          choices: ['Mongoose', 'MikroORM'],
          default: 'Mongoose'
        }
      ])
      .then((answers) =>
      {
          answers.projectName = answers.projectName.trim().replaceAll(' ', '_').replaceAll('-', '_');

          console.log(answers);
          const tasks = new Listr([
               {
                  title: 'Clone Node Experience',
                  task: async() =>
                  {
											const success = await fs.pathExists('node-experience');

											if (!success)
											{
													const options = {
														 baseDir: process.cwd(),
														 binary: 'git',
														 maxConcurrentProcesses: 6,
														 trimmed: false
													};

													const git = simpleGit(options);
													await git.clone('git@github.com:DigiChanges/node-experience.git');
											}
                  }
              },
							{
                  title: 'Initialization',
                  task: async() =>
                  {
                      await createFolders(answers, './');
                  }
              },
              {
                  title: 'Copy Domain Files',
                  task: async() =>
                  {
                      await copyDomainFiles(answers, './');
                  }
              },
              {
                  title: 'Clean Domain Files',
                  task: async() =>
                  {
                      await cleanDomains(answers, './');
                  }
              },
							{
									title: 'Copy Index Files',
									task: async() =>
									{
											await copyIndexFiles(answers, './');
									}
							},
							{
									title: 'Copy Root Files',
									task: async() =>
									{
											await copyRootFiles(answers, './');
									}
							},
							{
									title: 'Set .env file',
									task: async() =>
									{
											await setEvnVar(answers);
									}
							},
              {
                  title: 'Create Package JSON',
                  task: async() =>
                  {
                      await createPackageJson(answers, './');
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
