
module.exports = function (data)
{
  const props = data.props;

  if (props.fileDomain)
  {
    data.fs.copyTpl(data.templatePath("domains/File"), data.destinationPath("src/File"), props);

    if (props.orm !== "TypeORM")
    {
      data.deleteDestination(data.destinationPath("src/File/Infrastructure/Repositories/FileSqlRepository.ts"))
      data.deleteDestination(data.destinationPath("src/File/Infrastructure/Schemas/FileTypeORM.ts"))
    }
    if (props.orm !== "Mongoose")
    {
      data.deleteDestination(data.destinationPath("src/File/Infrastructure/Repositories/FileMongoRepository.ts"))
      data.deleteDestination(data.destinationPath("src/File/Infrastructure/Schemas/FileMongoose.ts"))
      data.deleteDestination(data.destinationPath("src/File/Infrastructure/Schemas/IFileDocument.ts"))
    }
    if (props.orm !== "MikroORM")
    {
      data.deleteDestination(data.destinationPath("src/File/Infrastructure/Repositories/FileMikroSqlRepository.ts"))
      data.deleteDestination(data.destinationPath("src/File/Infrastructure/Schemas/FileMikroORM.ts"))
    }

    if (props.http !== "Express")
    {
      data.deleteDestination(data.destinationPath("src/File/Presentation/Handlers/Express"))
      data.deleteDestination(data.destinationPath("src/File/Presentation/Middlewares/Express"))
    }
    if(props.http !== "Koa")
    {
      data.deleteDestination(data.destinationPath("src/File/Presentation/Handlers/Koa"))
      data.deleteDestination(data.destinationPath("src/File/Presentation/Middlewares/Koa"))
    }
  }
}
