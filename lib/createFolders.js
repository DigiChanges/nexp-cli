import { mkdir, writeFile } from 'fs/promises';

const createFolders = async(dir, vars) =>
{
    await mkdir(dir, { recursive: true });

    // Create hide folder with answers
    await mkdir('.nexp', { recursive: true });
    await writeFile('.nexp/config.json', JSON.stringify(vars, null, 4), { flag: 'w+' });
};

export default createFolders;
