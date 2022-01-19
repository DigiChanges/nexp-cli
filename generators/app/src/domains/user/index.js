
module.exports = function (data)
{
  const props = data.props;

  data.fs.copyTpl(data.templatePath("domains/User"), data.destinationPath("src/User"), props);

  if (props.orm !== "TypeORM")
  {
    data.deleteDestination(data.destinationPath("src/User/Infrastructure/Repositories/UserSqlRepository.ts"))
    data.deleteDestination(data.destinationPath("src/User/Infrastructure/Schemas/UserTypeORM.ts"))
  }
  if (props.orm !== "Mongoose")
  {
    data.deleteDestination(data.destinationPath("src/User/Infrastructure/Repositories/UserMongoRepository.ts"))
    data.deleteDestination(data.destinationPath("src/User/Infrastructure/Schemas/UserMongoose.ts"))
  }
  if (props.orm !== "MikroORM")
  {
    data.deleteDestination(data.destinationPath("src/User/Infrastructure/Repositories/UserMikroSqlRepository.ts"))
    data.deleteDestination(data.destinationPath("src/User/Infrastructure/Schemas/UserMikroORM.ts"))
  }

  if (props.http !== "Express")
  {
    data.deleteDestination(data.destinationPath("src/User/Presentation/Handlers/Express"))
  }
  if(props.http !== "Koa")
  {
    data.deleteDestination(data.destinationPath("src/User/Presentation/Handlers/Koa"))
  }
}
