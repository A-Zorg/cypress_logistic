/// <reference types="cypress" />

import MainBar from "../page-object-models/main-bar.model";
import TradingNewSalesModel from "../page-object-models/trading-new-sales-model";
import TradingPageModel from "../page-object-models/trading-page-model";
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

Given('I open the Trading application', () => {
    const icon = new MainBar()
    icon.tradingClick()
    cy.wait(3000)
})

And('I create -{string}-', (button_name) => {
    const button = new TradingPageModel()
    if (button_name === 'New sales offer'){
        button.clickSalesOfferButton()
    }else if (button_name === 'New buying demand'){
        button.clickNewBuyingDemandButton()
    }
    cy.wait(1000)
})

And('I fill the (Basic) Container information in: {string},{string},{string},{string},{string}', (location, condition, type, from_year, to_year) => {
    const container = new TradingNewSalesModel()
    container.locationField(location)
    container.conditionField(condition)
    container.typeField(type)
    container.fromYearField(from_year)
    container.toYearField(to_year)
    container.nextStepButton(" Next step ")
})

And('fill the field -location- with {string}', (location) => {
    const newSale = new TradingNewSalesModel()
    newSale.locationField(location)
})

And('fill the field -condition- with {string}', (condition) => {
    const newSale = new TradingNewSalesModel()
    newSale.conditionField(condition)
})

And('fill the field -type- with {string}', (type) => {
    const newSale = new TradingNewSalesModel()
    newSale.typeField(type)
})

And('fill the field -from year- with {string}', (from_year) => {
    const newSale = new TradingNewSalesModel()
    newSale.fromYearField(from_year)
})

And('fill the field -to year- with {string}', (to_year) => {
    const newSale = new TradingNewSalesModel()
    newSale.toYearField(to_year)
})

And('I fill offer details in: {string},{string},{string}', (price, qty, valid_for,) => {
    const container = new TradingNewSalesModel()
    container.targetPriceconditionField(price)
    container.quantityField(qty)
    container.validForField(valid_for)
    container.nextStepButton(" Next step ")
})

And('fill the field -target price- with {string}', (price) => {
    const newSale = new TradingNewSalesModel()
    newSale.targetPriceconditionField(price)
})

And('fill the field -quantity- with {string}', (qty) => {
    const newSale = new TradingNewSalesModel()
    newSale.quantityField(qty)
})

And('fill the field -valid for- with {string}', (valid_for) => {
    const newSale = new TradingNewSalesModel()
    newSale.validForField(valid_for)
})


And('I fill optional data in: {string},{string}', (comment, path_name) => {
    const container = new TradingNewSalesModel()
    container.commentField(comment)
    if (path_name !== 'null'){
        container.fileField(path_name)
    }
    container.otherDetailsButton()
})

And('I fill other details in: {string},{string},{string},{string},{string}', (radiobutton, pickup_date, csc_date, prefix, color) => {
    const container = new TradingNewSalesModel()
    container.containerForRadioButton(radiobutton)
    container.pickupDateField(pickup_date)
    container.CSCexpireDateField(csc_date)
    container.containerPrefixesField(prefix)
    container.containerColorsField(color)
})

And('fill the field -comment- with {string}', (comment) => {
    const newSale = new TradingNewSalesModel()
    newSale.commentField(comment)
})
And('select image file with path-name {string}', (path_name) => {
    const newSale = new TradingNewSalesModel()
    newSale.fileField(path_name)
})

And('select radiobutton with name {string}', (name) => {
    const newSale = new TradingNewSalesModel()
    newSale.containerForRadioButton(name)
})

And('select PICKUP date - {string}', (datum) => {
    const newSale = new TradingNewSalesModel()
    newSale.pickupDateField(datum)
})

And('select CSC expires date - {string}', (datum) => {
    const newSale = new TradingNewSalesModel()
    newSale.CSCexpireDateField(datum)
})

And('fill the field -container prefixes- with {string}', (comment) => {
    const newSale = new TradingNewSalesModel()
    newSale.containerPrefixesField(comment)
})

And('fill the field -container colors- with {string}', (comment) => {
    const newSale = new TradingNewSalesModel()
    newSale.containerColorsField(comment)
})

Then('check created {string} with prev parameters:{string}, {string}, {string}, {string}, {string}, {string}', (type_name, price, location, qty, type_s, condition, years) => {
    let text = ''
    if (type_name === 'SALES OFFER'){
        text = 'So good! You just published a new sales offer.'
    }
    else if (type_name === 'BUYING DEMAND'){
        text = 'So good! You just published a new buying demand.'
    }

    const newSale = new TradingNewSalesModel()
    newSale.successCreationCheck(price, location, qty, type_s,condition, years, text)
})

And('I click the button {string}', (button_name) => {
    const newSale = new TradingNewSalesModel()
    newSale.nextStepButton(button_name)
})

And('to TRADING page', () => {
    const newSale = new TradingNewSalesModel()
    newSale.toTradingPageButton()
})

And('click the button OTHER DETAILS', (button_name) => {
    const newSale = new TradingNewSalesModel()
    newSale.otherDetailsButton()
})

