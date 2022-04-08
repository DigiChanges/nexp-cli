import { MikroORM } from '@mikro-orm/core';
import Role from '../../../Role/Infrastructure/Schemas/RoleMikroORM';
import User from '../../../User/Infrastructure/Schemas/UserMikroORM';
import Item from '../../../Item/Infrastructure/Schemas/ItemMikroORM';
import File from '../../../File/Infrastructure/Schemas/FileMikroORM';
import MainConfig from '../../../Config/mainConfig';

void (async() =>
{
    const config = MainConfig.getInstance().getConfig().dbConfig.MikroORM;

    const orm = await MikroORM.init({
        entities: [Role, User, Item, File],
        dbName: config.dbName,
        type: config.type,
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password
    });

    const generator = orm.getSchemaGenerator();

    const dropDump = await generator.getDropSchemaSQL();
    console.log(dropDump);

    const createDump = await generator.getCreateSchemaSQL();
    console.log(createDump);

    const updateDump = await generator.getUpdateSchemaSQL();
    console.log(updateDump);

    // there is also `generate()` method that returns drop + create queries
    const dropAndCreateDump = await generator.generate();
    console.log(dropAndCreateDump);

    // or you can run those queries directly, but be sure to check them first!
    await generator.dropSchema();
    await generator.createSchema();
    await generator.updateSchema();

    await orm.close(true);
})();
