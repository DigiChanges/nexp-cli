
module.exports = function (data)
{
  const props = data.props;

  data.fs.copyTpl(data.templatePath("domains/App"), data.destinationPath("src/App"), props);

  if (props.orm !== "TypeORM")
  {
    data.deleteDestination(data.destinationPath("src/App/Infrastructure/Repositories/BaseSqlRepository.ts"));
    data.deleteDestination(data.destinationPath("src/App/Presentation/Shared/Paginator.ts"));
  }
  if (props.orm !== "Mongoose")
  {
    data.deleteDestination(data.destinationPath("src/App/Infrastructure/Repositories/BaseMongoRepository.ts"));
    data.deleteDestination(data.destinationPath("src/App/Presentation/Shared/MongoPaginator.ts"));
  }
  if (props.orm !== "MikroORM")
  {
    data.deleteDestination(data.destinationPath("src/App/Infrastructure/Repositories/BaseMikroSqlRepository.ts"));
    data.deleteDestination(data.destinationPath("src/App/Presentation/Commands/sincronizeMikroORM.ts"));
    data.deleteDestination(data.destinationPath("src/App/Presentation/Shared/MikroPaginator.ts"));
  }

  if (props.http !== "Express")
  {
    data.deleteDestination(data.destinationPath("src/App/Presentation/Handlers/Express"));
    data.deleteDestination(data.destinationPath("src/App/Presentation/Middlewares/Express"));
    data.deleteDestination(data.destinationPath("src/App/Presentation/Shared/Express"));
    data.deleteDestination(data.destinationPath("src/App/Tests/Express"));
  }
  if(props.http !== "Koa")
  {
    data.deleteDestination(data.destinationPath("src/App/Presentation/Handlers/Koa"));
    data.deleteDestination(data.destinationPath("src/App/Presentation/Middlewares/Koa"));
    data.deleteDestination(data.destinationPath("src/App/Presentation/Shared/Koa"));
    data.deleteDestination(data.destinationPath("src/App/Tests/Koa"));
  }
}
