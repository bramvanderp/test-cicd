const {spawn} = require('child_process');
const fs = require('fs');

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

const containsChanges = async (directory, commits) => {
 const changedFiles = await run('git', ['diff', '--name-only', commits]);
 const onlyFilesInDirectory = changedFiles.filter(path => path.includes(directory));
 return onlyFilesInDirectory.length >= 1;
};



exports.containsChanges = containsChanges;
exports.run = run;
