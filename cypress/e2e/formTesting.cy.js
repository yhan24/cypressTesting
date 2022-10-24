/// <reference types = "cypress" />

describe('Assignment #3 Form Testing', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it("Case1: Login Page",()=>
    {
        cy.get("#menu a").contains("Sign in").click();
        cy.url().should('eq',Cypress.config().baseUrl+"login");
        //1. 表单默认选中student
        cy.get('#login_role :checked').should('be.checked').and('have.value','student');
        //2. 表单含有三个角色，Student, Teacher, Manager
        cy.get('#login_role [type="radio"]').should('have.length',3);
        cy.get('input[type="radio"]').should('have.value','student');
        cy.get('#login_role > label:nth-child(2) [type="radio"]').should('have.value','teacher');
        cy.get('#login_role > label:nth-child(3) [type="radio"]').should('have.value','manager');
    });

    it("Case2: Email Username",()=>
    {
        cy.visit("login");
        cy.get('.ant-input').should('have.attr','placeholder','Please input email');
        //测试email格式
        //1.输入 错误 email地址
        cy.get('#login_email').type("test.com");
        cy.get('[role="alert"]').should('have.text',("'email' is not a valid email"));
        //2.输入 正确 email地址
        cy.get('#login_email').type("test@test.com");
        //??cy.get('#login .ant-row ant-form-item ant-form-item-has-success').should('be.visible');
        //3.输入 空 email地址
        cy.get('#login_email').clear();
        cy.contains('button', 'Sign in').click();
        cy.get('[role="alert"]').should('contain.text',("'email' is required"));
    });

    it('Case3: Email Password', function () {
        cy.visit("login");
        cy.get('#login_email').type("test@test.com");
        //1.输入 错误 password格式
        cy.get('input[type="password"]').should('have.attr', 'placeholder', 'Please input password');
        //Less than 4 characters
        cy.get('#login_password').type('111');
        cy.get('[role="alert"]').should('have.text',("'password' must be between 4 and 16 characters"));
        //More than 16 characters
        cy.get('#login_password').clear()
        cy.get('#login_password').type('12345678901234567');
        cy.get('[role="alert"]').should('have.text',("'password' must be between 4 and 16 characters"));
        //2.输入 空 password
        cy.get('#login_password').clear()
        cy.get('[role="alert"]').should('have.text',("'password' is required"));
        //3.只能包含大小写字母……？？？
    });

    it('Case4-1: Login function - Student', function () {
        loginTest("student@admin.com","111111","Student");
    });
    it('Case4-2: Login function - Teacher', function () {
        loginTest("teacher@admin.com","111111","Teacher");
    });
    it('Case4-3: Login function - Manager', function () {
        loginTest("manager@admin.com","111111","Manager");
    });
    it('Case4-4: Login function - failed', function () {
        loginTest("teacher@admin.com","000000","Teacher");
    });
    it('Case4-5: Login function - failed', function () {
        loginTest("teacher@admin.com","111111","Student");
    });


    function loginTest(userName,passWord,loginRole){
        cy.visit('login');
        cy.get('#login_role').contains(loginRole).click();
        cy.get('input[type="email"').type(userName);
        cy.get('input[type="password"').type(passWord);
        cy.contains('button', 'Sign in').click();
        cy.get('body')
            .then($body =>{
                if($body.find('.ant-message').has('unknown error'))
                    return console.log("unknown error, login failed");
                else if($body.find('.ant-message').has('Please check your password or email'))
                    return console.log("Invalid combination, login failed");
            });
        cy.wait(2000);
        cy.url().should('eq',Cypress.config().baseUrl+'dashboard/'+loginRole.toLowerCase());
        console.log(loginRole + "login successfully")
        cy.get('#contentLayout > header > div > span.style__HeaderIcon-i6pof4-0.qabPo > span').click();
        cy.get('.ant-dropdown-menu-item').contains('Logout').click();
        localStorage.debug = 'cypress:*';
    }
});
