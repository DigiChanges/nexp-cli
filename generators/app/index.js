"use strict";
const _ = require("lodash");
const Generator = require("yeoman-generator");
_.extend(Generator.prototype, require('yeoman-generator/lib/actions/install'));
const chalk = require("chalk");
const yosay = require("yosay");
const packagejson = require("./src/packagejson");
const root = require("./src/root");
const indexFiles = require("./src/indexFiles");
const gitignore = require("./src/gitignore");
const app = require("./src/domains/app");
const auth = require("./src/domains/auth");
const config = require("./src/domains/config");
const file = require("./src/domains/file");
const notification = require("./src/domains/notification");
const role = require("./src/domains/role");
const shared = require("./src/domains/shared");
const user = require("./src/domains/user");
const fs = require("fs");

module.exports = class extends Generator {
  async prompting() {
    this.log(yosay(`Welcome to the ${chalk.red("nexp-cli")} generator!`));

    const ormLists = ["Mongoose", "TypeORM", "MikroORM"];
    const parsedOrms = ormLists.map(orm => ({name: orm, value: orm}));

    const httpFrameworksList = ["Koa", "Express"];
    const parsedhttpFrameworks = httpFrameworksList.map(framework => ({name: framework, value: framework}));

    this.props = await this.prompt([
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
        choices: parsedOrms,
        default: "Mongoose"
      },
      {
        type: "list",
        name: "http",
        message: "Choose an HTTP Library.",
        choices: parsedhttpFrameworks,
        default: "Koa"
      }
    ])
  }

  writing() {
    if(!fs.existsSync(this.props.projectName))
    {
      this.destinationRoot(this.props.projectName);
      this.spawnCommandSync('git', ['init']);
      root(this);
      packagejson(this);
      indexFiles(this);
      gitignore(this);
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
      this.log(`${chalk.red(this.props.projectName)} project is already created`);
    }
  }
};
