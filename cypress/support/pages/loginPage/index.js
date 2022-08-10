const loginElements = require('./elements').ELEMENTS;
const accountElements = require('../accountPage/elements').ELEMENTS;

import common from '../common'

class LoginPage {
    go() {
        cy.visit('/customer/account/login/')
        cy.get(loginElements.title)
            .should('be.visible')
            .should('have.text', 'Acesse sua conta')
    }

    fillLoginFields(email, password) {
        common.typeCustom(loginElements.emailField, email)
        common.typeCustom(loginElements.passwordField, password)
    }

    submitLogin() {
        // cy.solveGoogleReCAPTCHA()
        // cy.confirmCaptcha()
        // cy.clickRecaptcha()
        cy.get(loginElements.submitButton)
            .should('be.visible').click()
        cy.get(accountElements.title)
            .should('be.visible')
            .should('have.text', '\n            \n                Minha Conta\n            \n        ')
    }

    submitLoginToHome() {
        // cy.solveGoogleReCAPTCHA()
        // cy.confirmCaptcha()
        // cy.clickRecaptcha()
        cy.get(loginElements.submitButton)
            .should('be.visible').click()
        cy.get('.loader-gif').should('not.be.visible')
        cy.get(accountElements.title)
            .should('be.visible')
            .should('have.text', '\n            \n                Minha Conta\n            \n        ')
    }

    submitLogWithError(expectedMessage) {
        // cy.solveGoogleReCAPTCHA()
        // cy.confirmCaptcha()
        // cy.clickRecaptcha()
        cy.get(loginElements.submitButton)
            .should('be.visible').click()
        cy.contains(expectedMessage)
            .should('be.visible')
    }

    forgotPassword(email) {
        cy.get(loginElements.forgotPasswordButton).should('be.visible').click()
        cy.get(loginElements.emailForgotPassField).should('be.visible').type(email)
        cy.get(loginElements.submitForgotPassButton).should('be.visible').click()
        cy.contains('Se houver uma conta associada com ' + email + ', você receberá um e-mail com um link para redefinir sua senha.')
    }
}

export default new LoginPage;