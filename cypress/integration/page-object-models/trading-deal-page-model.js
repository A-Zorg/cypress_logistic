/// <reference types="cypress" />

class TradingDealPageModel{

    updateOfferPrice(text){
        cy.get('div:nth-child(1)>xc-negotiation-form').find(`input[formcontrolname="price"]`).clear().type(text)

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

    paymentHandlingCheckboxr(should=true){
        if (should){
            cy.get('div:nth-child(1)>xc-negotiation-form')
                .find('xc-toggle[formcontrolname="paymentHandling"]>label>div')
                .should('be.checked')
        } else{
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
        cy.get('xc-accordion-item:nth-child(1)>div>div>div ').should('contain', 'Documents')
    }

    seeAdditionalInformation(){
        cy.get('xc-accordion-item:nth-child(2)>div>div>div ').should('contain', 'Documents')
    }

    checkLastMessage(message){
        const message_parts = message.split(' ')
        for (let part of message_parts){
            cy.get('xc-chat-message>div>div>div>div.xc-chat-message__message')
                .eq(-1)
                .scrollIntoView()
                .should('contain', part)
        }
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
        cy.get('select[formcontrolname="member"]').click()
        cy.xpath(`//option[contains(text(),'${member}')]`).scrollIntoView().click()
    }


    declineReason(text){
        cy.xpath(`//span[contains(text(),'${text}')]`).click()
    }

    clickButton(name){
        cy.xpath(`//span[contains(text(),'${name}')]`).click()
    }

}

export default TradingDealPageModel