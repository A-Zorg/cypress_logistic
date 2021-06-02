
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
        cy.get('nav > xc-menu > a:nth-child(1)')
            .should('have.text', ' Search ')
            .click()
        cy.get('nav > xc-menu > a:nth-child(1)')
            .should('have.class', 'active')
        cy.url().should('include', 'trading/search')

        cy.wait(3000)
        cy.get('body').then(($body) => {
            if ($body.text().includes('There is currently no')) {
              cy.get('button[class="xc-times-button xc-ripple"]').click()
            }
         })
    }

    clickMyOffersTab(){
        cy.get('nav > xc-menu > a:nth-child(2)')
            .should('have.text', ' My Offers ')
            .click()
        cy.get('nav > xc-menu > a:nth-child(2)')
            .should('have.class', 'active')
        cy.url().should('include', 'trading/my-offers')
    }

    clickMyDemandsTab(){
        cy.get('nav > xc-menu > a:nth-child(3)')
            .should('have.text', ' My demands ')
            .click()
        cy.get('nav > xc-menu > a:nth-child(3)')
            .should('have.class', 'active')
        cy.url().should('include', 'trading/my-demands')
    }

    clickInboxTab(){
        cy.get('nav > xc-menu > a:nth-child(4)')
            .should('contain', 'Inbox')
            .click()
        cy.get('nav > xc-menu > a:nth-child(4)')
            .should('have.class', 'active')
        cy.url().should('include', 'trading/my-inbox')
    }

}

export default TradingPageModel