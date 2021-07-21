const { run } = require("./utilities");

const buildMainProject = async () => {
    await run('npm', ['ci']);
    await run('npm', ['run', 'build']);
}

exports.buildMainProject = buildMainProject;
