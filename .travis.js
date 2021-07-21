#!/usr/bin/env node

const { buildMainProject } = require("./pipeline/main");
const { testSubProject } = require("./pipeline/sub-project");
const { containsChanges } = require("./pipeline/utilities");

const pipeline = async () => {
    const startingDirectory = process.cwd();
    
    const subProjectContainsChanges = process.env.TARGET === 'sub-project' && containsChanges(process.env.TARGET, process.env.TRAVIS_COMMIT_RANGE)
    if(subProjectContainsChanges){
        await testSubProject();
        process.chdir(startingDirectory)
    }
    
    await buildMainProject();
}

console.log('Starting build...');
pipeline().then(() => console.log('Build finished.'));

