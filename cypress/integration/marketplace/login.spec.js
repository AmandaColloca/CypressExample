import homePage from '../../support/pages/homePage'
import header from '../../support/pages/header'
import loginPage from '../../support/pages/loginPage'
import searchPage from '../../support/pages/searchPage'
import productPage from '../../support/pages/productPage'
import checkoutPage from '../../support/pages/checkoutPage'

import customerFactory from '../../factories/CustomerFactory'
import productFactory from '../../factories/ProductFactory'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Marketplace - Login', () => {

    beforeEach(function () {
    })

    afterEach(function () {
        if (this.currentTest.state == 'passed') {
            cy.screenshot()
        }
    })

    it('CT 1 - Login - Login na LandingPage', { tags: ['login', 'marketplace'] }, function () {
        var customer = customerFactory.customer_com()

        // Entrar na home e digitar cep
        homePage.go()
        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLoginToHome()
    })

    it('CT 2 - Login - Login na loja com sucesso', { tags: ['login', 'marketplace'] }, function () {
        var customer = customerFactory.customer_com()

        //Entrar na home e digitar cep
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLoginToHome()
    })

    it('CT 3 - Login - Login no carrinho com sucesso', { tags: ['login', 'marketplace'] }, function () {
        var customer = customerFactory.customer_com()
        var productA = productFactory.product010A()

        //Entrar na home e digitar cep
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity('5')
        productPage.addToCart(productA.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('cheaper')
        //Fazer login
        checkoutPage.fillLoginFields(customer.email, customer.password)
        checkoutPage.submitLogin(customer.first_name)
    })

    it('CT 4 - Login - Esqueceu sua senha', { tags: ['login', 'marketplace'] }, function () {
        var customer = customerFactory.customer_com()

        // Entrar na home e digitar cep
        homePage.go()
        // Fazer login
        header.goToLogin()
        // Esqueceu sua senha
        loginPage.forgotPassword(customer.email)
    })

    it('CT 5 - Login - Tentar fazer login com email não cadastrado', { tags: ['login', 'marketplace'] }, function () {
        var customer = customerFactory.guest()
        var expectedMessage = 'O login da conta estava incorreto ou sua conta está desativada temporariamente. Por favor, espere e tente novamente mais tarde.'

        // Entrar na home e digitar cep
        homePage.go()
        // Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, 'umPasswordQualquer')
        loginPage.submitLogWithError(expectedMessage)
    })

    it('CT 6 - Login - Tentar fazer login sem informar email', { tags: ['login', 'marketplace'] }, function () {
        var customer = customerFactory.customer_com()
        var expectedMessage = 'Esse campo é obrigatório.'

        // Entrar na home e digitar cep
        homePage.go()
        // Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(' ', customer.password)
        loginPage.submitLogWithError(expectedMessage)
    })

    it('CT 7 - Login - Tentar fazer login sem informar senha', { tags: ['login', 'marketplace'] }, function () {
        var customer = customerFactory.customer_com()
        var expectedMessage = 'Esse campo é obrigatório.'

        // Entrar na home e digitar cep
        homePage.go()
        // Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, ' ')
        loginPage.submitLogWithError(expectedMessage)
    })

    it('CT 8 - Login - Tentar fazer login com senha incorreta', { tags: ['login', 'marketplace'] }, function () {
        var customer = customerFactory.customer_com()
        var expectedMessage = 'O login da conta estava incorreto ou sua conta está desativada temporariamente. Por favor, espere e tente novamente mais tarde.'

        // Entrar na home e digitar cep
        homePage.go()
        // Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, 'umPasswordQualquer')
        loginPage.submitLogWithError(expectedMessage)
    })
})