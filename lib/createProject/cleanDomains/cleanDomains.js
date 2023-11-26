import cleanOrm from './cleanOrm.js';
import readInfoJsonNexp from '../readInfoJsonNexp.js';

const cleanDomains = async(vars, rootPath) =>
{
    const { orm } = await readInfoJsonNexp(rootPath);

    await cleanOrm(vars, orm);
};

export default cleanDomains;
