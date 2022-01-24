"use strict";
const _ = require("lodash");
const Generator = require("yeoman-generator");
_.extend(Generator.prototype, require('yeoman-generator/lib/actions/install'));
const chalk = require("chalk");
const yosay = require("yosay");
const packagejson = require("./src/packagejson");
const root = require("./src/root");
const indexFiles = require("./src/indexFiles");
const app = require("./src/domains/app");
const auth = require("./src/domains/auth");
const config = require("./src/domains/config");
const file = require("./src/domains/file");
const notification = require("./src/domains/notification");
const role = require("./src/domains/role");
const shared = require("./src/domains/shared");
const user = require("./src/domains/user");
const domain = require("./src/domain/Domain");
const fs = require("fs");
const {formatName, pascalCase} = require('../../Helpers');

module.exports = class extends Generator {

  constructor(args, opts) {
    super(args, opts);
    // This makes `createApp` a required argument.
    this.argument("command", { type: String, description: `commands ${chalk.green('createApp | app')} | ${chalk.green('createDomain | dom')}`, default: "createApp"});
  }

  async prompting() {

    const prompts = [];

    this.log(yosay(`Welcome to the ${chalk.red("nexp-cli")} generator!`));

    if(this.options.command === 'createApp' || this.options.command === 'app')
    {
      prompts.push(
        {
          type: "input",
          name: "projectName",
          message: "Project Name",
          default: "my-project-name"
        },
        {
          type: "confirm",
          name: "fileDomain",
          message: "Would you like to install File Domain?",
          default: true
        },
        {
          type: "list",
          name: "orm",
          message: "Choose an ORM.",
          choices: [
            {
              name: "Mongoose",
              value: "Mongoose"
            },
            {
              name: "TypeORM",
              value: "TypeORM"
            },
            {
              name: "MikroORM",
              value: "MikroORM"
            }
          ],
          default: "Mongoose"
        },
        {
          type: "list",
          name: "http",
          message: "Choose an HTTP Library.",
          choices: [
            {
              name: "Koa",
              value: "Koa"
            },
            {
              name: "Express",
              value: "Express"
            }
          ],
          default: "Koa"
        }
      );

      return this.prompt(prompts).then(props => {
        console.log(props);
        this.props = props;
      });
    }
    else if(this.options.command === 'createDomain' || this.options.command === 'dom')
    {
      await this.prompt([{
        type: "input",
        name: "domainName",
        message: "what's the domain name?",
      }]).then(props => {
        props.domainName = formatName(props.domainName)
        this.props = props
      });

      await this.prompt([{
        type: "input",
        name: "pluralName",
        message: "what's the plural name?",
        default: () => formatName(this.props.domainName,true),
      }]).then(props => {
        this.props = Object.assign(this.props,props);
      });

      return this.prompt([{
        type: "input",
        name: "tableOrDocumentName",
        message: "what's the table or document name?",
        default: () => _.snakeCase(this.props.pluralName),
      }]).then(props => {
        this.props = Object.assign(this.props,props);
        console.log(this.props)
        this.props = {
          ...this.props,
          domainNameCamel: _.camelCase(this.props.domainName),
          domainNamePlural: pascalCase(this.props.pluralName),
        };
      });
    } else
    {
      throw new Error(`${chalk.red(this.options.command)} is not a valid command`)
    }
  }

  writing() {
    if(this.options.command === 'createApp' || this.options.command === 'app')
    {
      if(!fs.existsSync(this.props.projectName))
      {
        this.destinationRoot(this.props.projectName);
        this.spawnCommandSync('git', ['init']);
        root(this);
        packagejson(this);
        indexFiles(this);
        app(this);
        auth(this);
        config(this);
        file(this);
        notification(this);
        role(this);
        shared(this);
        user(this);
      }
      else
      {
        throw new Error(`${chalk.red(this.props.projectName)} project is already created`);
      }
    } else  if(this.options.command === 'createDomain' || this.options.command === 'dom')
    {
        domain(this);
    }
  }
};
