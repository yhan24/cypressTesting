/// <reference types = "cypress" />

import {addMatchImageSnapshotCommand} from "cypress-image-snapshot/command";

describe(('SnapShot testing - applitools'),()=>{
    beforeEach(()=>{
        cy.visit('/');
        cy.eyesOpen({
            appName: 'SnapShot testing',
            testName: Cypress.currentTest.title,
        });
    });
    it('Login snapshot', function () {
        cy.visit('login').then(()=>{
            cy.eyesCheckWindow({
                tag: "Login page",
                target: 'window',
                fully: true
            });
        });
        cy.loginFunction('student@admin.com','111111','Student').then(()=>{
            cy.eyesCheckWindow({
               tag: "Student Login successfully",
               target: 'window',
               fully: true,
               matchLevel: "Layout"
            });
        });

    });
    // This method performs cleanup after each test.
    afterEach(() => {

        // Close Eyes to tell the server it should display the results.
        cy.eyesClose()
    })
});