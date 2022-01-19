
module.exports = function indexFiles(data)
{
  data.fs.copyTpl(
    data.templatePath("indexFiles/*"),
    data.destinationPath("./src"),
    {
      projectName: data.props.projectName,
      http: data.props.http,
      orm: data.props.orm,
      fileDomain: data.props.fileDomain
    }
  );
}
