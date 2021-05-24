/// <reference types="cypress" />


class NegotiationFrame{
    inputPrice(text){
        cy.get('input[formcontrolname=price]').clear().type(text)
    }

    inputQty(text){
        cy.get('input[formcontrolname=quantity]').type(text)
    }

    inputComment(text){
        cy.get('textarea[formcontrolname=firstChatMessage]').type(text)
    }

    checkbox(selected=true){
        if (selected){
            cy.get('[formcontrolname=shouldCreateNewOffer]>label>input').should('be.checked')
        } else{
            cy.get('[formcontrolname=shouldCreateNewOffer]>label>div').click().should('not.be.checked')
        }
    }

    clickButton(name){
        cy.xpath(`//span[contains(text(),'${name}')]`).click()
    }
}

export default NegotiationFrame