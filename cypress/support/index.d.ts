/// <reference types="cypress" />

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
        loginFunction(string, string, string): Chainable<Element>;
    }
    interface Chainable<Subject = string> {
        loginSuccess(string): Chainable<Element>;
    }
    interface Chainable<Subject = string> {
        loginFailed(): Chainable<Element>;
    }
}