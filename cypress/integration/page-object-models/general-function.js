
export function isElementPresent(selector) {

    cy.get('body').then(($body) => {
        if ($body.find(selector).length > 0) {
            cy.wrap(true).as('isElement')
        } else {
            cy.wrap(false).as('isElement')
        }
    })
}

export function clickButton(button_name) {
    cy.xpath(`//button/span[contains(text(),'${button_name}')]`).eq(0).click()
}