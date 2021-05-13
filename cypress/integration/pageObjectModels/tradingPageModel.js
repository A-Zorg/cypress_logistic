/// <reference types="cypress" />


class tradingPageModel {

    clickSalesOfferButton(){
        cy.get('[angularticsaction="New sales offer"]').should('have.text', ' New sales offer ').click()
    }
}

export default tradingPageModel