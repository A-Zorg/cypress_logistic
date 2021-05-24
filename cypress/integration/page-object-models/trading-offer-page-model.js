/// <reference types="cypress" />

class TradingOfferPageModel {

     clickButton(name){
        cy.xpath(`//span[contains(text(),'${name}')]`).click()
    }
}

export default TradingOfferPageModel