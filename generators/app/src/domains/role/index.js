
module.exports = function (data)
{
  const props = data.props;

  data.fs.copyTpl(data.templatePath("domains/Role"), data.destinationPath("src/Role"), props);

  if (props.orm !== "TypeORM")
  {
    data.deleteDestination(data.destinationPath("src/Role/Infrastructure/Repositories/RoleSqlRepository.ts"))
    data.deleteDestination(data.destinationPath("src/Role/Infrastructure/Schemas/RoleTypeORM.ts"))
  }
  if (props.orm !== "Mongoose")
  {
    data.deleteDestination(data.destinationPath("src/Role/Infrastructure/Repositories/RoleMongoRepository.ts"))
    data.deleteDestination(data.destinationPath("src/Role/Infrastructure/Schemas/RoleMongoose.ts"))
    data.deleteDestination(data.destinationPath("src/Role/Infrastructure/Schemas/IRoleDocument.ts"))
  }
  if (props.orm !== "MikroORM")
  {
    data.deleteDestination(data.destinationPath("src/Role/Infrastructure/Repositories/RoleMikroSqlRepository.ts"))
    data.deleteDestination(data.destinationPath("src/Role/Infrastructure/Schemas/RoleMikroORM.ts"))
  }

  if (props.http !== "Express")
  {
    data.deleteDestination(data.destinationPath("src/Role/Presentation/Handlers/Express"))
  }
  if(props.http !== "Koa")
  {
    data.deleteDestination(data.destinationPath("src/Role/Presentation/Handlers/Koa"))
  }
}
