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
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import copyTemplatesFiles from '../lib/createProject/copyTemplateFolder.js';

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

					const tmpDirName = ".tmp"
					const tmpDir = join(process.cwd(),tmpDirName)
				  const cli_templates_dir = resolve(dirname(fileURLToPath(import.meta.url)), '../templates');

          console.log(answers);
          const tasks = new Listr([
              {
                  title: 'Clone Node Experience',
                  task: async() =>
                  {
											const exists = await fs.pathExists(tmpDir);
											if(!exists)
											{
												await fs.mkdirs(tmpDirName)
											}

											const success = await fs.pathExists(tmpDir + '/node-experience');

											if (!success)
											{
													const options = {
														 baseDir: tmpDir,
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
							  title: 'Copy templates',
							  task: () =>
							  {
							  	copyTemplatesFiles(cli_templates_dir, tmpDir);
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
                      await copyDomainFiles(answers, tmpDir);
                  }
              },
              {
                  title: 'Clean Domain Files',
                  task: async() =>
                  {
                      await cleanDomains(answers, tmpDir);
                  }
              },
							{
									title: 'Copy Index Files',
									task: async() =>
									{
											await copyIndexFiles(answers, tmpDir);
									}
							},
							{
									title: 'Copy Root Files',
									task: async() =>
									{
											await copyRootFiles(answers, tmpDir);
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
                      await createPackageJson(answers, tmpDir);
                  }
              },
							{
								title: 'Clean init setup',
								task: async() =>
								{
									await fs.remove(tmpDir)
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
