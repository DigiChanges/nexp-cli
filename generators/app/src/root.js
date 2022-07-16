module.exports = function root(data) {
  const {
    props: { fileDomain, http, orm, projectName: propsProjectName },
    fs,
  } = data;

  const projectName = propsProjectName.replace(/[^\w\s]/gi, '_');

  const filesPaths = new Map();

  const filesOptions = {
    fileDomain,
    http,
    orm,
    projectName,
  };

  filesPaths.set(data.templatePath('root/*'), { destinationPath: data.destinationPath('./'), ...filesOptions });

  filesPaths.set(data.templatePath('root/config'), { destinationPath: data.destinationPath('config'), ...filesOptions });

  filesPaths.set(data.templatePath('root/docker'), { destinationPath: data.destinationPath('docker'), ...filesOptions });

  filesPaths.set(data.templatePath('root/infrastructure'), { destinationPath: data.destinationPath('infrastructure'), ...filesOptions });

  filesPaths.set(data.templatePath('root/tools'), { destinationPath: data.destinationPath('tools'), ...filesOptions });

  filesPaths.set(data.templatePath('root/.*'), { destinationPath: data.destinationRoot(), ...filesOptions });

  filesPaths.forEach((pathValue, pathKey) => fs.copyTpl(pathKey, pathValue.destinationPath, pathValue));
};
