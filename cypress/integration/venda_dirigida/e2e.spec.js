import productPage from '../../support/pages/productPage'
import checkoutPage from '../../support/pages/checkoutPage'
import loginPage from '../../support/pages/loginPage'
import vendaDirigidaHomePage from '../../support/pages/vendaDirigidaHomePage'
import vendaDirigidaCheckoutPage from '../../support/pages/vendaDirigidaCheckoutPage'
import header from '../../support/pages/header'
import searchPage from '../../support/pages/searchPage'

import customerFactory from '../../factories/CustomerFactory'
import creditCardFactory from '../../factories/CreditCardFactory'
import productFactory from '../../factories/ProductFactory'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Venda dirigida - Pagamentos e finalização de pedidos', () => {

    beforeEach(function () {

    })

    afterEach(function() {
        if (this.currentTest.state == 'passed') {
            cy.screenshot()
        }
    })

    it('CT 1', { tags: ['e2e', 'vendaDirigida', 'logged', 'withAddress', 'cashOnDelivery'] }, function () {
        var customer = customerFactory.customer_com()
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Pesquisar produto e adicionar no carrinho
        header.searchProduct(product.name)
        searchPage.checkSearchResults(product.name)
        searchPage.openSearchedProduct(product.name, product.page)
        productPage.setQuantity('5')
        productPage.addToCart(product.name)

        header.openMiniCart()

        //checkout
        header.goToCheckoutShippingStep()
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('cashondelivery')
        checkoutPage.finalizeOrder()
    })

    it('CT 2', { tags: ['e2e', 'vendaDirigida', 'logged', 'withAddress', 'cashOnDelivery'] }, function () {
        var customer = customerFactory.customer_com()
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Pesquisar produto e adicionar no carrinho
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

        checkoutPage.fillShippingFields(customer, 'without_address')

        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('cashondelivery')
        checkoutPage.finalizeOrder()
    })

    it('CT 3', { tags: ['e2e', 'vendaDirigida', 'guest', 'withoutAccount', 'cashOnDelivery'] }, function () {
        var customer = customerFactory.guest()
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Pesquisar produto e adicionar no carrinho
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

        // Guest
        checkoutPage.fillShippingFields(customer, 'guest')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('cashondelivery')
        checkoutPage.finalizeOrder()
    })

    it('CT 4', { tags: ['e2e', 'vendaDirigida', 'guest', 'withAccount', 'cashOnDelivery', 'smoke'] }, function () {
        var customer = customerFactory.guest_cadastrado()
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Pesquisar produto e adicionar no carrinho
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

        // Guest
        checkoutPage.fillShippingFields(customer, 'guest')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('cashondelivery')
        checkoutPage.finalizeOrder()
    })

    it('CT 5', { tags: ['e2e', 'vendaDirigida', 'logged', 'withAddress', 'boleto', 'smoke'] }, function () {
        var customer = customerFactory.customer_com()
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Pesquisar produto e adicionar no carrinho
        header.searchProduct(product.name)
        searchPage.checkSearchResults(product.name)
        searchPage.openSearchedProduct(product.name, product.page)
        productPage.setQuantity('5')
        productPage.addToCart(product.name)
        header.openMiniCart()

        //checkout
        header.goToCheckoutShippingStep()
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('braspag_pagador_boleto')
        checkoutPage.finalizeOrder()
    })

    it('CT 6', { tags: ['e2e', 'vendaDirigida', 'logged', 'withAddress', 'creditCard', 'smoke'] }, function () {
        var customer = customerFactory.customer_com()
        var creditCard = creditCardFactory.creditcard()
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Pesquisar produto e adicionar no carrinho
        header.searchProduct(product.name)
        searchPage.checkSearchResults(product.name)
        searchPage.openSearchedProduct(product.name, product.page)
        productPage.setQuantity('5')
        productPage.addToCart(product.name)
        header.openMiniCart()

        //checkout
        header.goToCheckoutShippingStep()
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '1')
        checkoutPage.finalizeOrder()
    })

    it('CT 7', { tags: ['e2e', 'vendaDirigida', 'logged', 'withAddress', 'cashOnDelivery', 'coupon', 'smoke'] }, function () {
        var customer = customerFactory.customer_com()
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Pesquisar produto e adicionar no carrinho
        header.searchProduct(product.name)
        searchPage.checkSearchResults(product.name)
        searchPage.openSearchedProduct(product.name, product.page)
        productPage.setQuantity('50')
        productPage.addToCart(product.name)
        header.openMiniCart()

        //checkout
        header.goToCheckoutShippingStep()
        checkoutPage.goToPayment()
        checkoutPage.fillCupomField('OBRA50','50,00')
        checkoutPage.selectPaymentMethod('cashondelivery')
        checkoutPage.finalizeOrder()
    })

    it('CT 8', { tags: ['e2e', 'vendaDirigida', 'logged', 'withAddress', 'boleto', 'coupon'] }, function () {
        var customer = customerFactory.customer_com()
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Pesquisar produto e adicionar no carrinho
        header.searchProduct(product.name)
        searchPage.checkSearchResults(product.name)
        searchPage.openSearchedProduct(product.name, product.page)
        productPage.setQuantity('50')
        productPage.addToCart(product.name)
        header.openMiniCart()

        //checkout
        header.goToCheckoutShippingStep()
        checkoutPage.goToPayment()
        checkoutPage.fillCupomField('OBRA50','50,00')
        checkoutPage.selectPaymentMethod('braspag_pagador_boleto')
        checkoutPage.finalizeOrder()
    })

    it('CT 9', { tags: ['e2e', 'vendaDirigida', 'logged', 'withAddress', 'creditCard', 'coupon'] }, function () {
        var customer = customerFactory.customer_com()
        var creditCard = creditCardFactory.creditcard()
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Pesquisar produto e adicionar no carrinho
        header.searchProduct(product.name)
        searchPage.checkSearchResults(product.name)
        searchPage.openSearchedProduct(product.name, product.page)
        productPage.setQuantity('50')
        productPage.addToCart(product.name)
        header.openMiniCart()

        //checkout
        header.goToCheckoutShippingStep()
        checkoutPage.goToPayment()
        checkoutPage.fillCupomField('OBRA50','50,00')
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '1')
        checkoutPage.finalizeOrder()
    })
    
    it('CT 10', { tags: ['e2e', 'vendaDirigida', 'logged', 'withoutAddress', 'cashOnDelivery'] }, function () {
        var customer = customerFactory.customer_sem()
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Pesquisar produto e adicionar no carrinho
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
        checkoutPage.fillShippingFields(customer, 'without_address')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('cashondelivery')
        checkoutPage.finalizeOrder()
    })

    it('CT 11', { tags: ['e2e', 'vendaDirigida', 'logged', 'withAddress', 'creditCard'] }, function () {
        var customer = customerFactory.customer_com()
        var creditCard = creditCardFactory.creditcard()
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Pesquisar produto e adicionar no carrinho
        header.searchProduct(product.name)
        searchPage.checkSearchResults(product.name)
        searchPage.openSearchedProduct(product.name, product.page)
        productPage.setQuantity('5')
        productPage.addToCart(product.name)
        header.openMiniCart()

        //checkout
        header.goToCheckoutShippingStep()
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '2')
        checkoutPage.finalizeOrder()
    })

    it('CT 12', { tags: ['e2e', 'vendaDirigida', 'logged', 'withAddress', 'creditCard'] }, function () {
        var customer = customerFactory.customer_com()
        var creditCard = creditCardFactory.creditcard()
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Pesquisar produto e adicionar no carrinho
        header.searchProduct(product.name)
        searchPage.checkSearchResults(product.name)
        searchPage.openSearchedProduct(product.name, product.page)
        productPage.setQuantity('5')
        productPage.addToCart(product.name)
        header.openMiniCart()

        //checkout
        header.goToCheckoutShippingStep()
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '3')
        checkoutPage.finalizeOrder()
    })

    it('CT 13', { tags: ['e2e', 'vendaDirigida', 'logged', 'withAddress', 'creditCard', 'coupon'] }, function () {
        var customer = customerFactory.customer_com()
        var creditCard = creditCardFactory.creditcard()
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Pesquisar produto e adicionar no carrinho
        header.searchProduct(product.name)
        searchPage.checkSearchResults(product.name)
        searchPage.openSearchedProduct(product.name, product.page)
        productPage.setQuantity('50')
        productPage.addToCart(product.name)
        header.openMiniCart()

        //checkout
        header.goToCheckoutShippingStep()
        checkoutPage.goToPayment()
        checkoutPage.fillCupomField('OBRA50','50,00')
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '2')
        checkoutPage.finalizeOrder()
    })

    it('CT 14', { tags: ['e2e', 'vendaDirigida', 'logged', 'withAddress', 'creditCard', 'coupon'] }, function () {
        var customer = customerFactory.customer_com()
        var creditCard = creditCardFactory.creditcard()
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Pesquisar produto e adicionar no carrinho
        header.searchProduct(product.name)
        searchPage.checkSearchResults(product.name)
        searchPage.openSearchedProduct(product.name, product.page)
        productPage.setQuantity('50')
        productPage.addToCart(product.name)
        header.openMiniCart()

        //checkout
        header.goToCheckoutShippingStep()
        checkoutPage.goToPayment()
        checkoutPage.fillCupomField('OBRA50','50,00')
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '3')
        checkoutPage.finalizeOrder()
    })

    it('CT 15', { tags: ['e2e', 'vendaDirigida', 'guest', 'withoutAccount', 'creditCard'] }, function () {
        var customer = customerFactory.guest()
        var creditCard = creditCardFactory.creditcard()
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Pesquisar produto e adicionar no carrinho
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

        // Guest
        checkoutPage.fillShippingFields(customer, 'guest')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '1')
        checkoutPage.finalizeOrder()
    })

    it('CT 16', { tags: ['e2e', 'vendaDirigida', 'guest', 'withoutAccount', 'creditCard'] }, function () {
        var customer = customerFactory.guest()
        var creditCard = creditCardFactory.creditcard()
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Pesquisar produto e adicionar no carrinho
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

        // Guest
        checkoutPage.fillShippingFields(customer, 'guest')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '2')
        checkoutPage.finalizeOrder()
    })

    it('CT 17', { tags: ['e2e', 'vendaDirigida', 'guest', 'withoutAccount', 'creditCard'] }, function () {
        var customer = customerFactory.guest()
        var creditCard = creditCardFactory.creditcard()
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Pesquisar produto e adicionar no carrinho
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

        // Guest
        checkoutPage.fillShippingFields(customer, 'guest')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '3')
        checkoutPage.finalizeOrder()
    })

    it('CT 18', { tags: ['e2e', 'vendaDirigida', 'guest', 'withoutAccount', 'boleto'] }, function () {
        var customer = customerFactory.guest()
        var creditCard = creditCardFactory.creditcard()
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Pesquisar produto e adicionar no carrinho
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

        // Guest
        checkoutPage.fillShippingFields(customer, 'guest')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('braspag_pagador_boleto')
        checkoutPage.finalizeOrder()
    })

    it('CT 19', { tags: ['e2e', 'vendaDirigida', 'guest', 'withoutAccount', 'creditCard', 'coupon'] }, function () {
        var customer = customerFactory.guest()
        var creditCard = creditCardFactory.creditcard()
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Pesquisar produto e adicionar no carrinho
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

        // Guest
        checkoutPage.fillShippingFields(customer, 'guest')
        checkoutPage.goToPayment()
        checkoutPage.fillCupomField('OBRA50','50,00')
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '1')
        checkoutPage.finalizeOrder()
    })

    it('CT 20', { tags: ['e2e', 'vendaDirigida', 'guest', 'withoutAccount', 'creditCard', 'coupon'] }, function () {
        var customer = customerFactory.guest()
        var creditCard = creditCardFactory.creditcard()
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Pesquisar produto e adicionar no carrinho
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

        // Guest
        checkoutPage.fillShippingFields(customer, 'guest')
        checkoutPage.goToPayment()
        checkoutPage.fillCupomField('OBRA50','50,00')
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '2')
        checkoutPage.finalizeOrder()
    })

    it('CT 21', { tags: ['e2e', 'vendaDirigida', 'guest', 'withoutAccount', 'creditCard', 'coupon'] }, function () {
        var customer = customerFactory.guest()
        var creditCard = creditCardFactory.creditcard()
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Pesquisar produto e adicionar no carrinho
        header.searchProduct(product.name)
        searchPage.checkSearchResults(product.name)
        searchPage.openSearchedProduct(product.name, product.page)
        productPage.setQuantity('10')
        productPage.addToCart(product.name)
        header.openMiniCart()

        //checkout
        header.goToCheckout()
        vendaDirigidaCheckoutPage.fillShippingFields(customer.address)
        vendaDirigidaCheckoutPage.calculateShippingSubmit()

        // Guest
        checkoutPage.fillShippingFields(customer, 'guest')
        checkoutPage.goToPayment()
        checkoutPage.fillCupomField('OBRA50','50,00')
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '3')
        checkoutPage.finalizeOrder()
    })

    it('CT 22', { tags: ['e2e', 'vendaDirigida', 'guest', 'withoutAccount', 'boleto', 'coupon'] }, function () {
        var customer = customerFactory.guest()
        var creditCard = creditCardFactory.creditcard()
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Pesquisar produto e adicionar no carrinho
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

        // Guest
        checkoutPage.fillShippingFields(customer, 'guest')
        checkoutPage.goToPayment()
        checkoutPage.fillCupomField('OBRA50','50,00')
        checkoutPage.selectPaymentMethod('braspag_pagador_boleto')
        checkoutPage.finalizeOrder()
    })

    it('CT 23', { tags: ['e2e', 'vendaDirigida', 'logged', 'withoutAddress', 'creditCard'] }, function () {
        var customer = customerFactory.customer_sem()
        var creditCard = creditCardFactory.creditcard()

        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Pesquisar produto e adicionar no carrinho
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
        checkoutPage.fillShippingFields(customer, 'without_address')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '2')
        checkoutPage.finalizeOrder()
    })

    it('CT 24', { tags: ['e2e', 'vendaDirigida', 'logged', 'withoutAddress', 'creditCard'] }, function () {
        var customer = customerFactory.customer_sem()
        var creditCard = creditCardFactory.creditcard()

        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Pesquisar produto e adicionar no carrinho
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
        checkoutPage.fillShippingFields(customer, 'without_address')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '3')
        checkoutPage.finalizeOrder()
    })

    it.only('CT 25', { tags: ['e2e', 'vendaDirigida', 'logged', 'withoutAddress', 'boleto'] }, function () {
        var customer = customerFactory.customer_sem()
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Pesquisar produto e adicionar no carrinho
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
        checkoutPage.fillShippingFields(customer, 'without_address')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('braspag_pagador_boleto')
        checkoutPage.finalizeOrder()
    })
})