import MainBar from "../page-object-models/main-bar.model";
import TradingSearchPageModel from "../page-object-models/trading-search-page-model";
import NegotiationFrame from "../page-object-models/negotiation-frame.model";
import TradingOfferPageModel from "../page-object-models/trading-offer-page-model";
import TradingDealPageModel from "../page-object-models/trading-deal-page-model";
import TradingInboxPageModel from "../page-object-models/trading-inbox-page-model";
import PickupReferenceFrameModel from "../page-object-models/pickup_reference-frame.model";
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
})

Given('I search {string} with the possibility of negotiations', (type_search) => {
    const search_page = new TradingSearchPageModel()
    if (type_search === 'OFFER'){
        search_page.clickFindSalesOfferButton()
    } else if (type_search === 'DEMAND'){
        search_page.clickFindBuyingDemandButton()
    }
    search_page.selectSortBy('Highest quantity')
    cy.wait(2000)
    search_page.clickViewDetailsButton()

    const offer = new TradingOfferPageModel()
    offer.getOfferInfo()
    offer.clickButton('START NEGOTIATION')
})

And('I fill in NEGOTIATION fields: {int}, {string}, {string}, {string}', (price_diff, qty, comment, is_created) => {
    const negotiation = new NegotiationFrame()
    negotiation.inputPrice(price_diff)
    negotiation.inputQty(qty)
    negotiation.inputComment(comment)
    negotiation.checkbox(true)
    negotiation.clickButton('Submit')
})

And('I will update OFFER conditions: {int}, {int}, {int}, {float}, {string}', (price_diff, qty, freedays, daily_storage, handling) => {
    const negotiation = new TradingDealPageModel()
    negotiation.updateOfferPrice(price_diff)
    negotiation.updateOfferQty(qty)
    negotiation.updateOffeDailyStorage(daily_storage)
    negotiation.updateOfferFridays(freedays)
    negotiation.paymentHandlingCheckbox(handling)
    negotiation.clickButton('Update offer')
})

And('I should see the message: {string}', (message) => {
    cy.contains(message)
})

And('I will check the message about UPDATE in the chat', () => {
    const negotiation = new TradingDealPageModel()
    negotiation.clickButton('Open Chat')
    negotiation.checkLastMessageAfterUpdate()
    negotiation.getOfferId()
})


And('I will check the created negotiation in the INBOX', () => {
    cy.visit('trading/my-inbox/', {failOnStatusCode:false})
    const negotiation = new TradingInboxPageModel()
    negotiation.clickInboxTab('Negotiation')
    negotiation.checkNegotiationParam()
})

And('Delete created negotiation', () => {
    const negotiation = new TradingDealPageModel()
    negotiation.clickButton('Negotiation')
    negotiation.clickButton('Decline negotiation')
    negotiation.declineReason('Found better offer')
    // negotiation.clickButton('Decline negotiation')
})

And('clean inbox', () => {
    cy.visit('trading/my-inbox/', {failOnStatusCode:false})
    const negotiation1 = new TradingInboxPageModel()
    negotiation1.clickInboxTab('Negotiation')
    cy.xpath(`//span[contains(text(),'View details')]`).eq(0).click()
    const negotiation = new TradingDealPageModel()
    negotiation.clickButton('Decline negotiation')
    negotiation.declineReason('Found better offer')

})


And('I write message {string} in the chat', (message) => {
    const negotiation = new TradingDealPageModel()
    negotiation.clickButton('Open Chat')
    negotiation.writeMessage(message)
    negotiation.checkLastMessage(message)
    // negotiation.clickButton('Decline negotiation')
})

And('I check message {string} in the chat', (message) => {
    const negotiation = new TradingDealPageModel()
    negotiation.checkLastMessage(message)
    cy.get('xc-popup-header > div > button > i').click()
})

And('I upload some files to the negotiation: {string} and {string}', (namePath1, namePath2) => {
    const negotiation = new TradingDealPageModel()
    negotiation.seeDocuments()

    negotiation.clickButton('Upload files')
    negotiation.uploadFile(namePath1)
    negotiation.clickButton('Submit')

    negotiation.clickButton('Upload files')
    negotiation.uploadFile(namePath2)
    negotiation.clickButton('Submit')
})

And('I check that files were created: {string} and {string}', (namePath1, namePath2) => {
    cy.get('xc-accordion').should('contain', namePath1)
    cy.get('xc-accordion').should('contain', namePath2)
})

And('I delete uploaded files', (namePath1, namePath2) => {
    const negotiation = new TradingDealPageModel()
    negotiation.deleteFile()
    negotiation.clickButton('Delete now')
    cy.wait(1000)
    negotiation.deleteFile()
    negotiation.clickButton('Delete now')
})

And('I select the member on the DEAL page: {string}', (name) => {
    const negotiation = new TradingDealPageModel()
    negotiation.clickButton('Impersonate')
    negotiation.selectMember(name)
})

And('I confirm the offer', (name) => {
    const negotiation = new TradingDealPageModel()
    negotiation.clickButton('Confirm offer')
})

And('I should see message that seller {string}', (text) => {
    cy.get('div:nth-child(2) > div > span').should('contain', text)
})

And('I will check offer confirmation data in the chat', () => {
    const negotiation = new TradingDealPageModel()
    negotiation.clickButton('Open Chat')
    negotiation.checkLastMessageAfterUpdate(2)
    cy.get('xc-popup-header > div > button > i').click()

})

And('I add some pick-up references:', (dataTable) => {
    const negotiation = new TradingDealPageModel()
    negotiation.clickButton('Pick-up')
    const reference = new PickupReferenceFrameModel()
    context = new Object()
    dataTable.hashes().forEach(elem => {
        negotiation.clickButton('Add more pickup references')
        reference.releaseReferenceField(elem.ref_name)
        reference.dateField(elem.datum)
        reference.quantiyiField(elem.qty)
        reference.selectDepotField(2)
        reference.additionalHandlingInfoField(elem.comment)
        reference.clickButton(' Add pick-up reference ')
        context[elem.ref_name] = elem.qty
      })

    cy.wrap(context).as('context')
})

And('I add containers to the created pick up references', ()=> {
    const negotiation = new TradingDealPageModel()
    negotiation.clickButton('Pick-up')
    cy.get('@context').then(function (context) {
        const negotiation = new TradingDealPageModel()
        for (const name in context){
            negotiation.checkInfoPickupReference(name, 'All picked up', false)
            for (let i=0; i<context[name]; i++){
                negotiation.addContainerForReference(name, `ABCD123456${i}`, `1${i}.05.2021`)
            }
            negotiation.checkInfoPickupReference(name, 'All picked up', )
            negotiation.getReferenceByName(name).find('span:contains("Click to show container")').click()
        }
    })
})


And('I delete all containers and references', ()=> {
    const negotiation = new TradingDealPageModel()
    negotiation.clickButton('Pick-up')
    cy.get('@context').then(function (context) {
        const negotiation = new TradingDealPageModel()

        for (const name in context){
            negotiation.removeContainers(name, context[name])
            negotiation.removeReference(name)
        }
    })
})

And('I confirm the pick up references', ()=> {
    cy.get('@context').then(function (context) {
        const negotiation = new TradingDealPageModel()

        for (const name in context){
            const negotiation = new TradingDealPageModel()
            negotiation.clickButton('Confirm Release Reference')
            negotiation.confirmRelease(name)
        }
    })
})

And('I will check message about pick up reference in the chat', () => {
    const negotiation = new TradingDealPageModel()
    negotiation.clickButton('Open Chat')
    cy.get('@context').then(function (context) {
        let qty = Object.keys(context).length
        for (const name in context){
            negotiation.checkLastMessage(`Pick-up reference for ${context[name]} Containers provided: ${name}`, qty)
            qty = qty-1
        }
    })
    cy.get('xc-popup-header > div > button > i').click()
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