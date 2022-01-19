
module.exports = function packagejson(data)
{
  data.fs.copyTpl(
    data.templatePath("package.json"),
    data.destinationPath("package.json"),
    {
      projectName: data.props.projectName,
      http: data.props.http,
      orm: data.props.orm
    }
  );
}
