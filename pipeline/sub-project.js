const { run } = require("./utilities");

const testSubProject = async () => {
    process.chdir('./sub-project')
    await run('npm', ['ci']);
    await run('npm', ['test']);
}

exports.testSubProject = testSubProject;
