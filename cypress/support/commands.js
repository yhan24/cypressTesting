// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import {addMatchImageSnapshotCommand} from 'cypress-image-snapshot/command';
import {AES} from 'crypto-js';
import "cypress-localstorage-commands";

addMatchImageSnapshotCommand({
    failureThreshold: 0.0,
    failureThresholdType: 'percent',
    customDiffConfig: {threshold: 0.0},
    capture: 'viewport',
});
import 'happo-cypress';

Cypress.Commands.add("loginFunction", (userName, passWord, loginRole) => {
    cy.visit('login');
    cy.get('#login_role').contains(loginRole).click();
    cy.get('input[type="email"').type(userName);
    cy.get('input[type="password"').type(passWord);
    cy.contains('button', 'Sign in').click()
});
//commands.js
Cypress.Commands.add("loginApi", (userName, passWord, loginRole) => {
    context('GET login auth token', () => {
        const pwd = AES.encrypt(passWord, 'cms').toString();
        const payload = {
            method: 'POST',
            url: `${Cypress.env().apiUrl}login`,
            body: {
                email: userName,
                password: pwd,
                role: loginRole,
            },
        };
        cy.request(payload).then((res) => {
            expect(res.status).eq(201);
            const accessToken = res.body.data.token;
            window.localStorage.setItem('authToken', res.body.data.token);
            //window.localStorage.setItem('authToken',JSON.stringify(accessToken));
            cy.saveLocalStorage('authToken');
            console.log("Token in Commands: " + window.localStorage.getItem('authToken'));
        });
    })
});

Cypress.Commands.add("logout", () => {
    cy.get('#contentLayout > header > div > span.style__HeaderIcon-i6pof4-0.qabPo > span').click();
    cy.get('.ant-dropdown-menu-item').contains('Logout').click();
    localStorage.debug = 'cypress:*';
});