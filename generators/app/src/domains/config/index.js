
module.exports = function (data)
{
  const props = data.props;

  data.fs.copyTpl(data.templatePath("domains/Config"), data.destinationPath("src/Config"), props);
}
