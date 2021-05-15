/// <reference types="cypress" />


class tradingPageModel {

    clickSalesOfferButton(){
        cy.get('[angularticsaction="New sales offer"]')
            .should('have.text', ' New sales offer ')
            .click()
    }
    clickNewBuyingButton(){
        cy.get('[angularticsaction="New buying demand"]')
            .should('have.text', ' New buying demand ')
            .click()
    }
}

export default tradingPageModel