
module.exports = function (data)
{
  const props = data.props;
  const path = `src/${props.domainName}`;

  data.fs.copyTpl(data.templatePath("domain/Domain"), data.destinationPath(`${path}`), props);

  data.deleteDestination(data.destinationPath(`${path}/Domain`));
}
