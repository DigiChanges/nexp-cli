import cleanOrm from './cleanOrm.js';
import cleanHttp from './cleanHttp.js';
import readInfoJsonNexp from '../readInfoJsonNexp.js';

const cleanDomains = async(vars, rootPath) =>
{
    const { orm, http } = await readInfoJsonNexp(rootPath);

    await cleanOrm(vars, orm);
    await cleanHttp(vars, http);
};

export default cleanDomains;
