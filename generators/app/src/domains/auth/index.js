
module.exports = function (data)
{
  const props = data.props;

  data.fs.copyTpl(data.templatePath("domains/Auth"), data.destinationPath("src/Auth"), props);

  if (props.orm !== "TypeORM")
  {
    data.deleteDestination(data.destinationPath("src/Auth/Infrastructure/Repositories/TokenSqlRepository.ts"))
    data.deleteDestination(data.destinationPath("src/Auth/Infrastructure/Schemas/TokenTypeORM.ts"))
  }
  if (props.orm !== "Mongoose")
  {
    data.deleteDestination(data.destinationPath("src/Auth/Infrastructure/Repositories/TokenMongoRepository.ts"))
    data.deleteDestination(data.destinationPath("src/Auth/Infrastructure/Schemas/TokenMongoose.ts"))
  }
  if (props.orm !== "MikroORM")
  {
    data.deleteDestination(data.destinationPath("src/Auth/Infrastructure/Repositories/TokenMikroSqlRepository.ts"))
    data.deleteDestination(data.destinationPath("src/Auth/Infrastructure/Schemas/TokenMikroORM.ts"))
  }

  if (props.http !== "Express")
  {
    data.deleteDestination(data.destinationPath("src/Auth/Presentation/Handlers/Express"))
    data.deleteDestination(data.destinationPath("src/Auth/Presentation/Middlewares/Express"))
  }
  if(props.http !== "Koa")
  {
    data.deleteDestination(data.destinationPath("src/Auth/Presentation/Handlers/Koa"))
    data.deleteDestination(data.destinationPath("src/Auth/Presentation/Middlewares/Koa"))
  }
}
