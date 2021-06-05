import MainBar from "../page-object-models/main-bar.model";
import TradingNewSalesModel from "../page-object-models/trading-new-sales-model";
import TradingPageModel from "../page-object-models/trading-page-model";
import {clickButton} from "../page-object-models/general-function";
const {
  Before,
  After,
  Given,
  Then,
  And
} = require("cypress-cucumber-preprocessor/steps");


// let context = {}
// Before(() => {
//        cy.fixture('cred-user-1').then(function(data) {
//            context['config'] = data
//             cy.login(data.email, data.password)
//         })
// })
//
// Given('I open the Trading application', () => {
//     const icon = new MainBar()
//     icon.tradingClick()
//     cy.wait(3000)
// })
//
// And('I create -{string}-', (button_name) => {
//     const button = new TradingPageModel()
//     if (button_name === 'New sales offer'){
//         button.clickSalesOfferButton()
//     }else if (button_name === 'New buying demand'){
//         button.clickNewBuyingDemandButton()
//     }
//     cy.wait(1000)
// })

And('I change from -> {int} & to -> {int} and validator:{string} should {string}', (value_1, value_2, validator, presence) => {
    const model = new TradingNewSalesModel()
    model.locationField('DUBAI')
    model.conditionField('Brand new')
    model.typeField('20 Open top')
    model.fromYearField(value_1)
    // model.toYearField(value_2)
    if (presence === 'be'){
        model.checkValidator(validator)
        clickButton('Next step')
        model.checkValidator(validator)
    }else if (presence === 'not be') {
        model.checkValidator(validator, false)
    }
})

And('I change price -> {int} & qty -> {int} and validator:{string} should {string}', (value_1, value_2, validator, presence) => {
    const model = new TradingNewSalesModel()
    model.locationField('DUBAI')
    model.conditionField('Brand new')
    model.typeField('20 Open top')
    clickButton('Next step')
    model.targetPriceconditionField(value_1)
    model.quantityField(value_2)

    if (presence === 'be'){
        model.checkValidator(validator)
        clickButton('Next step')
        model.checkValidator(validator)
    }else if (presence === 'not be') {
        model.checkValidator(validator, false)
    }
})