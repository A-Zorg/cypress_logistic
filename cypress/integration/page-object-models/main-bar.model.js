/// <reference types="cypress" />

class MainBar {

    tradingClick() {
        const name = cy.get('[data-test-id=nav-trading-page] >div>span')
        name.should('have.text', 'Trading')

        const icon = cy.get('[data-test-id=nav-trading-page] >div>i')
        icon.should('have.class', 'fa-comments-alt-dollar')
        icon.click()
    }

    logOut() {
        const icon = cy.get('button[data-test-id="nav-context-menu"]')
        icon.click()
        cy.contains('Log out').click()
    }

}
export default MainBar


    // [data-test-id=nav-trading-page] >div>i
    // [data-test-id=nav-trading-page] >div>span
    // nav-dashboard-page
    // nav-requirements-page
    // nav-requests-page
    // nav-smart-contract-page
    // nav-fleet-page
    // .xc-navigation__admin-button
    // .xc-navigation__notification-button
    // .xc-navigation__sub-menu-button
    //
    // #cdk-overlay-166 > ul > li:nth-child(1) > a > span
    // #cdk-overlay-169 > ul > li:nth-child(1) > a > span
    //
