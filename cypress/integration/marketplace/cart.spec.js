import productPage from '../../support/pages/productPage'
import homePage from '../../support/pages/homePage'
import header from '../../support/pages/header'
import searchPage from '../../support/pages/searchPage'
import cartPage from '../../support/pages/cartPage'

import customerFactory from '../../factories/CustomerFactory'
import productFactory from '../../factories/ProductFactory'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Marketplace - Cart', () => {

    beforeEach(function () {
    })

    afterEach(function () {
        if (this.currentTest.state == 'passed') {
            cy.screenshot()
        }
    })

    it('CT 1 - Cart - Validar produtos', { tags: ['cart', 'marketplace'] }, function () {
        var customer = customerFactory.customer_sem()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()
        var quantity = '5'

        // Entrar na home e digitar cep
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productA.name)

        // Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productB.name)

        // Abrir Cart
        header.openCart()

        // Validar produtos
        cartPage.checkProduct(productA.name)
        cartPage.checkProduct(productB.name)
        // Validar quantidade dos produtos
        cartPage.checkQuantity(productA.code, quantity)
        cartPage.checkQuantity(productB.code, quantity)
    })

    it('CT 2 - Cart - Modificar quantidade', { tags: ['cart', 'marketplace'] }, function () {
        var customer = customerFactory.customer_sem()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()
        var quantityA = '5'
        var quantityB = '10'

        // Entrar na home e digitar cep
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity(quantityA)
        productPage.addToCart(productA.name)

        // Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity(quantityA)
        productPage.addToCart(productB.name)

        // Abrir Cart
        header.openCart()

        // Modificar quantidade
        cartPage.modifyQuantityCart(productA.code, quantityB)
        cartPage.modifyQuantityCart(productB.code, quantityB)
        // Validar quantidade dos produtos
        cartPage.checkQuantity(productA.code, quantityB)
        cartPage.checkQuantity(productB.code, quantityB)
    })

    it('CT 3 - Cart - Remover item', { tags: ['cart', 'marketplace'] }, function () {
        var customer = customerFactory.customer_sem()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()
        var quantity = '5'

        // Entrar na home e digitar cep
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productA.name)

        // Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productB.name)

        // Abrir Cart
        header.openCart()

        // Remover item
        cartPage.removeItemCart(productA.name)
        // Validar produtos
        cartPage.itemNotExist(productA.name)
        cartPage.checkProduct(productB.name)
    })

    it('CT 4 - Cart - Limpar carrinho', { tags: ['cart', 'marketplace'] }, function () {
        var customer = customerFactory.customer_sem()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()
        var quantity = '5'

        // Entrar na home e digitar cep
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productA.name)

        // Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productB.name)

        // Abrir Cart
        header.openCart()

        // Limpar carrinho
        cartPage.emptyCart()
    })

    it('CT 5 - Cart - Compartilhar carrinho (E-mail)', { tags: ['cart', 'marketplace'] }, function () {
        var customer = customerFactory.customer_sem()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()
        var quantity = '5'

        // Entrar na home e digitar cep
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productA.name)

        // Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productB.name)

        // Abrir Cart
        header.openCart()

        // Compartilhar carrinho (E-mail)
        cartPage.shareCartEmail(customer.email,customer.first_name+' '+customer.last_name,customer.email,'Teste compartilhando carrinho')
    })

    it('CT 6 - Cart - Compartilhar carrinho (Link)', { tags: ['cart', 'marketplace'] }, function () {
        var customer = customerFactory.customer_sem()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()
        var quantity = '5'

        // Entrar na home e digitar cep
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productA.name)

        // Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productB.name)

        // Abrir Cart
        header.openCart()

        // Compartilhar carrinho (E-mail)
        cartPage.shareCartLink(customer.first_name+' '+customer.last_name,customer.email)
    })

    it('CT 7 - Cart - Compartilhar carrinho (WhatsApp)', { tags: ['cart', 'marketplace'] }, function () {
        var customer = customerFactory.customer_sem()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()
        var quantity = '5'

        // Entrar na home e digitar cep
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productA.name)

        // Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productB.name)

        // Abrir Cart
        header.openCart()

        // Compartilhar carrinho (E-mail)
        cartPage.shareCartWhatsApp(customer.first_name+' '+customer.last_name,customer.email)
    })

    it('CT 8 - Cart - Aplicar Cupom', { tags: ['cart', 'marketplace'] }, function () {
        var customer = customerFactory.customer_sem()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()
        var quantity = '5'

        // Entrar na home e digitar cep
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productA.name)

        // Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productB.name)

        // Abrir Cart
        header.openCart()

        // Compartilhar carrinho (E-mail)
        cartPage.applyCoupon('OBRA50','50,00')
    })

    it('CT 9 - Cart - Continuar para checkout', { tags: ['cart', 'marketplace'] }, function () {
        var customer = customerFactory.customer_sem()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()
        var quantity = '5'

        // Entrar na home e digitar cep
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productA.name)

        // Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productB.name)

        // Abrir Cart
        header.openCart()

        // Continuar para o checkout
        cartPage.goToCheckout()
    })
})

describe('Marketplace - Mini Cart', () => {

    beforeEach(function () {
    })

    afterEach(function () {
        if (this.currentTest.state == 'passed') {
            cy.screenshot()
        }
    })

    it('CT 1 - Mini Cart - Validar produtos', { tags: ['miniCart', 'marketplace'] }, function () {
        var customer = customerFactory.customer_sem()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()
        var quantity = '5'

        // Entrar na home e digitar cep
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productA.name)

        // Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productB.name)

        // Abrir Mini Cart
        header.openMiniCart()

        // Validar produtos
        cartPage.checkProduct(productA.name)
        cartPage.checkProduct(productB.name)
        // Validar quantidade dos produtos
        cartPage.checkQuantity(productA.code, quantity)
        cartPage.checkQuantity(productB.code, quantity)
    })

    it('CT 2 - Mini Cart - Modificar quantidade', { tags: ['miniCart', 'marketplace'] }, function () {
        var customer = customerFactory.customer_sem()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()
        var quantityA = '5'
        var quantityB = '10'

        // Entrar na home e digitar cep
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity(quantityA)
        productPage.addToCart(productA.name)

        // Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity(quantityA)
        productPage.addToCart(productB.name)

        // Abrir Cart
        header.openMiniCart()

        // Modificar quantidade
        cartPage.modifyQuantityMiniCart(productA.code, quantityB)
        cartPage.modifyQuantityMiniCart(productB.code, quantityB)
        // Validar quantidade dos produtos
        cartPage.checkQuantity(productA.code, quantityB)
        cartPage.checkQuantity(productB.code, quantityB)
    })

    it('CT 3 - Mini Cart - Remover item', { tags: ['miniCart', 'marketplace'] }, function () {
        var customer = customerFactory.customer_sem()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()
        var quantity = '5'

        // Entrar na home e digitar cep
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productA.name)

        // Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productB.name)

        // Abrir Cart
        header.openMiniCart()

        // Remover item
        cartPage.removerItemMiniCart(productA.name)
        // Validar produto
        cartPage.itemNotExist(productA.name)
        cartPage.checkProduct(productB.name)
    })

    it('CT 4 - Mini Cart - Limpar carrinho', { tags: ['miniCart', 'marketplace'] }, function () {
        var customer = customerFactory.customer_sem()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()
        var quantity = '5'

        // Entrar na home e digitar cep
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productA.name)

        // Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productB.name)

        // Abrir Cart
        header.openMiniCart()

        // Limpar carrinho
        cartPage.emptyMiniCart()
    })

    it('CT 5 - Mini Cart - Compartilhar carrinho (E-mail)', { tags: ['miniCart', 'marketplace'] }, function () {
        var customer = customerFactory.customer_sem()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()
        var quantity = '5'

        // Entrar na home e digitar cep
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productA.name)

        // Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productB.name)

        // Abrir Cart
        header.openMiniCart()

        // Compartilhar carrinho (E-mail)
        cartPage.shareCartEmail(customer.email,customer.first_name+' '+customer.last_name,customer.email,'Teste compartilhando carrinho')
    })

    it('CT 6 - Mini Cart - Compartilhar carrinho (Link)', { tags: ['miniCart', 'marketplace'] }, function () {
        var customer = customerFactory.customer_sem()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()
        var quantity = '5'

        // Entrar na home e digitar cep
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productA.name)

        // Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productB.name)

        // Abrir Cart
        header.openMiniCart()

        // Compartilhar carrinho (E-mail)
        cartPage.shareCartLink(customer.first_name+' '+customer.last_name,customer.email)
    })

    it('CT 7 - Mini Cart - Compartilhar carrinho (WhatsApp)', { tags: ['miniCart', 'marketplace'] }, function () {
        var customer = customerFactory.customer_sem()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()
        var quantity = '5'

        // Entrar na home e digitar cep
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productA.name)

        // Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productB.name)

        // Abrir Cart
        header.openMiniCart()

        // Compartilhar carrinho (E-mail)
        cartPage.shareCartWhatsApp(customer.first_name+' '+customer.last_name,customer.email)
    })

    // CT 8 NÃO APLICA PARA MINI CART

    it('CT 9 - Mini Cart - Continuar para checkout', { tags: ['miniCart', 'marketplace'] }, function () {
        var customer = customerFactory.customer_sem()
        var productA = productFactory.product010A()
        var productB = productFactory.product010D()
        var quantity = '5'

        // Entrar na home e digitar cep
        homePage.go()
        homePage.fillCep(customer.address.cep)
        homePage.submit()
        homePage.cepShouldBe(customer.address.cep)

        //Adicionar Producto
        header.searchProduct(productA.name)
        searchPage.checkSearchResults(productA.name)
        searchPage.openSearchedProduct(productA.name, productA.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productA.name)

        // Adicionar Producto
        header.searchProduct(productB.name)
        searchPage.checkSearchResults(productB.name)
        searchPage.openSearchedProduct(productB.name, productB.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(productB.name)

        // Abrir Cart
        header.openMiniCart()

        // Continuar para o checkout
        header.goToQuotation()
    })
})