/// <reference types="cypress" />

import MainBar from "../pageObjectModels/MainBar";
import tradingNewSalesModel from "../pageObjectModels/tradingNewSalesModel";
import tradingPageModel from "../pageObjectModels/tradingPageModel";
const {
  Before,
  After,
  Given,
  Then,
  And
} = require("cypress-cucumber-preprocessor/steps");


let context = {}
Before(() => {
       cy.fixture('example').then(function(data) {
           context['config'] = data
            cy.login(data.email, data.password)
        })
})

Given('login page', () => {

    // cy.get('body > div.app__container > xc-app > div.content__wrap > xc-trading > div > xc-trading-page > div > xc-search-page > form > div > xc-table-layout > div > div > xc-abstract-offer-search-row:nth-child(4) > div')
    //     .should('contain.text', 'DUBAI')

})

Given('click Trading icon on the MainBar', () => {
    const icon = new MainBar()
    icon.TradingClick()
    cy.wait(2000)
})

And('click button -{string}-', (button_name) => {
    const button = new tradingPageModel()
    if (button_name == 'New sales offer'){
        button.clickSalesOfferButton()
    }else if (button_name == 'New buying demand'){
        button.clickNewBuyingButton()
    }
    cy.wait(1000)
})

And('fill the field -location- with {string}', (location) => {
    const newSale = new tradingNewSalesModel()
    newSale.locationField(location)
})

And('fill the field -condition- with {string}', (condition) => {
    const newSale = new tradingNewSalesModel()
    newSale.conditionField(condition)
})

And('fill the field -type- with {string}', (type) => {
    const newSale = new tradingNewSalesModel()
    newSale.typeField(type)
})

And('fill the field -from year- with {string}', (from_year) => {
    const newSale = new tradingNewSalesModel()
    newSale.fromYearField(from_year)
})

And('fill the field -to year- with {string}', (to_year) => {
    const newSale = new tradingNewSalesModel()
    newSale.toYearField(to_year)
})

And('fill the field -target price- with {string}', (price) => {
    const newSale = new tradingNewSalesModel()
    newSale.targetPriceconditionField(price)
})

And('fill the field -quantity- with {string}', (qty) => {
    const newSale = new tradingNewSalesModel()
    newSale.quantityField(qty)
})

And('fill the field -valid for- with {string}', (valid_for) => {
    const newSale = new tradingNewSalesModel()
    newSale.validForField(valid_for)
})


And('fill the field -comment- with {string}', (comment) => {
    const newSale = new tradingNewSalesModel()
    newSale.commentField(comment)
})
And('select image file with path-name {string}', (path_name) => {
    const newSale = new tradingNewSalesModel()
    newSale.fileField(path_name)
})

Then('check created {string} with prev parameters:{string}, {string}, {string}, {string}, {string}, {string}', (type_name, price, location, qty, type_s, condition, years) => {
    let text = ''
    if (type_name === 'SALES OFFER'){
        text = 'So good! You just published a new sales offer.'
    }
    else if (type_name === 'BUYING DEMAND'){
        text = 'So good! You just published a new buying demand.'
    }

    const newSale = new tradingNewSalesModel()
    newSale.successCreationCheck(price, location, qty, type_s,condition, years, text)
})

And('click the button {string}', (button_name) => {
    const newSale = new tradingNewSalesModel()
    newSale.nextStepButton(button_name)
})

And('to TRADING page', () => {
    const newSale = new tradingNewSalesModel()
    newSale.toTradingPageButton()
})