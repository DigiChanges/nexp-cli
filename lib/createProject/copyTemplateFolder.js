import { copy } from 'fs-extra/lib/copy/index.js';
const copyTemplatesFiles = async (from, dest) =>
{
	await copy(from,dest)
};

export default copyTemplatesFiles;
