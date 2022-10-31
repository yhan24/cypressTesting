/// <reference types = "cypress" />


describe(('SnapShot testing - cypress-plugin-snapshots'), () => {
    beforeEach(() => {
        cy.visit('/');

    });
    it('toMatchImageSnapshot - whole page', function () {
        cy.visit('login').then(() => {
            cy.document().toMatchImageSnapshot();
        });
        cy.loginFunction('student@admin.com', '111111', 'Student').then(() => {
            //cy.percySnapshot();
        });
    });

});