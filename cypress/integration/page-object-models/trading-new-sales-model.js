/// <reference types="cypress" />

class TradingNewSalesModel {

    locationField(value){
          cy.get("xc-input-wrap[label='Location']>div>label>span").should('have.text','Location')
          cy.get("ng-select[formcontrolname='location']>div>div>div>input")
            .type(value).type('{enter}')

    }

    typeField(value){
        cy.get("xc-input-wrap[label='Type']>div>label>span").should('have.text','Type')
          cy.get("ng-select[formcontrolname='equipmentType']>div>div>div>input")
            .type(value).type('{enter}')
    }

    conditionField(value){
        cy.get("xc-input-wrap[label='Condition']>div>label>span").should('have.text','Condition')
          cy.get("ng-select[formcontrolname='unitCondition']>div>div>div>input")
            .type(value).type('{enter}')
    }

    fromYearField(value){
        cy.get('xc-input-wrap[label=\'From (optional)\']>div>label>span').should('have.text','From (optional)')
          cy.get('[formcontrolname="yearOfManufactureRangeFrom"]')
            .type(value).type('{enter}')
    }

    toYearField(value){
        cy.get('xc-input-wrap[label=\'To (optional)\']>div>label>span').should('have.text','To (optional)')
          cy.get('[formcontrolname="yearOfManufactureRangeTo"]')
            .type(value).type('{enter}')
    }

    targetPriceconditionField(value){
        cy.get('xc-input-group[label=\'Target price\']>div>label').should('have.text','Target price')
          cy.get('input[formcontrolname=price]')
            .type(value)
    }

    quantityField(value){
        cy.get('xc-input-wrap[label=\'Quantity\']>div>label').should('have.text','Quantity')
          cy.get('input[formcontrolname=quantity]')
            .type(value)
    }

    validForField(value){
        cy.get('xc-input-wrap[label=\'Valid for\']>div>label').should('have.text','Valid for')
        cy.get("xc-input-wrap > div > div > ng-select > div > span").click()
        cy.xpath(`//span[contains(text(),'${value}')]`)
            .click()
    }

    commentField(value){
        cy.xpath('//span[contains(text(),\'Comment\')]').should('have.text','Comment')
        cy.get("[formcontrolname=comments]").type(value).type('{enter}')
    }

    pickupDateField(value){
        cy.get('xc-date-input[label=\'Date when ready for pickup\']>div>label')
            .should('contain','Date when ready for pickup')
        cy.get("div:nth-child(1) > xc-date-input > div > div > input:nth-child(2)").type(value).type('{enter}')
    }
    CSCexpireDateField(value){
        // cy.get('xc-date-input[label=\'Date when CSC expires\']>div>label').should('contain','Date when CSC expires')
        cy.get("div:nth-child(2) > xc-date-input > div > div > input:nth-child(2)").type(value).type('{enter}')
    }

    containerPrefixesField(value){
        cy.get('xc-input-wrap[label=\'Container prefixes\']>div>label>span').should('contain','Container prefixes')
        cy.get("div:nth-child(1) > xc-input-wrap > div > div>input").type(value).type('{enter}')
    }

    containerColorsField(value){
        cy.get('xc-input-wrap[label=\'Container colors\']>div>label>span').should('contain','Container colors')
        cy.get("div:nth-child(2) > xc-input-wrap > div > div>input").type(value).type('{enter}')
    }

    containerForRadioButton(value){
        cy.get('xc-input-wrap > div > label > span').should('contain','containers for')
        if (value.toLowerCase() === 'export'){
            cy.get("xc-radio-list > div > xc-radio:nth-child(1) > label>div")
                .should('contain', ' Export ')
                .click()
        }else if (value.toLowerCase() === 'domestic use'){
            cy.get("xc-radio-list > div > xc-radio:nth-child(2) > label > div")
                .should('contain', ' Domestic use ')
                .click()
        }
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

    otherDetailsButton(){
          const button = cy.get('xc-optional-data-form > xc-spacing > button')
          button.then(($btn) => {
              if ($btn.hasClass('fal fa-chevron-down')) {
                  button.should('contain', ' Hide other details ').click()
              } else {
                  button.should('contain', ' Show other details ').click()
              }
          })
    }

}

export default TradingNewSalesModel