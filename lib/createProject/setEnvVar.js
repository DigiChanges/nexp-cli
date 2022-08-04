import { join, resolve } from 'path';
import replace from 'replace-in-file';

const myReplace = async(from, to, rootPath) =>
{
		const options = {
			files: `${rootPath}/.env.dev`,
			from,
			to,
			glob: {	dot: true }
		};

		await replace(options);
};


const setEvnVar = async(vars) =>
{
		const rootDestinyPath = join(resolve(), vars.projectName);
		const port = vars.orm === 'Mongoose' ? '27017' : '5432';

		await myReplace('APP_DEFAULT=AppKoa', `APP_DEFAULT=App${vars.http}`, rootDestinyPath);
		await myReplace('DB_USER=experience', `DB_USER=${vars.projectName}`, rootDestinyPath);
		await myReplace('DB_DATABASE=experience', `DB_DATABASE=db_${vars.projectName}`, rootDestinyPath);
		await myReplace('DB_PASSWORD=experience', `DB_PASSWORD=${vars.projectName}123`, rootDestinyPath);
		await myReplace('DB_PORT=27017', `DB_PORT=${port}`, rootDestinyPath);
		await myReplace('DB_ORM_DEFAULT=Mongoose', `DB_ORM_DEFAULT=${vars.orm}`, rootDestinyPath);
		await myReplace('PRODUCT_NAME=nodeexperience', `PRODUCT_NAME=${vars.projectName}`, rootDestinyPath);
};

export default setEvnVar;
