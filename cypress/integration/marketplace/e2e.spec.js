import productPage from '../../support/pages/productPage'
import homePage from '../../support/pages/homePage'
import checkoutPage from '../../support/pages/checkoutPage'
import loginPage from '../../support/pages/loginPage'
import header from '../../support/pages/header'
import searchPage from '../../support/pages/searchPage'

import customerFactory from '../../factories/CustomerFactory'
import creditCardFactory from '../../factories/CreditCardFactory'
import productFactory from '../../factories/ProductFactory'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Marketplace - Pagamentos e finalização de pedidos', () => {

    beforeEach(function () {
    })

    afterEach(function () {
        if (this.currentTest.state == 'passed') {
            cy.screenshot()
        }
    })

    it('CT 7', { tags: ['e2e', 'marketplace', 'logged', 'withoutAddress', 'cheaper', 'cashOnDelivery'] }, function () {
        var customer = customerFactory.customer_sem()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

        //Entrar na home e digitar cep
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity('5')
        productPage.addToCart(productA.name)

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('5')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('cheaper')
        checkoutPage.fillShippingFields(customer, 'without_address')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('cashondelivery')
        checkoutPage.finalizeOrder()
    })

    it('CT 25', { tags: ['e2e', 'marketplace', 'logged', 'withAddress', 'cheaper', 'cashOnDelivery', 'smoke'] }, function () {
        var customer = customerFactory.customer_com()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

        //Entrar na home e digitar cep
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity('5')
        productPage.addToCart(productA.name)

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('5')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('cheaper')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('cashondelivery')
        checkoutPage.finalizeOrder()
    })

    it('CT 26', { tags: ['e2e', 'marketplace', 'logged', 'withAddress', 'cheaper', 'boleto', 'smoke'] }, function () {
        var customer = customerFactory.customer_com()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

        //Entrar na home e digitar cep
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity('5')
        productPage.addToCart(productA.name)

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('5')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('cheaper')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('braspag_pagador_boleto')
        checkoutPage.finalizeOrder()
    })

    it('CT 27', { tags: ['e2e', 'marketplace', 'logged', 'withAddress', 'cheaper', 'creditCard', 'smoke'] }, function () {
        var customer = customerFactory.customer_com()
        var creditCard = creditCardFactory.creditcard()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

        //Entrar na home e digitar cep
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity('5')
        productPage.addToCart(productA.name)

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('5')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('cheaper')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '1')
        checkoutPage.finalizeOrder()
    })

    it('CT 37', { tags: ['e2e', 'marketplace', 'guest', 'withoutAccount', 'cheaper', 'cashOnDelivery'] }, function () {
        var customer = customerFactory.guest()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

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

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('5')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('cheaper')
        checkoutPage.fillShippingFields(customer, 'guest')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('cashondelivery')
        checkoutPage.finalizeOrder()
    })

    it('CT 43', { tags: ['e2e', 'marketplace', 'guest', 'withAccount', 'cheaper', 'cashOnDelivery'] }, function () {
        var customer = customerFactory.guest_cadastrado()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

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

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('5')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('cheaper')
        checkoutPage.fillShippingFields(customer, 'guest')
        checkoutPage.checkRegisteredEmail()
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('cashondelivery')
        checkoutPage.finalizeOrder()
    })

    it('CT 46', { tags: ['e2e', 'marketplace', 'guest', 'withAccount', 'cheaper', 'cashOnDelivery'] }, function () {
        var customer = customerFactory.guest_cadastrado()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

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

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('5')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.checkQuotationSellers('cheaper', productA.seller, productB.seller)
        checkoutPage.selectQuotation('cheaper')
        checkoutPage.fillShippingFields(customer, 'guest')
        checkoutPage.checkRegisteredEmail()
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('cashondelivery')
        checkoutPage.finalizeOrder()
    })

    it('CT 49', { tags: ['e2e', 'marketplace', 'logged', 'withAddress', 'cheaper', 'cashOnDelivery'] }, function () {
        var customer = customerFactory.customer_com()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

        //Entrar na home
        homePage.go()

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity('5')
        productPage.addToCart(productA.name)

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('5')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('cheaper')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('cashondelivery')
        checkoutPage.finalizeOrder()
    })

    it('CT 50', { tags: ['e2e', 'marketplace', 'logged', 'withAddress', 'fasterDelivery', 'cashOnDelivery'] }, function () {
        var customer = customerFactory.customer_com()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

        //Entrar na home
        homePage.go()

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity('5')
        productPage.addToCart(productA.name)

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('5')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('faster_delivery')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('cashondelivery')
        checkoutPage.finalizeOrder()
    })

    it('CT 51', { tags: ['e2e', 'marketplace', 'logged', 'withAddress', 'bestRated', 'cashOnDelivery'] }, function () {
        var customer = customerFactory.customer_com()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

        //Entrar na home
        homePage.go()

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity('5')
        productPage.addToCart(productA.name)

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('5')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('best_rated')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('cashondelivery')
        checkoutPage.finalizeOrder()
    })

    it('CT 52', { tags: ['e2e', 'marketplace', 'logged', 'withAddress', 'combinedPrice', 'cashOnDelivery'] }, function () {
        var customer = customerFactory.customer_com()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

        //Entrar na home
        homePage.go()

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity('5')
        productPage.addToCart(productA.name)

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('5')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('combined_price')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('cashondelivery')
        checkoutPage.finalizeOrder()
    })

    it('CT 53', { tags: ['e2e', 'marketplace', 'logged', 'withAddress', 'cheaper', 'creditCard'] }, function () {
        var customer = customerFactory.customer_com()
        var creditCard = creditCardFactory.creditcard()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

        //Entrar na home e digitar cep
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity('5')
        productPage.addToCart(productA.name)

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('5')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('cheaper')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '2')
        checkoutPage.finalizeOrder()
    })

    it('CT 54', { tags: ['e2e', 'marketplace', 'logged', 'withAddress', 'cheaper', 'creditCard'] }, function () {
        var customer = customerFactory.customer_com()
        var creditCard = creditCardFactory.creditcard()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

        //Entrar na home e digitar cep
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity('5')
        productPage.addToCart(productA.name)

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('5')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('cheaper')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '3')
        checkoutPage.finalizeOrder()
    })

    it('CT 55', { tags: ['e2e', 'marketplace', 'logged', 'withAddress', 'cheaper', 'boleto', 'coupon'] }, function () {
        var customer = customerFactory.customer_com()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

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

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('5')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('cheaper')
        //Fazer login
        checkoutPage.fillLoginFields(customer.email, customer.password)
        checkoutPage.submitLogin(customer.first_name)

        checkoutPage.fillShippingFields(customer, 'without_address')

        //Pagamento
        checkoutPage.goToPayment()
        checkoutPage.fillCupomField('OBRA50', '50,00')
        checkoutPage.selectPaymentMethod('braspag_pagador_boleto')
        checkoutPage.finalizeOrder()
    })

    it('CT 56', { tags: ['e2e', 'marketplace', 'logged', 'withAddress', 'cheaper', 'creditCard', 'coupon'] }, function () {
        var customer = customerFactory.customer_com()
        var creditCard = creditCardFactory.creditcard()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

        //Entrar na home
        homePage.go()

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity('5')
        productPage.addToCart(productA.name)

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('5')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('cheaper')
        checkoutPage.goToPayment()
        checkoutPage.fillCupomField('OBRA50', '50,00')
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '1')
        checkoutPage.finalizeOrder()
    })

    it('CT 57', { tags: ['e2e', 'marketplace', 'logged', 'withAddress', 'cheaper', 'creditCard', 'coupon', 'smoke'] }, function () {
        var customer = customerFactory.customer_com()
        var creditCard = creditCardFactory.creditcard()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

        //Entrar na home
        homePage.go()

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity('5')
        productPage.addToCart(productA.name)

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('5')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('cheaper')
        checkoutPage.goToPayment()
        checkoutPage.fillCupomField('OBRA50', '50,00')
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '2')
        checkoutPage.finalizeOrder()
    })

    it('CT 58', { tags: ['e2e', 'marketplace', 'logged', 'withAddress', 'cheaper', 'creditCard', 'coupon'] }, function () {
        var customer = customerFactory.customer_com()
        var creditCard = creditCardFactory.creditcard()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

        //Entrar na home
        homePage.go()

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity('10')
        productPage.addToCart(productA.name)

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('10')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('cheaper')
        checkoutPage.goToPayment()
        checkoutPage.fillCupomField('OBRA50', '50,00')
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '3')
        checkoutPage.finalizeOrder()
    })

    it('CT 59', { tags: ['e2e', 'marketplace', 'guest', 'withoutAccount', 'cheaper', 'creditCard'] }, function () {
        var customer = customerFactory.guest()
        var creditCard = creditCardFactory.creditcard()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

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

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('5')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('cheaper')
        checkoutPage.fillShippingFields(customer, 'guest')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '1')
        checkoutPage.finalizeOrder()
    })

    it('CT 60', { tags: ['e2e', 'marketplace', 'guest', 'withoutAccount', 'cheaper', 'creditCard'] }, function () {
        var customer = customerFactory.guest()
        var creditCard = creditCardFactory.creditcard()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

        //Entrar na home e digitar cep
        homePage.go()
        homePage.fillAddress(customer.address)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity('5')
        productPage.addToCart(productA.name)

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('5')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('cheaper')
        checkoutPage.fillShippingFields(customer, 'guest')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '2')
        checkoutPage.finalizeOrder()
    })

    it('CT 61', { tags: ['e2e', 'marketplace', 'guest', 'withoutAccount', 'cheaper', 'creditCard'] }, function () {
        var customer = customerFactory.guest()
        var creditCard = creditCardFactory.creditcard()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

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

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('5')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('cheaper')
        checkoutPage.fillShippingFields(customer, 'guest')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '3')
        checkoutPage.finalizeOrder()
    })

    it('CT 62', { tags: ['e2e', 'marketplace', 'guest', 'withoutAccount', 'cheaper', 'boleto'] }, function () {
        var customer = customerFactory.guest()
        var creditCard = creditCardFactory.creditcard()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

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

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('5')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('cheaper')
        checkoutPage.fillShippingFields(customer, 'guest')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('braspag_pagador_boleto')
        checkoutPage.finalizeOrder()
    })

    it('CT 63', { tags: ['e2e', 'marketplace', 'guest', 'withoutAccount', 'cheaper', 'creditCard', 'coupon'] }, function () {
        var customer = customerFactory.guest()
        var creditCard = creditCardFactory.creditcard()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

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

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('5')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('cheaper')
        checkoutPage.fillShippingFields(customer, 'guest')
        checkoutPage.goToPayment()
        checkoutPage.fillCupomField('OBRA50', '50,00')
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '1')
        checkoutPage.finalizeOrder()
    })

    it('CT 64', { tags: ['e2e', 'marketplace', 'guest', 'withoutAccount', 'cheaper', 'creditCard', 'coupon'] }, function () {
        var customer = customerFactory.guest()
        var creditCard = creditCardFactory.creditcard()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

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

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('5')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('cheaper')
        checkoutPage.fillShippingFields(customer, 'guest')
        checkoutPage.goToPayment()
        checkoutPage.fillCupomField('OBRA50', '50,00')
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '2')
        checkoutPage.finalizeOrder()
    })

    it('CT 65', { tags: ['e2e', 'marketplace', 'guest', 'withoutAccount', 'cheaper', 'creditCard', 'coupon'] }, function () {
        var customer = customerFactory.guest()
        var creditCard = creditCardFactory.creditcard()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

        //Entrar na home e digitar cep
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity('10')
        productPage.addToCart(productA.name)

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('10')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('cheaper')
        checkoutPage.fillShippingFields(customer, 'guest')
        checkoutPage.goToPayment()
        checkoutPage.fillCupomField('OBRA50', '50,00')
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '3')
        checkoutPage.finalizeOrder()
    })

    it('CT 66', { tags: ['e2e', 'marketplace', 'guest', 'withoutAccount', 'cheaper', 'boleto', 'coupon'] }, function () {
        var customer = customerFactory.guest()
        var creditCard = creditCardFactory.creditcard()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

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

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('5')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('cheaper')
        checkoutPage.fillShippingFields(customer, 'guest')
        checkoutPage.goToPayment()
        checkoutPage.fillCupomField('OBRA50', '50,00')
        checkoutPage.selectPaymentMethod('braspag_pagador_boleto')
        checkoutPage.finalizeOrder()
    })

    it('CT 67', { tags: ['e2e', 'marketplace', 'logged', 'withoutAddress', 'cheaper', 'creditCard'] }, function () {
        var customer = customerFactory.customer_sem()
        var creditCard = creditCardFactory.creditcard()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

        //Entrar na home
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity('5')
        productPage.addToCart(productA.name)

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('5')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('cheaper')
        checkoutPage.fillShippingFields(customer, 'without_address')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '2')
        checkoutPage.finalizeOrder()
    })

    it('CT 68', { tags: ['e2e', 'marketplace', 'logged', 'withoutAddress', 'cheaper', 'creditCard'] }, function () {
        var customer = customerFactory.customer_sem()
        var creditCard = creditCardFactory.creditcard()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

        //Entrar na home
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity('5')
        productPage.addToCart(productA.name)

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('5')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('cheaper')
        checkoutPage.fillShippingFields(customer, 'without_address')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('braspag_pagador_creditcard')
        checkoutPage.fillCreditCardFields(creditCard, '3')
        checkoutPage.finalizeOrder()
    })

    it('CT 69', { tags: ['e2e', 'marketplace', 'logged', 'withoutAddress', 'cheaper', 'boleto'] }, function () {
        var customer = customerFactory.customer_sem()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()

        //Entrar na home
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Fazer login
        header.goToLogin()
        loginPage.fillLoginFields(customer.email, customer.password)
        loginPage.submitLogin()

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity('5')
        productPage.addToCart(productA.name)

        //Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity('5')
        productPage.addToCart(productB.name)

        header.openMiniCart()

        //checkout
        header.goToQuotation()
        checkoutPage.selectQuotation('cheaper')
        checkoutPage.fillShippingFields(customer, 'without_address')
        checkoutPage.goToPayment()
        checkoutPage.selectPaymentMethod('braspag_pagador_boleto')
        checkoutPage.finalizeOrder()
    })
})