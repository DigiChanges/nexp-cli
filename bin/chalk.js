import { Chalk } from 'chalk';

const customChalk = new Chalk({
  level: 1
});

const sTitle = customChalk.italic.blueBright;
const sBody = customChalk.bold.blue;

export {
  sTitle,
  sBody
};
