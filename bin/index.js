#!/usr/bin/env node

import { Command } from 'commander';
import { readFileSync } from 'fs';
import createProject from './createProject.js';

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));

const program = new Command();

program
  .version(packageJson.version)
  .name('nexp-cli')
  .description('NEXP CLI to create boilerplate projects and add new domains.');

program.command('create')
  .description('Create new NExp project.')
  .action(() =>
  {
    createProject();
  });

program.parse(process.argv);
