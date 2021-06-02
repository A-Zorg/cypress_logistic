/// <reference types="cypress" />

class TradingDealPageModel{

    updateOfferPrice(difference){
        cy.get('div:nth-child(1)>xc-negotiation-form')
            .find(`input[formcontrolname="price"]`)
            .invoke('val')
            .then(function (price) {
                const newPrice = parseFloat(price) + difference
                cy.get('div:nth-child(1)>xc-negotiation-form')
                    .find(`input[formcontrolname="price"]`)
                    .clear().type(newPrice)
                })
    }

    updateOfferQty(text){
        cy.get('div:nth-child(1)>xc-negotiation-form').find(`input[formcontrolname="quantity"]`).clear().type(text)

    }

    updateOfferFridays(text){
        cy.get('div:nth-child(1)>xc-negotiation-form').find(`input[formcontrolname="freedays"]`).clear().type(text)

    }

     updateOffeDailyStorage(text){
        cy.get('div:nth-child(1)>xc-negotiation-form').find(`input[formcontrolname="dailyStorageCharge"]`).clear().type(text)

    }

    containValidator(text, should=true){
        if (should){
            cy.get('div:nth-child(1)>xc-negotiation-form').should('contain',text)
        } else{
            cy.get('div:nth-child(1)>xc-negotiation-form').should('not.contain',text)
        }
    }

    paymentHandlingCheckbox(should='true'){
        if (should === 'true'){
            cy.get('div:nth-child(1)>xc-negotiation-form')
                .find('xc-toggle[formcontrolname="paymentHandling"]>label>input')
                .should('be.checked')
        } else if (should === 'false'){
            cy.get('div:nth-child(1)>xc-negotiation-form')
                .find('xc-toggle[formcontrolname="paymentHandling"]>label>div')
                .click()
                .should('not.be.checked')
        }
    }

    uploadFile(fileName){
        const nameFormatList = fileName.split('.')
        const mimeTypes = {
            'jpg': 'image/jpg',
            'png': 'image/png',
            'pdf': 'application/pdf',
        }
        cy.xpath('//div[contains(text(),\'Documents\')]').should('have.text','Documents')
        cy.fixture(fileName).then(fileContent => {
            cy.get('input[type=file]').attachFile({
                fileContent: fileContent.toString(),
                fileName: fileName,
                mimeType: mimeTypes[nameFormatList[-1]]
            })
        })
    }

    deleteFile(){
        cy.get("xc-button[data-test-id='button-cell-two']>button>i").eq(0).click()
    }

    seeDocuments(){
        cy.get('xc-accordion-item:nth-child(1)>div>div>div ').should('contain', 'Documents').click()
    }

    seeAdditionalInformation(){
        cy.get('xc-accordion-item:nth-child(2)>div>div>div ').should('contain', 'Additional information')
    }

    checkLastMessage(message, number=1){
            cy.get('xc-chat-message>div>div>div>div.xc-chat-message__message')
                .eq(-1*number)
                .scrollIntoView()
                .should('contain', message)
    }

    checkLastMessageAfterUpdate(column=1){
        const func = this.checkLastMessage
        const fields_list = ['quantity','dailyStorageCharge','price','freedays']
        for (let field of fields_list) {
            cy.get(`div:nth-child(${column})>xc-negotiation-form`)
                .find(`input[formcontrolname="${field}"]`)
                .invoke('val')
                .then(function (value) {
                    cy.wrap(value).as(field)
                    func(value)
                })
        }

        cy.get(`div:nth-child(${column})>xc-negotiation-form`)
                .find('xc-toggle[formcontrolname="paymentHandling"]>label:nth-child(2)')
                .invoke('text')
                .then(function (value) {
                    if (value === 'On'){
                        func('Active')
                    } else {
                        func('Inactive')
                    }
                })
    }

    writeMessage(message){
        cy.get('div.chat-input').clear().type(message)
        cy.get('div.send>xc-button>button').click()

    }

    markAs(text){
        const name = cy.get("//xc-button[contains(@type, 'special')]/button/span[contains(text(),'Mark as')]").text()
        if (text !== name){
            cy.get("//xc-button[contains(@type, 'special')]/button/span[contains(text(),'Mark as')]").click()
        }
    }

    writeComment(text){
        cy.get(' textarea[formcontrolname="message"]').clear().type(text)
    }

    deleteComment(text){
        const number = cy.get('xc-icon-button[type="tertiary"]').its('length')
        for (let i = 0; i < number; i++) {
            if (cy.get('xc-icon-button[type="tertiary"]').eq(i).text() ===text){
                cy.get('xc-icon-button[type="tertiary"]').click()
            }
        }
    }

    selectMember(member){
        cy.get('select[formcontrolname="member"]').select(member)
       // / cy.xpath(`//option[contains(text(),'${member}')]`).scrollIntoView().click()
        cy.get('div.xc-modal__footer> div>xc-button:nth-child(2)>button>span').click()

    }


    declineReason(text){
        cy.xpath(`//span[contains(text(),'${text}')]`).click()
        cy.get('div.xc-modal__footer > div > xc-button:nth-child(2) > button > span').click()
    }

    clickButton(name){
        cy.xpath(`//button/span[contains(text(),'${name}')]`).click()
    }


    getOfferId(){
        cy.url().then(function (url) {
            const regex = /\/([0-9]*)$/
            const result = regex.exec(url)
            console.log(result)
            cy.wrap(result[1]).as('offerId')
        })
    }

    getReferenceByName(name){
        const reference = cy.xpath(`//tbody//span[contains(text(),'${name}')]`).parents('tbody')
        return reference
    }

    checkInfoPickupReference(name, text, exist=true){
        const reference = this.getReferenceByName(name)
        if (exist){
            reference.should('contain', text)
        } else {
            reference.should('not.contain', text)
        }
    }

    addContainerForReference(name, container, datum){
        const reference = this.getReferenceByName(name)
        reference.find('input[formcontrolname=containerNumber]').clear().type(container)

        const date = this.getReferenceByName(name)
        date.find('xc-date-input > div > div').clear().type(datum)

        const button = this.getReferenceByName(name)
        button.find('span:contains(" Add as picked-up ")').click()
    }

    removeContainers(name, qty){
        for (let i=0; i<qty; i++){
            const reference = this.getReferenceByName(name)
            reference.find('span:contains("Remove")').eq(0).click()
            this.clickButton('Remove picked up container')
            cy.wait(1000)
        }
    }

    removeReference(name){
        const reference = this.getReferenceByName(name)
        reference.find('span:contains("Remove")').eq(0).click()
        this.clickButton('Remove release reference')
    }

    confirmRelease(name){
        cy.get('div > form > ng-select > div > div > div.ng-input > input[type=text]').type(name).type('{enter}')
        cy.get('div.xc-modal__footer > div > xc-button:nth-child(2) > button').click()

    }

}

export default TradingDealPageModel