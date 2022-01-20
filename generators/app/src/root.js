
module.exports = function root(data)
{
  data.fs.copyTpl(
    data.templatePath("root/*"),
    data.destinationPath("./"),
    {
      projectName: data.props.projectName,
      http: data.props.http,
      orm: data.props.orm,
      fileDomain: data.props.fileDomain
    }
  );

  data.fs.copyTpl(
    data.templatePath("root/config"),
    data.destinationPath("config"),
    {
      projectName: data.props.projectName,
      http: data.props.http,
      orm: data.props.orm,
      fileDomain: data.props.fileDomain
    }
  );

  data.fs.copyTpl(
    data.templatePath("root/docker"),
    data.destinationPath("docker"),
    {
      projectName: data.props.projectName,
      http: data.props.http,
      orm: data.props.orm,
      fileDomain: data.props.fileDomain
    }
  );

  data.fs.copyTpl(
    data.templatePath("root/infrastructure"),
    data.destinationPath("infrastructure"),
    {
      projectName: data.props.projectName,
      http: data.props.http,
      orm: data.props.orm,
      fileDomain: data.props.fileDomain
    }
  );

  data.fs.copyTpl(
    data.templatePath("root/tools"),
    data.destinationPath("tools"),
    {
      projectName: data.props.projectName,
      http: data.props.http,
      orm: data.props.orm,
      fileDomain: data.props.fileDomain
    }
  );

  data.fs.copyTpl(
    data.templatePath("root/.*"),
    data.destinationRoot(),
    {
      projectName: data.props.projectName,
      http: data.props.http,
      orm: data.props.orm,
      fileDomain: data.props.fileDomain
    }
  );
}
