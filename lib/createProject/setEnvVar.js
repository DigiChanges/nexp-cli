import { resolve } from 'path';
import replace from 'replace-in-file';

const myReplace = async(vars, from, to) =>
{
		const options = {
			files: resolve(`${vars.projectName}/.env.dev`),
			from,
			to,
			glob: {	dot: true }
		};

		await replace(options);
};


const setEvnVar = async(vars) =>
{
		const port = vars.orm === 'Mongoose' ? '27017' : '5432';

		await myReplace(vars, 'APP_DEFAULT=AppKoa', `APP_DEFAULT=App${vars.orm}`);
		await myReplace(vars, 'DB_USER=experience', `DB_USER=${vars.projectName}`);
		await myReplace(vars, 'DB_DATABASE=experience', `DB_DATABASE=db_${vars.projectName}`);
		await myReplace(vars, 'DB_PASSWORD=experience', `DB_PASSWORD=${vars.projectName}123`);
		await myReplace(vars, 'DB_PORT=27017', `DB_PORT=${port}`);
		await myReplace(vars, 'DB_ORM_DEFAULT=Mongoose', `DB_ORM_DEFAULT=${vars.orm}`);
		await myReplace(vars, 'PRODUCT_NAME=nodeexperience', `PRODUCT_NAME=${vars.projectName}`);
};

export default setEvnVar;
