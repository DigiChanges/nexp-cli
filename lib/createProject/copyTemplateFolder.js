import { execSync } from 'child_process';
const copyTemplatesFiles = (from, dest) =>
{
	execSync(`cp -r ${from} ${dest}`);
};

export default copyTemplatesFiles;
