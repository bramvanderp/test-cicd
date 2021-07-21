const {spawn} = require('child_process');
const fs = require('fs');

const npmInstall = async () => {
  await run('npm', ['cache', 'verify']);
  await run('npm', ['ci', '--unsafe-perm']);
  try {
    await run('npm', ['rebuild', 'node-sass']);
  } catch (error) {
    console.debug(`No node-sass in this project? ${JSON.stringify(error)}`);
  }
};

const getVersion = (root = process.cwd()) => {
  const [major, minor] = require(`${root}/package.json`).version.split('.');
  return `${major}.${minor}.${process.env.BITBUCKET_BUILD_NUMBER}`;
};

const run = (command, args, options) => {
  console.debug(`${command} ${args.toString()}`);
  return new Promise(resolve => {
    const spawned = spawn(command, args, options);
    spawned.stdout.on('data', output => console.log(output.toString()));
    spawned.stderr.on('data', output => {
      console.error(output.toString());
    });
    spawned.on('close', (code) => {
      if (code > 0) {
        process.exit(code);
      }
      resolve();
    });
  });
};

const getTag = (prepend, root = process.cwd()) => {
  return `${prepend}_${getVersion(root)}`;
};

const recursiveMkDir = (path) => {
  path.split('/').forEach(level => {
    const pathToLevel = path.slice(0, path.indexOf(level) + level.length);
    if (!fs.existsSync(pathToLevel)) {
      fs.mkdirSync(pathToLevel);
    }
  });
};

const prepareRepository = async (url) => {
  const splits = url.split('/');
  const name = splits[splits.length - 1].replace('.git', '');
  const files = fs.readdirSync('.');
  console.debug(`Checking existence of ${name} in ${files}`);

  if (fs.existsSync(name)) {
    console.debug('Pulling latest master');
    process.chdir(name);
    await run('git', ['checkout', 'master']);
    await run('git', ['pull', '--rebase', '--ff-only']);
    process.chdir('..');
  } else {
    await run('git', ['clone', url]);
  }
};

exports.npmInstall = npmInstall;
exports.getTag = getTag;
exports.recursiveMkDir = recursiveMkDir;
exports.prepareRepository = prepareRepository;
exports.getVersion = getVersion;
exports.run = run;
