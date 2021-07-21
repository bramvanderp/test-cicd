const { run } = require("./utilities");

export const testSubProject = async () => {
    process.chdir('./sub-project')
    await run('npm', ['ci']);
    await run('npm', ['test']);
}