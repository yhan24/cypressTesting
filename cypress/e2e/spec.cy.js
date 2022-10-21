const { number } = require("assert-plus");
const { eq } = require("lodash");

describe('empty spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
});

describe('Test Course Manager System', () => {
  it('Case1: HomePage has a logo', ()=>{
    cy.visit('https://cms-lyart.vercel.app/');
    cy.get('#logo');
  });

  it('Case2: Navigation bar contains 5 links', ()=>{
    cy.get('#menu a').should('have.length',5).and('have.attr','href');
  });

  it('Case3: Navigation bar always on top', ()=>{
    //cy.visit('https://cms-lyart.vercel.app/');
    cy.get('.container').should('be.visible');
    cy.get('.info').contains('The best learning methods').should('be.visible');
    cy.scrollTo('bottom');
    cy.get('.container').should('be.visible');
  });

  it('Case4: Jump to Events Page', ()=>{
    cy.get('#menu a').contains('Events').click();
    cy.url().should('eq',cy.config().baseUrl +'events');
  });

  it('Case5: Click Logo back to Main Page', ()=>{
    cy.get('#logo').click();
    cy.url().should('eq',cy.config().baseUrl);
  });
});