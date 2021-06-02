import MainBar from "../page-object-models/main-bar.model";
import TradingNewSalesModel from "../page-object-models/trading-new-sales-model";
import TradingPageModel from "../page-object-models/trading-page-model";
import TradingSearchPageModel from "../page-object-models/trading-search-page-model";
import NegotiationFrame from "../page-object-models/negotiation-frame.model";
import TradingDealPageModel from "../page-object-models/trading-deal-page-model";

const {
  Before,
  After,
  Given,
  Then,
  And
} = require("cypress-cucumber-preprocessor/steps");


let context = {}
Before(() => {
       cy.fixture('cred-user-1').then(function(data) {
           context['config'] = data
            cy.login(data.email, data.password)
        })
})

Given('I open the Trading application', () => {
    const icon = new MainBar()
    icon.tradingClick()
    cy.wait(2000)
})

And('I select searching type {string}', (buttonName) => {
    const button = new TradingSearchPageModel()
    if (buttonName === 'Find sales offers'){
        button.clickFindSalesOfferButton()
    } else if(buttonName === 'Find buying demands'){
        button.clickFindBuyingDemandButton()
    }


    // cy.get('body > div.app__container > xc-app > div.content__wrap > xc-trading > div > xc-trading-page > div > xc-search-page > form > div > xc-table-layout > div > div > xc-abstract-offer-search-row:nth-child(4) > div')
    //     .should('contain.text', 'DUBAI')

})

And('I fill text to the "search location" field: {string}', (text) => {
    const field = new TradingSearchPageModel()
    field.inputSearchLocation(text)

    // cy.get('body > div.app__container > xc-app > div.content__wrap > xc-trading > div > xc-trading-page > div > xc-search-page > form > div > xc-table-layout > div > div > xc-abstract-offer-search-row:nth-child(4) > div')
    //     .should('contain.text', 'DUBAI')

})

And('I fill text to the "container type" field: {string}', (text) => {
    const field = new TradingSearchPageModel()
    field.inputContainerType(text, false)
})

And('I select condition: {string}', (text) => {
    const field = new TradingSearchPageModel()
    field.selectCondition(text)
})

And('I select company: {string}', (text) => {
    const field = new TradingSearchPageModel()
    field.selectCompany(text)
})

And('click Search button', () => {
    const button = new TradingSearchPageModel()
    button.clickSearchButton()
})

Then('{string} search result should contain: {string}', (position, exp_param) => {
    const func = new TradingSearchPageModel()
    if (position === 'none'){
        func.checkEmptySearchResult()
    } else{
        const paramList = exp_param.split('-')
        func.checkSearchResult(paramList)
    }

})

And('click on Search tab', () => {
    const button = new TradingPageModel()
    cy.visit('trading/deal/5553', {failOnStatusCode:false})
    const asd = new TradingDealPageModel()
    // asd.updateOfferPrice(345)
    // asd.updateOffeDailyStorage(23)
    // asd.updateOffeFridays(3)
    // asd.updateOfferQty(2)
    asd.clickButton('Decline negotiation')
    asd.declineReason('Could not agree on terms')

    // button.clickSearchTab()
    // const butto = new TradingSearchPageModel()
    // butto.selectSortBy('Lowest quantity')
    // butto.clickStartNegotiationButton(2)
    // const jjjj = new NegotiationFrame()
    // jjjj.checkbox(false)
    // jjjj.clickButton('Cancel')
})































