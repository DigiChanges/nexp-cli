import { mkdir, writeFile } from 'fs/promises';

const createFolders = async(vars) =>
{
    await mkdir(`${vars.projectName}/src`, { recursive: true });

    // Create hide folder with answers
    await mkdir(`${vars.projectName}/.nexp`, { recursive: true });
    await writeFile(`${vars.projectName}/.nexp/config.json`, JSON.stringify(vars, null, 4), { flag: 'w+' });
};

export default createFolders;
