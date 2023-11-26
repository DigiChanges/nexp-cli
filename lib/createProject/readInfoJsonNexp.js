import { resolve } from 'path';
import { readFile } from 'fs/promises';

const readInfoJsonNexp = async(rootPath) =>
{
      const path = resolve(`${rootPath}/node-experience/config/info.json`);
      return JSON.parse((await readFile(path)).toString());
};

export default readInfoJsonNexp;
