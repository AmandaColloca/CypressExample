import header from '../../support/pages/header'
import loginPage from '../../support/pages/loginPage'
import searchPage from '../../support/pages/searchPage'
import productPage from '../../support/pages/productPage'
import checkoutPage from '../../support/pages/checkoutPage'
import vendaDirigidaHomePage from '../../support/pages/vendaDirigidaHomePage'
import vendaDirigidaCheckoutPage from '../../support/pages/vendaDirigidaCheckoutPage'

import customerFactory from '../../factories/CustomerFactory'
import productFactory from '../../factories/ProductFactory'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Venda Dirigida - Login', () => {

    beforeEach(function () {
    })

    afterEach(function () {
        if (this.currentTest.state == 'passed') {
            cy.screenshot()
        }
    })

    it('CT 1 - Login - Login na loja com sucesso', { tags: ['login', 'vendaDirigida'] }, function () {
        var customer = customerFactory.customer_com()

        //Entrar na home e digitar cep
        vendaDirigidaHomePage.go()

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLoginToHome()
    })

    it('CT 2 - Login - Login no carrinho com sucesso', { tags: ['login', 'vendaDirigida'] }, function () {
        var customer = customerFactory.customer_com()
        var product = productFactory.productVD()
        
        //Entrar na home e digitar cep
        vendaDirigidaHomePage.go()

        //Adicionar Producto
        header.searchProduct(product.name)
        searchPage.checkSearchResults(product.name)
        searchPage.openSearchedProduct(product.name, product.page)
        productPage.setQuantity('5')
        productPage.addToCart(product.name)

        header.openMiniCart()

        //checkout
        header.goToCheckout()
        vendaDirigidaCheckoutPage.fillShippingFields(customer.address)
        vendaDirigidaCheckoutPage.calculateShippingSubmit()

        //Fazer login
        checkoutPage.fillLoginFields(customer.email, customer.password)
        checkoutPage.submitLogin(customer.first_name)
    })

    it('CT 3 - Login - Esqueceu sua senha', { tags: ['login', 'vendaDirigida'] }, function () {
        var customer = customerFactory.customer_com()

        // Entrar na home e digitar cep
        vendaDirigidaHomePage.go()
        // Fazer login
        header.goToLogin()
        // Esqueceu sua senha
        loginPage.forgotPassword(customer.email)
    })

    it('CT 4 - Login - Tentar fazer login com email não cadastrado', { tags: ['login', 'vendaDirigida'] }, function () {
        var customer = customerFactory.guest()
        var expectedMessage = 'O login da conta estava incorreto ou sua conta está desativada temporariamente. Por favor, espere e tente novamente mais tarde.'

        // Entrar na home e digitar cep
        vendaDirigidaHomePage.go()
        // Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, 'umPasswordQualquer')
        loginPage.submitLogWithError(expectedMessage)
    })

    it('CT 5 - Login - Tentar fazer login sem informar email', { tags: ['login', 'vendaDirigida'] }, function () {
        var customer = customerFactory.customer_com()
        var expectedMessage = 'Esse campo é obrigatório.'

        // Entrar na home e digitar cep
        vendaDirigidaHomePage.go()
        // Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(' ', customer.password)
        loginPage.submitLogWithError(expectedMessage)
    })

    it('CT 6 - Login - Tentar fazer login sem informar senha', { tags: ['login', 'vendaDirigida'] }, function () {
        var customer = customerFactory.customer_com()
        var expectedMessage = 'Esse campo é obrigatório.'

        // Entrar na home e digitar cep
        vendaDirigidaHomePage.go()
        // Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, ' ')
        loginPage.submitLogWithError(expectedMessage)
    })

    it('CT 7 - Login - Tentar fazer login com senha incorreta', { tags: ['login', 'vendaDirigida'] }, function () {
        var customer = customerFactory.customer_com()
        var expectedMessage = 'O login da conta estava incorreto ou sua conta está desativada temporariamente. Por favor, espere e tente novamente mais tarde.'

        // Entrar na home e digitar cep
        vendaDirigidaHomePage.go()
        // Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, 'umPasswordQualquer')
        loginPage.submitLogWithError(expectedMessage)
    })
})