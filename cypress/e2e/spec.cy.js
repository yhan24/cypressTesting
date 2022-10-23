/// <reference types = "cypress" />

//import { eq } from "lodash";

describe('Test Course Manager System', () => {
  beforeEach(() =>{
    cy.visit('/');
  });

  it('Case1: HomePage has a logo', ()=>{
    cy.get('#logo');
  });

  it('Case2: Navigation bar contains 5 links', ()=>{
    cy.get('#menu a').should('have.length',5).and('have.attr','href');
  });

  it('Case3: Navigation bar always on top', ()=>{
    cy.get('.container').should('be.visible');
    cy.get('.info').contains('The best learning methods').should('be.visible');
    cy.get('.info p').contains('Sed ut').should('be.visible');
    cy.scrollTo('bottom');
    cy.get('.container').should('be.visible');
  });

  it('Case4: Jump to Events Page', ()=>{
    cy.get('#menu a').contains('Events').click();
    cy.url().should('eq',cy.config().baseUrl+'events');
    cy.url().should('eq',Cypress.config().baseUrl+'events');
  });

  it('Case5: Click Logo back to Main Page', ()=>{
    cy.get('#logo').click();
    cy.url().should('eq',cy.config().baseUrl);
  });
});