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

    clickSearchButton(){
        cy.get('div.xc-trading-search__search-bar > xc-button > button')
            .should('have.text', ' Search ')
            .click()
    }

    clickFindSalesOfferButton(){
        cy.get('xc-nav-tabs > a:nth-child(2)').click()
        cy.get('xc-nav-tabs > a:nth-child(1)')
            .should('not.have.class', 'active')
            .click()
            .should('have.class', 'active').should('contain', ' sales offers')
    }
    clickFindBuyingDemandButton(){
        cy.get('xc-nav-tabs > a:nth-child(1)').click()
        cy.get('xc-nav-tabs > a:nth-child(2)')
            .should('not.have.class', 'active')
            .click()
            .should('have.class', 'active').should('contain', ' buying demands')
    }
    inputSearchLocation(text, clear=false){
        cy.get('#input-pickup > div > div > div.ng-placeholder').should('contain', 'Search for one or more locations')
        cy.get('#input-pickup > div > div > div.ng-input > input[type=text]').type(text)
        cy.get('div > div.scrollable-content>div:nth-child(1)')
            .should('contain', text.toUpperCase())
            .click()

        if (clear === true){
            cy.get('#input-pickup > div > span[class=ng-clear-wrapper]').click()
        }
        cy.get('#input-pickup > div > span[class=ng-arrow-wrapper]').click()
    }
    inputContainerType(text, clear=false){
        cy.get('div.xc-trading-search__equipment-type-input > ng-select > div > div > div.ng-placeholder').should('contain', 'All container types')
        cy.get('div.xc-trading-search__equipment-type-input > ng-select > div > div > div.ng-input > input[type=text]').type(text)
        cy.get(' div > div.scrollable-content>div:nth-child(2)')
            .should('contain', text)
            .click()

        if (clear === true){
            cy.get('div.xc-trading-search__equipment-type-input > ng-select > div > span.ng-clear-wrapper').click()
        }
    }

    selectCondition(text){
        cy.get('#select-unit-condition > div > span').click()
        cy.xpath(`//ng-dropdown-panel/div/div/div/span[contains(text(),'${text}')]`).click()
    }

    selectCompany(text){
        cy.get('#select-company > div > span').click()
        cy.wait(4000)
        cy.xpath(`//ng-dropdown-panel/div/div/div/span[contains(text(),'${text}')]`).scrollIntoView().should('be.visible').click()
    }

    checkSearchResult(textList){
        const result = cy.get('xc-abstract-offer-search-row:nth-child(4) > div')
        for (let parameter of textList){
            result.should('contain', parameter)
        }
    }

    checkEmptySearchResult(){
        const result = cy.get('xc-modal-container > div > div > div > div').should('contain', 'available that is matching your search')
    }

}

export default tradingPageModel