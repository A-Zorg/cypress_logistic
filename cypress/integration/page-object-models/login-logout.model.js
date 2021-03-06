// / <reference types="cypress" />


class LoginPage
{
    visit(){

      cy.visit('login', {failOnStatusCode:false})//cy.visit('https://dev.container-xchange.com/login', {failOnStatusCode:false})
    }

    fillEmail(value){
        const field = cy.get('[id=input-control-1]')
        field.clear()
        field.type(value)

        return this
    }

    fillPassword(value){
        const field = cy.get('[id=input-control-2]')
        field.clear()
        field.type(value)

        return this
    }

    submitUser(){
        const button = cy.get('[type=submit]')
        button.should('be.enabled')
        button.click()

    }


}
export default LoginPage