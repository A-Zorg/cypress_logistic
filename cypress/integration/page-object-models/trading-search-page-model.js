import {lastUpdate} from "../toolz/tools";

class TradingSearchPageModel{

    clickButton(name){
        cy.xpath(`//button/span[contains(text(),'${name}')]`).click()
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

        // if (clear === true){
        //     cy.get('div.xc-trading-search__equipment-type-input > ng-select > div > span.ng-clear-wrapper').click()
        // }
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

    selectAlienCompany(myCompany){
        cy.get('#select-company > div > span').click()
        cy.get('div[role="option"]>span').then(function (rows) {
            for (let row of rows){
                if (!['Any company', `${myCompany}`].includes(row.textContent)){
                    cy.wrap(row).click()
                    break
                }
            }
        })
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

    selectSortBy(text){
        cy.get('div.xc-search-page__sort > div > ng-select > div > span').click()
        cy.xpath(`//body/ng-dropdown-panel/div/div/div/span[contains(text(),'${text}')]`)
            .scrollIntoView()
            .should('be.visible')
            .click()
    }

    clickStartNegotiationButton(button_number=1){
        // cy.contains('Start negotiation').first().click()
        cy.get(`xc-abstract-offer-search-row:nth-child(${3+button_number})>div>div>div>div>div>xc-button>button`)
            .should('contain', 'Start negotiation')
            .click()
    }

    clickViewDetailsButton(button_number=1){
        const selector = '//span[contains(text(),\'View details\')]'
        cy.xpath(selector).eq(0).parents('a').should('have.attr', 'href').then(function (href) {
            // cy.xpath(y).click()
            cy.get(`a[href='${href}']`).click()
            cy.url().should('include', href)
        })
    }
//------------------------------------search entity START---------------------------------------
    getSeachEntityRows(){
        const selector = ` xc-abstract-offer-search-row`
        return cy.get(selector).its('length').then(function (lenght) {
            cy.wrap(lenght).as('searchRows')
        })
    }
    getSeachEntity(row_number=1){
        const selector = ` xc-abstract-offer-search-row:nth-child(${3+row_number})`
        return cy.get(selector)
    }

    getSeachEntityPrice(row_number=1){
        const row = this.getSeachEntity(row_number)
        row.find('div[class="xc-abstract-offer-search-row__price"]').invoke('text').as('price')
    }
    getSeachEntityLocation(row_number=1){
        const row = this.getSeachEntity(row_number)
        row.find('xc-location-chip').invoke('text').as('location')
    }
    getSeachEntityQty(row_number=1){
        const row = this.getSeachEntity(row_number)
        row.find('div.equipment-type-condition__count').invoke('text').as('qty')
    }
    getSeachEntityType(row_number=1){
        const row = this.getSeachEntity(row_number)
        row.find('span[data-test-id="equipment-type-condition-type"]').invoke('text').as('type')
    }
    getSeachEntityCondition(row_number=1){
        const row = this.getSeachEntity(row_number)
        row.find('span[data-test-id="equipment-type-condition-condition"]').invoke('text').as('condition')
    }
    getSeachEntityYears(row_number=1){
        const row = this.getSeachEntity(row_number)
        row.find('div[class="xc-abstract-offer-search-row__yom ng-star-inserted"]').invoke('text').as('yom')
    }
    clickSeachEntityButton(buttonName, row_number=1){
        const row = this.getSeachEntity(row_number)
        row.find(`button:contains("${buttonName}")`).click()
    }
    getSeachEntityCompany(row_number=1){
        const row = this.getSeachEntity(row_number)
        const company = row.find('a[class="xc-abstract-offer-search-row__company-name"]').then(function (refer) {
            cy.wrap(refer.text()).as('companyName')
            cy.wrap(refer.attr('href')).as('companyUrl')
        })

    }
    getSeachEntityUpdated(row_number=1){
        const row = this.getSeachEntity(row_number)
        row.find('div.xc-abstract-offer-search-row__timer>p').invoke('text').then(function (text) {
            cy.log(text)
            const result = lastUpdate(text)
            cy.wrap(result).as('lastUpdate')
        })
    }

//------------------------------------search entity END---------------------------------------
}

export default TradingSearchPageModel