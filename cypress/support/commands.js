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
Cypress.Commands.add("loginFunction", (userName,passWord,loginRole) => {
    cy.visit('login');
    cy.get('#login_role').contains(loginRole).click();
    cy.get('input[type="email"').type(userName);
    cy.get('input[type="password"').type(passWord);
    cy.contains('button', 'Sign in').click()
});


Cypress.Commands.add("logout",()=>{
    cy.get('#contentLayout > header > div > span.style__HeaderIcon-i6pof4-0.qabPo > span').click();
    cy.get('.ant-dropdown-menu-item').contains('Logout').click();
    localStorage.debug = 'cypress:*';
});