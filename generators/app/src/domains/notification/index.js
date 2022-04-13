
module.exports = function (data)
{
  const props = data.props;

  data.fs.copyTpl(data.templatePath("domains/Notification"), data.destinationPath("src/Notification"), props);

  if (props.orm !== "TypeORM")
  {
    // data.deleteDestination(data.destinationPath("src/Notification/Infrastructure/Repositories/NotificationSqlRepository.ts"))
    data.deleteDestination(data.destinationPath("src/Notification/Infrastructure/Schemas/NotificationTypeORM.ts"))
  }
  if (props.orm !== "Mongoose")
  {
    data.deleteDestination(data.destinationPath("src/Notification/Infrastructure/Repositories/NotificationMongoRepository.ts"))
    data.deleteDestination(data.destinationPath("src/Notification/Infrastructure/Schemas/NotificationMongoose.ts"))
  }
  if (props.orm !== "MikroORM")
  {
    // data.deleteDestination(data.destinationPath("src/Notification/Infrastructure/Repositories/NotificationMikroSqlRepository.ts"))
    // data.deleteDestination(data.destinationPath("src/Notification/Infrastructure/Schemas/NotificationMikroORM.ts"))
  }

  if (props.http !== "Express")
  {
    data.deleteDestination(data.destinationPath("src/Notification/Presentation/Handlers/Express"))
  }
  if(props.http !== "Koa")
  {
    data.deleteDestination(data.destinationPath("src/Auth/Presentation/Handlers/Koa"))
  }
}
