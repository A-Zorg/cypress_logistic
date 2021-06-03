import LoginPage from "../integration/page-object-models/login-logout.model";
import 'cypress-file-upload';

Cypress.Commands.add('login', (email, password) =>{
    const lp = new LoginPage()
    lp.visit()
    lp.fillEmail(email)
    lp.fillPassword(password)
    lp.submitUser()
})

