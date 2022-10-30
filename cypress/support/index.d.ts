/// <reference types="cypress" />
require ('cypress-xpath')

declare namespace Cypress {
    interface Chainable<Subject = any> {
        /**
         * Custom command to ... add your description here
         * @example cy.clickOnMyJourneyInCandidateCabinet()
         */
        clickOnMyJourneyInCandidateCabinet(): Chainable<null>;
    }
}

declare namespace Cypress {
    interface Chainable<Subject = string> {
        loginFunction(userName, passWord, role): Chainable<Element>;
    }
    interface Chainable<Subject = string> {
        logout(): Chainable<Element>;
    }

}

const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
Cypress.on('uncaught:exception', (err) => {
    /* returning false here prevents Cypress from failing the test */
    if (resizeObserverLoopErrRe.test(err.message)) {
        return false
    }
})
