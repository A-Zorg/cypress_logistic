/// <reference types="cypress" />


class NegotiationFrame{
    inputPrice(difference){
        cy.get('input[formcontrolname=price]').invoke('val').then(function (price) {
            const newPrice = parseFloat(price) + difference
            cy.get('input[formcontrolname=price]').clear().type(newPrice)
        })

    }

    inputQty(text){
        cy.get('input[formcontrolname=quantity]').clear().type(text)
    }

    inputComment(text){
        cy.get('textarea[formcontrolname=firstChatMessage]').clear().type(text)
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