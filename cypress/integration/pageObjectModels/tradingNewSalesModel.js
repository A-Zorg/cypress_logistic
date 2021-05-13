/// <reference types="cypress" />

class tradingNewSalesModel {

    locationField(value){
          cy.get('div.form-single-input > xc-input-wrap > div > label > span').should('have.text','Location')
          cy.get('div.form-single-input > xc-input-wrap > div > div > ng-select > div > div > div.ng-input > input[type=text]')
            .type(value).type('{enter}')

    }
    typeField(value){
        cy.get('div.form-multi-input > div:nth-child(1) > xc-input-wrap > div > label > span').should('have.text','Type')
          cy.get('div:nth-child(1) > xc-input-wrap > div > div > ng-select > div > div > div.ng-input > input[type=text]')
            .type(value).type('{enter}')
    }
    conditionField(value){
        cy.get('div.form-multi-input > div:nth-child(2) > xc-input-wrap > div > label > span').should('have.text','Condition')
          cy.get('div.form-multi-input > div:nth-child(2) > xc-input-wrap > div > div > ng-select > div > div > div.ng-input > input[type=text]')
            .type(value).type('{enter}')
    }
    fromYearField(value){
        cy.get('div.form-yom-input > div:nth-child(1) > xc-input-wrap > div > label > span').should('have.text','From (optional)')
          cy.get('[formcontrolname="yearOfManufactureRangeFrom"]')
            .type(value).type('{enter}')
    }
    toYearField(value){
        cy.get('div.form-yom-input > div:nth-child(2) > xc-input-wrap > div > label > span').should('have.text','To (optional)')
          cy.get('[formcontrolname="yearOfManufactureRangeTo"]')
            .type(value).type('{enter}')
    }

    targetPriceconditionField(value){
        cy.get('xc-input-group > div > label').should('have.text','Target price')
          cy.get('input[formcontrolname=price]')
            .type(value)
    }
    quantityField(value){
        cy.get('div:nth-child(2) > xc-input-wrap > div > label > span').should('have.text','Quantity')
          cy.get('input[formcontrolname=quantity]')
            .type(value)
    }
    validForField(value){
        cy.get('div:nth-child(3) > xc-input-wrap > div > label > span').should('have.text','Valid for')
        cy.get("xc-input-wrap > div > div > ng-select > div > span").click()
        cy.xpath(`//span[contains(text(),'${value}')]`)
            .click()
    }


    nextStepButton(){
          cy.get('button[type=submit]')
            .should('have.text', ' Next step ').click()
    }
}

export default tradingNewSalesModel