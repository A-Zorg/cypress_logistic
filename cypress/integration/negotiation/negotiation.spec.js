/// <reference types="cypress" />

import MainBar from "../page-object-models/main-bar.model";
import TradingSearchPageModel from "../page-object-models/trading-search-page-model";
import NegotiationFrame from "../page-object-models/negotiation-frame.model";
import TradingOfferPageModel from "../page-object-models/trading-offer-page-model";
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
})

Given('I search OFFER with the possibility of negotiations', () => {
    const search_page = new TradingSearchPageModel()
    cy.wait(2000)
    search_page.selectSortBy('Lowest quantity')
    search_page.clickViewDetailsButton()
    const offer = new TradingOfferPageModel()
    offer.clickButton('START NEGOTIATION')
})

And('I fill in NEGOTIATION fields: {int}, {string}, {string}, {string}', (price_diff, qty, comment, is_created) => {
    const negotiation = new NegotiationFrame()
    cy.wait(2000)
    negotiation.inputPrice(price_diff)
    negotiation.inputQty(qty)
    negotiation.inputComment(comment)
    negotiation.checkbox(true)
    negotiation.clickButton('Submit')
})