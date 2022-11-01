/// <reference types = "cypress" />

require('cypress-xpath')
import {addDays, format} from 'date-fns';
import {round} from "lodash";

const randomNumber = round(Math.random() * 1000, 0);

describe(("Add new Course"), () => {
    before(() => {
        cy.visit('/login');
    });

    it('Login Manager', function () {
        //Login function
        cy.loginFunction('manager@admin.com', '111111', 'Manager');
        //Verify login successfully
        cy.url().should('contain',Cypress.config().baseUrl+'dashboard/manager');
        //Add new course
        cy.get('#__next').contains('Course').click();
        cy.get('#Course_3\\$Menu > li:nth-child(2) > span:nth-child(2) > a').click();
        //1-1.CourseName
        cy.get('#name').should('have.attr', 'placeholder', 'course name').type("Course" + randomNumber);
        //1-2.Teacher
        cy.get('#teacherId').type("te").then(() => {
            cy.wait(1000);
            //点击结果中的第二个
            cy.xpath('/html/body/div[2]/div/div/div/div[2]/div[1]/div/div/div[2]').click();
            Cypress.on('uncaught:exception', err => !err.message.includes('ResizeObserver loop limit exceeded'));
        });
        //1-3.Type
        cy.get('#type').first().click().then(() => {
            cy.wait(1000);
            //点击结果第二个
            cy.xpath('/html/body/div[3]/div/div/div/div[2]/div[1]/div/div/div[2]').click();
        });
        //1-4.Start Date
        cy.get('#startTime').click().then(() => {
            const tomorrow = format(addDays(new Date, 1), 'yyyy-MM-dd');
            console.log(tomorrow);
            cy.get(`td[title=${tomorrow}]`).click();
        });
        //1-5.Price
        cy.get('#price').type(`${randomNumber}`);
        //1-6.Student Limit
        cy.get('#maxStudents').type('1').then(() => {
            cy.get('#contentLayout span.ant-input-number-handler.ant-input-number-handler-up').eq(1).click();
            expect(cy.get('#maxStudents').should('have.value', 2));
        });
        //1-7.Duration
        cy.get('input[role="spinbutton"]').eq(2).type('2');
        //1-8.Description
        cy.get('#detail').type("Description length must between 100 - 1000 characters.\n" +
            "Description length must between 100 - 1000 characters.\n" + `${Date.now()}`);
        //1-9.Click 'Create Course
        cy.contains("button", "Create Course").click();

        //2-1.Chapters
        //First one
        cy.get('#schedule_chapters_0_name').should('have.attr', 'placeholder', 'Chapter Name').type("Course" + randomNumber);
        cy.get('#schedule_chapters_0_content').should('have.attr', 'placeholder', 'Chapter content').type("Course" + randomNumber);
        cy.contains("button", "Add Chapter").click();
        //Second one
        cy.get('#schedule_chapters_1_name').should('have.attr', 'placeholder', 'Chapter Name').type("Course" + randomNumber);
        cy.get('#schedule_chapters_1_content').should('have.attr', 'placeholder', 'Chapter content').type("Course" + randomNumber);
        //cy.contains("button", "Add Chapter").click();

        //2-2.Class Times
        //First one
        cy.get('#schedule .ant-select-selector').first().click()
            .then(() => {
                cy.get('.ant-select-item').contains('Sunday').click();
            });
        cy.get('#schedule_classTime_0_time').should('have.attr', 'placeholder', 'Select time').click()
            .then(() => {
                cy.get('.ant-picker-time-panel-cell-inner').contains('01').click();
                cy.get('.ant-picker-time-panel-column').eq(1).contains('1').scrollIntoView().click();
                cy.contains('button', 'Ok').click();
            });
        cy.contains('button', 'Add Class Time').click()
        //Second one
        cy.get('#schedule .ant-select-selector').eq(1).click()
            .then(() => {
                cy.get('.ant-select-dropdown:not(.ant-select-dropdown-hidden) .ant-select-item')
                    .contains('Tuesday')
                    .click();
            });
        cy.get('#schedule_classTime_1_time').should('have.attr', 'placeholder', 'Select time').click()
            .then(() => {
                cy.get('.ant-picker-dropdown:not(.ant-picker-dropdown-hidden)').contains('Now').click();
            });

        cy.contains('button', 'Submit').click();
        //3.Successfully Create Course
        cy.get('#contentLayout > main > div:nth-child(4) > div > div.ant-result-title').should('have.text','Successfully Create Course!');
    });

});