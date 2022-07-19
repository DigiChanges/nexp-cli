import path from 'path';
import HandlebarsCopy from './hbcopy.js';

const copyTemplate = async(vars, fromDest = 'templates', toDest = 'dist', copyFolder = true) =>
{
  const inDir = path.join(process.cwd(), fromDest);
  const outDir = path.join(process.cwd(), toDest);
  await HandlebarsCopy(inDir, outDir, vars, copyFolder);
};

export default copyTemplate;
