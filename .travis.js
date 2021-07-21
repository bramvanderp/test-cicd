#!/usr/bin/env node

const { testSubProject } = require("./pipeline");

const pipeline = async () => {
    await testSubProject();
}

console.log('Starting build...');
pipeline().then(() => console.log('Build finished.'));

