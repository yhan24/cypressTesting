/// <reference types = "cypress" />
//asign4_apiTesting.cy.js
before(()=>{
    console.log(cy.loginApi('student@admin.com','111111','student'));
    cy.window().its('localStorage').then(($el)=>{
        const token = localStorage.getItem('authToken');
        console.log('The token in window: ' + token);
    })
    console.log(cy.getLocalStorage('authToken'));
});

describe(('API Testing'),()=>{
    context('GET Auth',()=>{
        it('GET /api/userRole',  ()=> {
           console.log("API Testing" + ``);
           const authorization = `${token}`;
           const payload = {
               method: 'GET',
               url: `${Cypress.env().apiUrl}userRole`,
               headers:{authorization},
           };
           cy.request(payload).then((res)=>{
               expect(res.status).eq(200);
               const data = res.body.data;
               expect(data.msg).eq('success');
           });
        });

    });

});