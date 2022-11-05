/// <reference types = "cypress" />
//asign4_apiTesting.cy.js
describe(('API Testing'),()=>{
    var token = '';
    before(()=>{
        cy.clearLocalStorage();
        cy.loginApi('student@admin.com','111111','student');
        cy.window().its('localStorage').then(($el)=>{
            token = localStorage.getItem('authToken');
        })
    });

    context('GET Auth',()=>{
        it('GET /api/userRole',  ()=> {
           const authorization = "Bearer "+`${token}`;
           const payload = {
               method: 'GET',
               url: `${Cypress.env().apiUrl}userRole`,
               headers:{authorization},
           };
           cy.request(payload).then((res)=>{
               expect(res.status).eq(200);
               const data = res.body;
               expect(data.msg).eq('success');
           });
        });
    });
    context('POST Users',()=>{
        it('POST /api/signup',()=>{
           const authorization = "Bearer "+ `${token}`;
           const payload = {
             method: 'POST',
             url: `${Cypress.env().apiUrl}signup`,
               // headers: {
               //   Content-Type: 'application/json'},
             email: 'student1'+'@admin.com',
             password: '111111',
             role: 'student'
           };
           console.log(payload);

        });
    });

});