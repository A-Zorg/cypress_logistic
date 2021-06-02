/// <reference types="cypress" />

class PickupReferenceFrameModel{
    releaseReferenceField(value){
          cy.get("div.xc-transaction-release_ref>xc-input-wrap>div>label>span").should('have.text','Release reference')
          cy.get('input[formcontrolname="releaseReference"]')
              .clear()
              .type(value)
              .type('{enter}')

    }

    pickupLocationField(value){
        cy.get("div:nth-child(2)>div:nth-child(1)>xc-input-wrap>div>label>span").should('have.text','Pick-up location')
          cy.get('ng-select[formcontrolname="location"]')
              .clear()
              .type(value)
              .type('{enter}')
    }

    quantiyiField(value){
        cy.get("div.xc-transaction-release_count > xc-input-group > div > label").should('have.text','Quantity')
          cy.get('input[formcontrolname="numberOfContainers"]')
              .clear()
              .type(value)
              .type('{enter}')
    }

    dateField(value){
        cy.get('div.ng-star-inserted > xc-date-input > div > label').should('have.text','Validity date (14 days by default)')
          cy.get('div.ng-star-inserted > xc-date-input > div > div > input:nth-child(2)')
              .clear()
              .type(value)
              .type('{enter}')
    }

    attachDocumentcheckbox(){
        cy.get(' div.ng-star-inserted > xc-date-input > div > div > input:nth-child(2)').click()
    }

    fileField(fileName){
        cy.get(' div.ng-star-inserted > xc-date-input > div > div > input:nth-child(2)').click()
        const nameFormatList = fileName.split('.')
        const mimeTypes = {
            'jpg': 'image/jpg',
            'png': 'image/png',
            'pdf': 'application/pdf',
        }

        cy.fixture(fileName).then(fileContent => {
            cy.get('input[type=file]').attachFile({
                fileContent: fileContent.toString(),
                fileName: fileName,
                mimeType: mimeTypes[nameFormatList[-1]]
            })
        })
    }

    selectDepotField(number){
        cy.get(" div:nth-child(2) > xc-input-wrap > div > label > span").should('have.text','Select depot')
        cy.get('#select-depot > div > span.ng-arrow-wrapper').click()
        cy.get(`ng-dropdown-panel > div>div:nth-child(2)>div:nth-child(${number})`).click()
    }

    additionalHandlingInfoField(value){
        cy.get("form>xc-modal-accordion-wrap>div>xc-accordion>div>xc-accordion-item>div>div>em").click()
          cy.get('textarea[formcontrolname="comment"]')
              .clear()
              .type(value)
              .type('{enter}')
    }

    clickButton(name){
        cy.xpath(`//button/span[contains(text(),'${name}')]`).click()
    }
}

export default PickupReferenceFrameModel