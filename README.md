<h1 align="center">
    NExp-CLI
</h1>

_This CLI is made to be able to quickly create the [NExp](https://github.com/DigiChanges/node-experience) boilerplate with all the content you want it to have.
It allows you to choose between Mongoose and MikroORM when it comes to database persistence.
This tool allows you to use NExp without the need to modify the code._

<h4 align="center">
  <a href="https://github.com/DigiChanges/nexp-cli/blob/master/.github/workflows/release.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/DigiChanges/nexp-cli/release.yml?branch=master&label=pipeline&style=flat-square" alt="continuous integration" style="height: 20px;">
  </a>
  <a href="https://github.com/DigiChanges/nexp-cli/graphs/contributors">
    <img src="https://img.shields.io/github/contributors-anon/DigiChanges/nexp-cli?color=yellow&style=flat-square" alt="contributors" style="height: 20px;">
  </a>
  <a href="./LICENSE.txt">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square&label=license" alt="license" style="height: 20px;">
  </a>
  <a href="./LICENSE.txt">
    <img src="https://img.shields.io/npm/v/nexp-cli.svg?style=flat-square&label=npm" alt="license" style="height: 20px;">
  </a>
  <br>
</h4>

# Pre-requisites

Before you begin, ensure that you have the following installed on your machine:

Node.js: Make sure you have Node.js installed. You can download it from [Official Web](nodejs.org).

NPM (Node Package Manager): npm comes bundled with Node.js.

Docker : [Official Web](https://www.docker.com/)

Docker Compose :  [Compose V2](https://docs.docker.com/compose/install/)

PNPM : Make sure you have PNPM installed. [Official Web](https://pnpm.io/es/)

# Installation

First, install nexp-cli using [npm](https://www.npmjs.com/)

```bash
npm install -g nexp-cli
```


## Options

| Options |    |
|--- | --- |
| create | initiate project creation |


## Available ORM

NExp-cli provides support for two Object-Relational Mapping (ORM) frameworks:

| ORM | Database |
| --- | --- |
| Mongoose | MongoDB |
| MykroORM | Postgres |



## Usage


## Creating a New Project

Use the following command to initiate project creation.

```bash
nexp-cli create
```

After running the above command, follow these steps:


- Write the name of the project.
- Choose the ORM.
- And wait for each action to complete.

# Launching NExp :rocket:

## Environment file

Copy `.env.dev` to `.env`

## Install dependencies

To install dependencies, use `pnpm`.

```bash
pnpm install
```


## Starting containers with Docker

To run your application using Docker, follow these steps to start the containers:

- Execute `make dev` command or `STAGE=dev docker-compose up --build -d`


## NEXT

- Creation of entire domains

## Docs

### Postman Documentation

[API Documentation](https://documenter.getpostman.com/view/10426172/Tz5je15Z)

### Boilerplate Documentation

[Boilerplate Documentation](https://digichanges.github.io/node-experience)

MIT © [Nathan Russo]()

