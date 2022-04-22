
module.exports = function root(data)
{
  const projectName = data.props.projectName.replace(/[^\w\s]/gi, '_');

  data.fs.copyTpl(
    data.templatePath("root/*"),
    data.destinationPath("./"),
    {
      projectName,
      http: data.props.http,
      orm: data.props.orm,
      fileDomain: data.props.fileDomain
    }
  );

  data.fs.copyTpl(
    data.templatePath("root/config"),
    data.destinationPath("config"),
    {
      projectName,
      http: data.props.http,
      orm: data.props.orm,
      fileDomain: data.props.fileDomain
    }
  );

  data.fs.copyTpl(
    data.templatePath("root/docker"),
    data.destinationPath("docker"),
    {
      projectName,
      http: data.props.http,
      orm: data.props.orm,
      fileDomain: data.props.fileDomain
    }
  );

  data.fs.copyTpl(
    data.templatePath("root/infrastructure"),
    data.destinationPath("infrastructure"),
    {
      projectName,
      http: data.props.http,
      orm: data.props.orm,
      fileDomain: data.props.fileDomain
    }
  );

  data.fs.copyTpl(
    data.templatePath("root/tools"),
    data.destinationPath("tools"),
    {
      projectName,
      http: data.props.http,
      orm: data.props.orm,
      fileDomain: data.props.fileDomain
    }
  );

  data.fs.copyTpl(
    data.templatePath("root/.*"),
    data.destinationRoot(),
    {
      projectName,
      http: data.props.http,
      orm: data.props.orm,
      fileDomain: data.props.fileDomain
    }
  );
}
