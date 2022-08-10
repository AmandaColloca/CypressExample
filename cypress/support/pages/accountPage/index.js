const accountElements = require('./elements').ELEMENTS;
const headerElements = require('../header/elements').ELEMENTS;
const loginElements = require('../loginPage/elements').ELEMENTS;


class AccountPage {
    goToAccountPage() {
        cy.get(headerElements.accountButton).should('be.visible').click()
        cy.get(headerElements.accountLink).should('be.visible').click()
        cy.url().should('include','/customer/account/')
    }

    checkCustomerData(firstName, lastName, email, street, number, district, city, cep) {
        cy.contains(accountElements.customerData, firstName).should('be.visible')
        cy.contains(accountElements.customerData, lastName).should('be.visible')
        cy.contains(accountElements.customerData, email).should('be.visible')

        cy.contains(accountElements.payAddress, street).should('be.visible')
        cy.contains(accountElements.payAddress, number).should('be.visible')
        cy.contains(accountElements.payAddress, district).should('be.visible')
        cy.contains(accountElements.payAddress, city).should('be.visible')
        cy.contains(accountElements.payAddress, cep).should('be.visible')
        cy.contains(accountElements.shipAddress, street).should('be.visible')
        cy.contains(accountElements.shipAddress, number).should('be.visible')
        cy.contains(accountElements.shipAddress, district).should('be.visible')
        cy.contains(accountElements.shipAddress, city).should('be.visible')
        cy.contains(accountElements.shipAddress, cep).should('be.visible')
    }

    changePassword(currentPassword, newPassword) {
        cy.get(accountElements.changePasswordButton).should('be.visible').click()

        cy.get(accountElements.currentPassword).should('be.visible').type(currentPassword)
        cy.get(accountElements.newPassword).should('be.visible').type(newPassword)
        cy.get(accountElements.passwordConfirmation).should('be.visible').type(newPassword)

        cy.get(accountElements.saveButton).should('be.visible').click()

        cy.get(loginElements.title, { timeout: 60000 })
            .should('be.visible')
            .should('have.text', 'Acesse sua conta')
    }

    checkMenus() {
        cy.get(accountElements.orderHistoryMenu).should('be.visible').click()
        cy.url().should('include','/sales/order/history/')
        cy.contains(accountElements.titleMenu,'Meus Pedidos').should('be.visible')

        cy.get(accountElements.addressMenu).should('be.visible').click()
        cy.url().should('include','/customer/address/')
        cy.contains(accountElements.titleMenu,'Endereços').should('be.visible')

        cy.get(accountElements.accountEditMenu).should('be.visible').click()
        cy.url().should('include','/customer/account/edit/')
        cy.contains(accountElements.titleMenu,'Editar informações da conta').should('be.visible')

        cy.get(accountElements.newsletterMenu).should('be.visible').click()
        cy.url().should('include','/newsletter/manage/')
        cy.contains(accountElements.titleMenu,'Preferências de Comunicação').should('be.visible')        
    }
}


export default new AccountPage;