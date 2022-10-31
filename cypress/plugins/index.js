/// <reference types="cypress" />
import 'cypress-plugin-snapshots/commands';

const { initPlugin } = require('cypress-plugin-snapshots/plugin');
const {addMatchImageSnapshotPlugin,} = require('cypress-image-snapshot/plugin');

module.exports = (on, config) => {
    initPlugin(on, config);
    addMatchImageSnapshotPlugin(on, config);
    return config;
};