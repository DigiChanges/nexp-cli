import HandlebarsCopy from './hbcopy.js';

const copyTemplate = async(vars, fromDest, toDest = 'dist', copyFolder = true) =>
{
  await HandlebarsCopy(fromDest, toDest, vars, copyFolder);
};

export default copyTemplate;
