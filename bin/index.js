#!/usr/bin/env node

import { Command } from 'commander';
import createProject from './createProject.js';

const program = new Command();

program
  .name('nexp-cli')
  .description('NEXP CLI to create boilerplate projects and add new domains.');

program.command('create')
  .description('Create new NExp project.')
  .action(async() =>
  {
    await createProject();
  });

program.parse(process.argv);
