import { resolve } from 'path';
import replace from 'replace-in-file';

const myReplace = async(vars, from, to, rootPath) =>
{
		const options = {
			files: resolve(`${rootPath}/${vars.projectName}/.env.dev`),
			from,
			to,
			glob: {	dot: true }
		};

		await replace(options);
};


const setEvnVar = async(vars, rootPath) =>
{
		const port = vars.orm === 'Mongoose' ? '27017' : '5432';

		await myReplace(vars, 'APP_DEFAULT=AppKoa', `APP_DEFAULT=App${vars.orm}`, rootPath);
		await myReplace(vars, 'DB_USER=experience', `DB_USER=${vars.projectName}`, rootPath);
		await myReplace(vars, 'DB_DATABASE=experience', `DB_DATABASE=db_${vars.projectName}`, rootPath);
		await myReplace(vars, 'DB_PASSWORD=experience', `DB_PASSWORD=${vars.projectName}123`, rootPath);
		await myReplace(vars, 'DB_PORT=27017', `DB_PORT=${port}`, rootPath);
		await myReplace(vars, 'DB_ORM_DEFAULT=Mongoose', `DB_ORM_DEFAULT=${vars.orm}`, rootPath);
		await myReplace(vars, 'PRODUCT_NAME=nodeexperience', `PRODUCT_NAME=${vars.projectName}`, rootPath);
};

export default setEvnVar;
