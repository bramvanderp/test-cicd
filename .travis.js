#!/usr/bin/env node

const { testSubProject } = require("./pipeline/sub-project");

const pipeline = async () => {
    await testSubProject();
}

console.log('Starting build...');
pipeline().then(() => console.log('Build finished.'));

