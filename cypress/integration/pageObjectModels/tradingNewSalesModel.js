/// <reference types="cypress" />

class tradingNewSalesModel {

    locationField(value){
          cy.get('div.form-single-input > xc-input-wrap > div > label > span').should('have.text','Location')
          cy.get('div.form-single-input > xc-input-wrap > div > div > ng-select > div > div > div.ng-input > input[type=text]')
            .type(value).type('{enter}')

    }
    typeField(value){
        cy.get('div.form-multi-input > div:nth-child(1) > xc-input-wrap > div > label > span').should('have.text','Type')
          cy.get('div:nth-child(1) > xc-input-wrap > div > div > ng-select > div > div > div.ng-input > input[type=text]')
            .type(value).type('{enter}')
    }
    conditionField(value){
        cy.get('div.form-multi-input > div:nth-child(2) > xc-input-wrap > div > label > span').should('have.text','Condition')
          cy.get('div.form-multi-input > div:nth-child(2) > xc-input-wrap > div > div > ng-select > div > div > div.ng-input > input[type=text]')
            .type(value).type('{enter}')
    }
    fromYearField(value){
        cy.get('div.form-yom-input > div:nth-child(1) > xc-input-wrap > div > label > span').should('have.text','From (optional)')
          cy.get('[formcontrolname="yearOfManufactureRangeFrom"]')
            .type(value).type('{enter}')
    }
    toYearField(value){
        cy.get('div.form-yom-input > div:nth-child(2) > xc-input-wrap > div > label > span').should('have.text','To (optional)')
          cy.get('[formcontrolname="yearOfManufactureRangeTo"]')
            .type(value).type('{enter}')
    }

    targetPriceconditionField(value){
        cy.get('xc-input-group > div > label').should('have.text','Target price')
          cy.get('input[formcontrolname=price]')
            .type(value)
    }
    quantityField(value){
        cy.get('div:nth-child(2) > xc-input-wrap > div > label > span').should('have.text','Quantity')
          cy.get('input[formcontrolname=quantity]')
            .type(value)
    }
    validForField(value){
        cy.get('div:nth-child(3) > xc-input-wrap > div > label > span').should('have.text','Valid for')
        cy.get("xc-input-wrap > div > div > ng-select > div > span").click()
        cy.xpath(`//span[contains(text(),'${value}')]`)
            .click()
    }

    commentField(value){
        cy.xpath('//span[contains(text(),\'Comment\')]').should('have.text','Comment')
        cy.get("[formcontrolname=comments]").type(value).type('{enter}')
    }

    fileField(fileName){
        const nameFormatList = fileName.split('.')
        const mimeTypes = {
            'jpg': 'image/jpg',
            'png': 'image/png',
        }
        cy.xpath('//h3[contains(text(),\'Documents\')]').should('have.text','Documents')
        cy.fixture(fileName).then(fileContent => {
            cy.get('input[type=file]').attachFile({
                fileContent: fileContent.toString(),
                fileName: fileName,
                mimeType: mimeTypes[nameFormatList[-1]]
            })
        })
    }

    successCreationCheck(price, location, qty, sale_type, condition, yearsInterval, text){
        cy.get('xc-create-abstract-offer-success > div > xc-abstract-offer-search-row > div > div > div > div:nth-child(1) > div.xc-abstract-offer-search-row__price')
            .should('have.text',` $${price} `)
        cy.get('#cdk-overlay-0 > xc-abstract-offer-step-modal-new > xc-popup-fullscreen > div > xc-popup-content > div > xc-create-abstract-offer-success > div > xc-abstract-offer-search-row > div > div > div > div:nth-child(2) > xc-location-chip')
            .should('have.text',location)
        cy.get(`div.equipment-type-condition__count.ng-star-inserted`)
            .should('have.text',qty)
        // cy.xpath('//body/div[3]/div[2]/div[1]/xc-abstract-offer-step-modal-new[1]/xc-popup-fullscreen[1]/div[1]/xc-popup-content[1]/div[1]/xc-create-abstract-offer-success[1]/div[1]/xc-abstract-offer-search-row[1]/div[1]/div[1]/div[1]/div[3]/div[2]/xc-equipment-type-condition[1]/div[3]/span[1]')
        //     .should('have.text',sale_type)
        cy.get("span.equipment-type-condition__condition.ng-star-inserted")
            .should('have.text',condition)
        cy.get('#cdk-overlay-0 > xc-abstract-offer-step-modal-new > xc-popup-fullscreen > div > xc-popup-content > div > xc-create-abstract-offer-success > div > xc-abstract-offer-search-row > div > div > div > div:nth-child(4) > div.xc-abstract-offer-search-row__yom.ng-star-inserted')
            .should('have.text',yearsInterval)
        cy.xpath(`//p[contains(text(),'${text}')]`)
            .should('have.text',text)
    }

     nextStepButton(value){
          cy.get('button[type=submit]')
            .should('have.text', value).click()
    }

    toTradingPageButton(){
          cy.get('div > div > xc-button.ng-star-inserted > button')
            .should('have.text', 'Done for now').click()
    }
}

export default tradingNewSalesModel