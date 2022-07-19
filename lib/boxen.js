import boxen from 'boxen';
import { sTitle, sBody } from './chalk.js';

const welcomeBox = boxen(sBody(`

  NEXP CLI

`), {
  title: sTitle('Choose your destiny'),
  titleAlignment: 'center',
  textAlignment: 'center',
  padding: 1,
  borderColor: 'blue',
  borderStyle: 'doubleSingle'
});

export default welcomeBox;
