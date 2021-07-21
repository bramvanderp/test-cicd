#!/usr/bin/env node

const { run } = require("./utilities");

console.log('Starting build...');
pipeline().then(() => console.log('Build finished.'));

const pipeline = async () => {
    await testSubProject();
}

const testSubProject = async () => {
    process.chdir('./sub-project')
    await run('npm', ['ci']);
    await run('npm', ['test']);
}