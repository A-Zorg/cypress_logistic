import MainBar from "../page-object-models/main-bar.model";
import TradingNewSalesModel from "../page-object-models/trading-new-sales-model";
import TradingPageModel from "../page-object-models/trading-page-model";
import TradingSearchPageModel from "../page-object-models/trading-search-page-model";
import NegotiationFrame from "../page-object-models/negotiation-frame.model";
import TradingDealPageModel from "../page-object-models/trading-deal-page-model";
import {clickButton, isElementPresent} from "../page-object-models/general-function";

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

And('get data', () => {
    const searchEntity = new TradingSearchPageModel()
    searchEntity.getSeachEntityUpdated(1)
    cy.get('@lastUpdate').then(function (price) {
        cy.log(price)
    })
})

And('I sort by {string} {string}', (firstPart, secondPart) => {
    const searchEntity = new TradingSearchPageModel()
    let sort_type
    if (firstPart === 'null'){
         sort_type = secondPart
    } else {
         sort_type = firstPart + ' ' + secondPart
    }
    searchEntity.selectSortBy(sort_type)
    cy.wait(1000)
})

And('I check sorting by {string} quantity', (sort_type) => {
    const searchEntity = new TradingSearchPageModel()
    searchEntity.getSeachEntityRows()
    cy.get('@searchRows').then(function (rows) {
        for (let i=1; i<rows; i++){
            searchEntity.getSeachEntityQty(i)

            cy.get('@qty').then(function (qty1) {
                const firstQty = Number(qty1)
                searchEntity.getSeachEntityQty(i+1)

                cy.get('@qty').then(function (qty2) {
                    const secondQty = Number(qty2)
                    cy.log(firstQty)
                    cy.log(secondQty)
                    if (sort_type === 'Lowest price'){
                        expect(firstQty<=secondQty).to.be.true
                    } else if (sort_type === 'Highest price'){
                        expect(firstQty>=secondQty).to.be.true
                    }
                })

            })
        }
    })
})

And('I check sorting by {string} price', (sort_type) => {
    const searchEntity = new TradingSearchPageModel()
    searchEntity.getSeachEntityRows()
    cy.get('@searchRows').then(function (rows) {
        for (let i=1; i<rows; i++){
            searchEntity.getSeachEntityPrice(i)

            cy.get('@price').then(function (price1) {
                const firstPrice = Number(price1.slice(2).replace(',',''))
                searchEntity.getSeachEntityPrice(i+1)

                cy.get('@price').then(function (price2) {
                    const secondPrice = Number(price2.slice(2).replace(',',''))
                    if (sort_type === 'Lowest'){
                        expect(firstPrice<=secondPrice).to.be.true
                    } else if (sort_type === 'Highest'){
                        expect(firstPrice>=secondPrice).to.be.true
                    }
                })

            })
        }
    })
})

And('I check sorting by {string} Newest', (sort_type) => {
    const searchEntity = new TradingSearchPageModel()
    searchEntity.getSeachEntityRows()
    cy.get('@searchRows').then(function (rows) {
        for (let i=1; i<rows; i++){
            cy.wait(2000)
            searchEntity.getSeachEntityUpdated(i)

            cy.get('@lastUpdate').then(function (update1) {
                searchEntity.getSeachEntityUpdated(i+1)

                cy.get('@lastUpdate').then(function (update2) {
                    cy.log(update1)
                    cy.log(update2)
                    expect(update1<=update2).to.be.true

                })

            })
        }
    })
})

And('I click {string} button', (button_name) => {
    cy.wait(1000)
    const selector = `span:contains("${button_name}")`
    isElementPresent(selector)

    cy.get('@isElement').then(function (presence) {
        if (presence){
            const searchEntity = new TradingSearchPageModel()
            searchEntity.getSeachEntityRows()
            clickButton(button_name)
            cy.wait(1000)
         }
    })

})

And('I compare qty of the rows before and after clicking {string}', (button_name) => {
    cy.get('@isElement').then(function (presence) {
        if (presence) {
            cy.get('@searchRows').then(function (rows_before) {
                const searchEntity = new TradingSearchPageModel()
                searchEntity.getSeachEntityRows()
                cy.get('@searchRows').then(function (rows_after) {
                    expect(rows_before < rows_after).to.be.true
                })
            })
        }
    })
})


























