import path from 'path';
import walk from 'walkdir';
import handlebars from 'handlebars';
import lodash from 'lodash';
const { camelCase, kebabCase } = lodash;
import { copyFile, mkdir, readFile, writeFile, lstat } from 'fs/promises';

handlebars.registerHelper('kebabCase', function(input)
{
  return kebabCase(input);
});

handlebars.registerHelper('camelCase', function(input)
{
  return camelCase(input);
});

handlebars.registerHelper('bold', function(options)
{
  return new handlebars.SafeString(
      `<div class="mybold">${
       options.fn(this)
       }</div>`);
});

handlebars.registerHelper('ifEquals', function(arg1, arg2, options)
{
    return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});

async function fileCopy(source, destination, data)
{
    const src = await readFile(source);
    const filename = path.basename(source);

    const template = handlebars.compile(src.toString());
    const result = template(data);
    await writeFile(`${destination}/${filename}`, result);
}

async function dirCopy(source, destination, data, copyFolder = true)
{
  // without path normalization the srcExpression will fail and clobber src files
  let src = path.resolve(source);
  const lastPathSourceDirectory = src.substring(src.lastIndexOf('/') + 1);
  const partialDest = path.resolve(destination);
  let dest = copyFolder ? `${partialDest}/${lastPathSourceDirectory}` : partialDest;

  const srcExpression = new RegExp(`^${src}`);
  const fileWalk = await walk.async(src, { return_object: true, follow_symlinks: false });

  // create database of data files
  const database = Object
  .entries(fileWalk)
  .map(([fileLocation, fileStats]) => ({
    directory: fileStats.isDirectory(),
    file: fileStats.isFile(),
    src: fileLocation,
    dest: fileLocation.replace(srcExpression, dest)
  }))
  .filter(i => i.src !== i.dest); // clobber protection just incase of freaky fs mounts or some such

  // create base dir as the dest may not actually exist
  await mkdir(dest, { recursive: true });

  // pre-create all the needed directories
  for ({ dest } of database.filter(i => i.directory))
  {
    await mkdir(dest, { recursive:true });
  }

  // copy all files in
  for ({ src, dest } of database.filter(i => i.file))
  {
    await copyFile(src, dest);
  }

  // interpolate everything
  for ({ dest } of database.filter(i => i.file))
  {
    const source = await readFile(dest);
    const template = handlebars.compile(source.toString());
    const result = template(data);
    await writeFile(dest, result);
  }
}

async function hbcopy(source, destination, data, copyFolder = true)
{
    const statSource = await lstat(source);
    const statDestination = await lstat(destination);

    if (statDestination.isFile())
    {
        throw Error('Destination must be a directory.');
    }

    if (statSource.isFile())
    {
        await fileCopy(source, destination, data);
    }
    else
    {
        await dirCopy(source, destination, data, copyFolder);
    }
}

export default hbcopy;
