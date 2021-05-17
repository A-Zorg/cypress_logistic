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

Given('click Trading icon on the MainBar', () => {
    const icon = new MainBar()
    icon.TradingClick()
    cy.wait(2000)
})

And('click', () => {
    const button = new tradingPageModel()
    button.clickFindSalesOfferButton()
    button.clickFindBuyingDemandButton()

    // cy.get('body > div.app__container > xc-app > div.content__wrap > xc-trading > div > xc-trading-page > div > xc-search-page > form > div > xc-table-layout > div > div > xc-abstract-offer-search-row:nth-child(4) > div')
    //     .should('contain.text', 'DUBAI')

})

And('input text to the "search location" field: {string}', (text) => {
    const field = new tradingPageModel()
    field.inputSearchLocation(text)

    // cy.get('body > div.app__container > xc-app > div.content__wrap > xc-trading > div > xc-trading-page > div > xc-search-page > form > div > xc-table-layout > div > div > xc-abstract-offer-search-row:nth-child(4) > div')
    //     .should('contain.text', 'DUBAI')

})

And('input text to the "container type" field: {string}', (text) => {
    const field = new tradingPageModel()
    field.inputContainerType(text, true)
})

And('select condition: {string}', (text) => {
    const field = new tradingPageModel()
    field.selectCondition(text)
})

And('select company: {string}', (text) => {
    const field = new tradingPageModel()
    field.selectCompany(text)
})

And('click Search button', () => {
    const button = new tradingPageModel()
    button.clickSearchButton()
})