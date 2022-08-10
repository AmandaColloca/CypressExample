import homePage from '../../support/pages/homePage'
import header from '../../support/pages/header'
import loginPage from '../../support/pages/loginPage'

import customerFactory from '../../factories/CustomerFactory'
import accountPage from '../../support/pages/accountPage'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Marketplace - Minha Conta', () => {

    beforeEach(function () {
    })

    afterEach(function () {
        if (this.currentTest.state == 'passed') {
            cy.screenshot()
        }
    })

    it('CT 1 - Minha Conta - Logout', { tags: ['account', 'marketplace'] }, function () {
        var customer = customerFactory.customer_com()

        // Entrar na home e digitar cep
        homePage.go()
        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLoginToHome()

        // Deslogar
        header.logout()
    })

    it('CT 2 - Minha Conta - Validar Dados do Cliente', { tags: ['account', 'marketplace'] }, function () {
        var customer = customerFactory.customer_com()

        // Entrar na home e digitar cep
        homePage.go()
        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLoginToHome()

        accountPage.goToAccountPage()
        // Deslogar
        accountPage.checkCustomerData(customer.first_name, customer.last_name, customer.email, customer.address.street, customer.address.streetNumber, customer.address.district, customer.address.city, customer.address.cep)
    })

    it('CT 3 - Minha Conta - Alterar senha', { tags: ['account', 'marketplace'] }, function () {
        var customer = customerFactory.customer_com()

        // Entrar na home e digitar cep
        homePage.go()
        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLoginToHome()

        accountPage.goToAccountPage()
        // Alterar senha
        accountPage.changePassword(customer.password, customer.password)
    })

    it('CT 4 - Minha Conta - Validar menus', { tags: ['account', 'marketplace'] }, function () {
        var customer = customerFactory.customer_com()

        // Entrar na home e digitar cep
        homePage.go()
        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLoginToHome()

        accountPage.goToAccountPage()
        // Validar menus
        accountPage.checkMenus()
    })
})