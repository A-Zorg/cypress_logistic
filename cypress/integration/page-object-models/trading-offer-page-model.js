/// <reference types="cypress" />

class TradingOfferPageModel {

     clickButton(name){
        cy.xpath(`//span[contains(text(),'${name}')]`).click()
    }

    getOfferInfo(){
         const element_list = new Object()
        cy.get("div.abstract-offer-details > div:nth-child(2) > xc-tile > div").invoke('text').then(function (text) {
            element_list['location'] = text
         })
        cy.get("div:nth-child(3) > xc-tile > div").invoke('text').then(function (text) {
            const regex = / (.*) x (.*) \/ (.*) /
            const result = regex.exec(text)
            element_list['qty'] = result[1]
            element_list['type'] = result[2]
            element_list['condition'] = result[3]
         })

        cy.get("div:nth-child(4) > xc-tile > div").invoke('text').then(function (text) {
            const regex = / (.*) /
            const result = regex.exec(text)
            element_list['years'] = result[1]
         })
        cy.get("div.flex.ng-star-inserted > xc-tile > div").invoke('text').then(function (text) {
            element_list['price'] = text
         })
        cy.wrap(element_list).as('offerElList')
        // return element_list
    }


}

export default TradingOfferPageModel