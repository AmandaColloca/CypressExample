import homePage from '../../support/pages/homePage'
import customerFactory from '../../factories/CustomerFactory'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Marketplace - Landing Page', () => {

    beforeEach(function () {
    })

    afterEach(function () {
        if (this.currentTest.state == 'passed') {
            cy.screenshot()
        }
    })

    it('Ingresar com CEP na Landing Page', { tags: ['landingpage', 'marketplace'] }, function () {
        // Usando FACTORY 
        var customer = customerFactory.customer_com()
        // ao usar a var 
        // homePage.fillCep(customer.address.cep)


        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)
    })

    it('Ingresar com endereço na Landing Page', { tags: ['landingpage', 'marketplace', 'smoke'] }, function () {
        var customer = customerFactory.customer_com()
        homePage.go()
        homePage.fillCep(customer.address.street + ' ' + customer.address.streetNumber + ' '
            + customer.address.district + ' ' + customer.address.city + ' '
            + customer.address.state + ' ' + customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.cep)
    })

    it('Ingresar dados inválidos na Landing Page', { tags: ['landingpage', 'marketplace'] }, function () {
        homePage.go()
        homePage.fillCep('2ews1e321e32ed23e4wqr324efr34tr')
        homePage.submit()
        homePage.alertMessageShouldBe('Erro ao encontrar CEP! Verifique se o CEP da obra foi informado corretamente e tente novamente.')
    })
})