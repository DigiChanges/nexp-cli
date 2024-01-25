import MainConfig from '../../../Config/MainConfig';
import ICreateConnection from '../Database/ICreateConnection';
{{#ifEquals orm "Mongoose" }}
import CreateMongooseConnection from '../Database/CreateMongooseConnection';
type DbValueProp = typeof CreateMongooseConnection;
{{/ifEquals}}
{{#ifEquals orm "MikroORM" }}
import CreateMikroORMConnection from '../Database/CreateMikroORMConnection';
type DbValueProp = typeof CreateMikroORMConnection;
{{/ifEquals}}

class DatabaseFactory
{
	#config = MainConfig.getInstance().getConfig().dbConfig;

	create(_db?: string): ICreateConnection
	{
		const dbDefault = this.#config.default;
		const db = _db ?? dbDefault;

		const strategy = new Map<string, DbValueProp>();

		{{#ifEquals orm "Mongoose" }}
		strategy.set('Mongoose', CreateMongooseConnection);
		{{/ifEquals}}
		{{#ifEquals orm "MikroORM" }}
		strategy.set('MikroORM', CreateMikroORMConnection);
		{{/ifEquals}}
		return new (strategy.get(db))(this.#config[db]);
	}
}

export default DatabaseFactory;
