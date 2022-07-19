import cleanOrm from './cleanOrm.js';

const index = async(vars) =>
{
    const rootPath = 'dist';
    const domains = [
        {
          name: 'App',
          fileInfra: 'Base'
        },
        {
          name: 'Auth',
          fileInfra: 'Token'
        },
        {
          name: 'File',
          fileInfra: 'File'
        },
        {
          name: 'Item',
          fileInfra: 'Item'
        },
        {
          name: 'Notification',
          fileInfra: 'Notification'
        },
        {
          name: 'Role',
          fileInfra: 'Role'
        },
        {
          name: 'User',
          fileInfra: 'User'
        }
    ];
    const ormMapper = [
      {
         ormName: 'Mongoose',
         schemaName: 'Mongoose',
         repositoryName: 'Mongo'
      },
      {
         ormName: 'MikroORM',
         schemaName: 'MikroORM',
         repositoryName: 'MikroSql'
      },
      {
         ormName: 'TypeORM',
         schemaName: 'TypeORM',
         repositoryName: 'Sql'
      }
    ];

    await cleanOrm(vars, rootPath, domains, ormMapper);
};

export default index;
