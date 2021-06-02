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


Before(() => {
       cy.fixture('cred-user-1').then(function(data) {
            cy.login(data.email, data.password)
        })
})

And('Login as user #{string}', (number) => {
    const action = new MainBar()
    action.logOut()
    if (number === '1'){
        cy.fixture('cred-user-1').then(function (data) {
            cy.login(data.email, data.password)
        })
    }else if (number === '2'){
        cy.fixture('cred-user-2').then(function (data) {
            cy.login(data.email, data.password)
        })
    }
})

And('clear created {string}', (name) => {
    const page = new TradingPageModel()
    if (name === 'SALES OFFERS'){
        page.clickMyOffersTab()
    }else if (name === 'BUYING DEMANDS'){
        page.clickMyDemandsTab()
    }

    cy.wait(2000)
    for (let i=0; i<20; i++) {
        const a = cy.get('body').then(($body) => {
            if ($body.find('button[xctooltip="Inactivate"]').length>0) {

                cy.get('button[xctooltip="Inactivate"]').eq(0).click()
                cy.wait(500)
            } else {
                return
            }
        })
    }
    page.clickSearchTab()


})

Given('I open the Trading application', () => {
    const icon = new MainBar()
    icon.tradingClick()
    cy.wait(4000)
    cy.get('body').then(($body) => {
        if ($body.text().includes('There is currently no')) {
          cy.get('button[class="xc-times-button xc-ripple"]').click()
        }
    })
})

And('I create -{string}-', (button_name) => {
    const button = new TradingPageModel()
    if (button_name === 'New sales offer'){
        button.clickSalesOfferButton()
    }else if (button_name === 'New buying demand'){
        button.clickNewBuyingDemandButton()
    }
    const container = new TradingNewSalesModel()
    container.locationField("DUBAI")
    container.conditionField("Brand new")
    container.typeField("20 Open top")
    container.fromYearField('1990')
    container.toYearField('2020')
    container.nextStepButton(" Next step ")
    container.targetPriceconditionField('100')
    container.quantityField('5')
    container.validForField("1 month")
    container.nextStepButton(" Next step ")
    container.nextStepButton(' Publish buying demand ')
    container.toTradingPageButton()
})

And('I search created BUYING DEMAND', () => {
    const search = new TradingSearchPageModel()
    search.clickFindBuyingDemandButton()
    search.inputSearchLocation('DUBAI')
    search.inputContainerType('20 Open top', false)
    search.selectCondition('Brand new')
    search.selectCompany('xChange')
    search.clickSearchButton()
})

And('I start NEGOTIATION', () => {
    const button = new TradingSearchPageModel()
    cy.wait(1000)
    button.clickStartNegotiationButton()
})

And('I fill in NEGOTIATION fields: {int}, {string}, {string}, {string}', (price_diff, qty, comment, is_created) => {
    const negotiation = new NegotiationFrame()
    negotiation.inputPrice(price_diff)
    negotiation.inputQty(qty)
    negotiation.inputComment(comment)
    negotiation.checkbox(true)
    negotiation.clickButton('Submit')
    cy.wait(2000)
    const dealPage = new TradingDealPageModel()
    dealPage.getOfferId()
})

And('I check {string} company: {string}', (role, company) => {
    cy.contains(role).parents('xc-company-detail-card').should('contain', company)
})

And('Login as user #{string} and open current DEAL', (number) => {
    const action = new MainBar()
    action.logOut()
    if (number === '1'){
        cy.fixture('cred-user-1').then(function (data) {
            cy.login(data.email, data.password)
        })
    }else if (number === '2'){
        cy.fixture('cred-user-2').then(function (data) {
            cy.login(data.email, data.password)
        })
    }
    cy.wait(1000)
    cy.get('@offerId').then(function (id) {
        cy.visit(`trading/deal/${id}`,{failOnStatusCode:false})
    })
})

And('I will update OFFER price on: {int}', (price_diff) => {
    const negotiation = new TradingDealPageModel()
    negotiation.updateOfferPrice(price_diff)
    negotiation.clickButton('Update offer')
})

And('I confirm the offer', (name) => {
    const negotiation = new TradingDealPageModel()
    negotiation.clickButton('Confirm offer')
})

And('I should see the message: {string}', (message) => {
    cy.contains(message)
})

And('I will check offer confirmation data in the chat', () => {
    const negotiation = new TradingDealPageModel()
    negotiation.clickButton('Open Chat')
    negotiation.checkLastMessageAfterUpdate(2)
    cy.get('xc-popup-header > div > button > i').click()
})
