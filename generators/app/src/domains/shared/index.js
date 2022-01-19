
module.exports = function (data)
{
  const props = data.props;

  data.fs.copyTpl(data.templatePath("domains/Shared"), data.destinationPath("src/Shared"), props);

  if (props.orm !== "TypeORM")
  {
    data.deleteDestination(data.destinationPath("src/Shared/Database/TypeORMCreateConnection.ts"))
  }
  if (props.orm !== "Mongoose")
  {
    data.deleteDestination(data.destinationPath("src/Shared/Database/MongooseCreateConnection.ts"))
  }
  if (props.orm !== "MikroORM")
  {
    data.deleteDestination(data.destinationPath("src/Shared/Database/MikroORMCreateConnection.ts"))
    data.deleteDestination(data.destinationPath("src/Shared/Factories/EntityManagerFactory.ts"))
  }
}
