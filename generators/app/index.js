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

module.exports = class extends Generator {
  prompting() {
    this.log(yosay(`Welcome to the ${chalk.red("nexp-cli")} generator!`));

    const prompts = [
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
    ];

    return this.prompt(prompts).then(props => {
      console.log(props);
      this.props = props;
    });
  }

  writing() {
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
};
