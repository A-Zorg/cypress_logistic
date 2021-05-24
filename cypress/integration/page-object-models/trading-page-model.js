/// <reference types="cypress" />


class TradingPageModel {

    clickSalesOfferButton(){
        cy.get("xc-button[data-test-id='add-sales-offer'][angularticsaction='New sales offer']>button")
            .should('have.text', ' New sales offer ')
            .click()
    }

    clickNewBuyingDemandButton(){
        // "xc-button[data-test-id='add-sales-offer'][angularticsaction='New sales offer']>button"
        cy.get('[angularticsaction="New buying demand"]')
            .should('have.text', ' New buying demand ')
            .click()
    }

    clickSearchTab(){
        cy.url().should('include', 'trading/search')
        cy.get('nav > xc-menu > a:nth-child(1)')
            .should('have.text', ' Search ')
            .click()
        cy.get('nav > xc-menu > a:nth-child(1)')
            .should('have.class', 'active')
    }

    clickMyOffersTab(){
        cy.url().should('include', 'trading/my-offers')
        cy.get('nav > xc-menu > a:nth-child(2)')
            .should('have.text', ' My Offers ')
            .click()
        cy.get('nav > xc-menu > a:nth-child(2)')
            .should('have.class', 'active')
    }

    clickMyDemandsTab(){
        cy.url().should('include', 'trading/my-demands')
        cy.get('nav > xc-menu > a:nth-child(3)')
            .should('have.text', ' My demands ')
            .click()
        cy.get('nav > xc-menu > a:nth-child(3)')
            .should('have.class', 'active')
    }

    clickInboxTab(){
        cy.url().should('include', 'trading/my-inbox')
        cy.get('nav > xc-menu > a:nth-child(4)')
            .should('contain', 'Inbox')
            .click()
        cy.get('nav > xc-menu > a:nth-child(4)')
            .should('have.class', 'active')
    }

}

export default TradingPageModel