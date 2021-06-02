/// <reference types="cypress" />

class TradingInboxPageModel{
    clickInboxTab(name){
        cy.xpath(`//xc-nav-tabs/a[contains(text(),'${name}')]`).click()
    }

    clickOffersViewButton(id){
        const selector = `xc-link-cell>[href='/trading/deal/${id}']`
        cy.get(selector).find('button').click()
    }

    checkNegotiationParam() {

        cy.get('@offerId').then(function (id) {
            const selector = `xc-link-cell>[href='/trading/deal/${id}']`
            cy.get('@offerElList').then(function (offerParamList) {
                cy.get(selector).parents('tbody').should('contain', offerParamList['location'])
                cy.get(selector).parents('tbody').should('contain', offerParamList['type'])
                cy.get(selector).parents('tbody').should('contain', offerParamList['condition'])

            })
            cy.get(selector).parents('tbody').find('button').click()

        })
    }

}

export default TradingInboxPageModel