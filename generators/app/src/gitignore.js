
module.exports = function root(data)
{
  data.fs.copyTpl(
    data.templatePath("gitignore"),
    data.destinationPath(".gitignore"),
    {
      projectName: data.props.projectName,
      http: data.props.http,
      orm: data.props.orm,
      fileDomain: data.props.fileDomain
    }
  );
}
