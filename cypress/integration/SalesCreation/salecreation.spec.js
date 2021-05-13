/// <reference types="cypress" />

import MainBar from "../pageObjectModels/MainBar";
import tradingNewSalesModel from "../pageObjectModels/tradingNewSalesModel";
import tradingPageModel from "../pageObjectModels/tradingPageModel";
const {
  Before,
  After,
  Given,
  Then
} = require("cypress-cucumber-preprocessor/steps");


let context = {}
Before(() => {
       cy.fixture('example').then(function(data) {
           context['config'] = data
            cy.login(data.email, data.password)
        })
       // cy.login('str@container-xchange.com', 'faiLiu4c')

})

Given('login page', () => {
        const icon = new MainBar()
        icon.TradingClick()
    cy.wait(2000)
    const button = new tradingPageModel()
    button.clickSalesOfferButton()
    cy.wait(1000)
    const newSale = new tradingNewSalesModel()
    newSale.locationField('DUBAI')
    newSale.conditionField('Brand new')
    newSale.typeField('20 Open top')
    newSale.fromYearField('2020')
    newSale.toYearField('2021')
    newSale.nextStepButton()
    newSale.targetPriceconditionField(12)
    newSale.quantityField(12)
    newSale.validForField('1 year')
    newSale.nextStepButton()
        // cy.get('[data-test-id=nav-trading-page] >div>span').should('have.text', 'Trading').click()

})

// When('enter password', () => {
//     lp.fillPassword(context['config'].password)
//
// })
//
// Then('press button', () => {
//     lp.submitUser()
// })