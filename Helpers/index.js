const _ = require('lodash');
_.mixin(require("lodash-inflection"));

const pascalCase = (str) =>
{
  return _.startCase(_.camelCase(str)).replace(/ /g, '');
}

const formatName = function (name, sg = false)
{
  return _.snakeCase(name).split('_').map( (value, index, array) => {
    if (sg)
    {
      if (array.length > 1)
      {
        if (index === 0)
        {
          return pascalCase(_.singularize(value));
        }
        else
        {
          if ((index + 1) === array.length)
          {
            return pascalCase(_.pluralize(value));
          }

          else
          {
            return pascalCase(_.singularize(value));
          }
        }

      }
      else
      {
        return pascalCase(_.pluralize(value));
      }
    }

    else
    {
      return pascalCase(_.singularize(value));
    }
  }).join('');
}

module.exports = {
  formatName,
  pascalCase
}
