import productPage from '../../support/pages/productPage'
import header from '../../support/pages/header'
import searchPage from '../../support/pages/searchPage'
import cartPage from '../../support/pages/cartPage'
import vendaDirigidaHomePage from '../../support/pages/vendaDirigidaHomePage'

import customerFactory from '../../factories/CustomerFactory'
import productFactory from '../../factories/ProductFactory'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Venda Dirigida - Cart', () => {

    beforeEach(function () {
    })

    afterEach(function () {
        if (this.currentTest.state == 'passed') {
            cy.screenshot()
        }
    })

    it('CT 1 - Cart - Validar produtos', { tags: ['cart', 'vendaDirigida'] }, function () {
        var quantity = '5'
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Pesquisar produto e adicionar no carrinho
        header.searchProduct(product.name)
        searchPage.checkSearchResults(product.name)
        searchPage.openSearchedProduct(product.name, product.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(product.name)

        // Abrir Carrinho
        header.openCartVendaDirigida()

        // Validar produto
        cartPage.checkProduct(product.name)
        // Validar quantidade do produto
        cartPage.checkQuantity(product.code, quantity)
    })

    it('CT 2 - Cart - Modificar quantidade', { tags: ['cart', 'vendaDirigida'] }, function () {
        var quantityA = '5'
        var quantityB = '10'
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Pesquisar produto e adicionar no carrinho
        header.searchProduct(product.name)
        searchPage.checkSearchResults(product.name)
        searchPage.openSearchedProduct(product.name, product.page)
        productPage.setQuantity(quantityA)
        productPage.addToCart(product.name)

        // Abrir Carrinho
        header.openCartVendaDirigida()

        // Modificar quantidade
        cartPage.modifyQuantityCart(product.code, quantityB)
        // Validar quantidade dos produtos
        cartPage.checkQuantity(product.code, quantityB)
    })

    it('CT 3 - Cart - Remover item', { tags: ['cart', 'vendaDirigida'] }, function () {
        var quantity = '5'
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Pesquisar produto e adicionar no carrinho
        header.searchProduct(product.name)
        searchPage.checkSearchResults(product.name)
        searchPage.openSearchedProduct(product.name, product.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(product.name)

        // Abrir Carrinho
        header.openCartVendaDirigida()

        // Remover item
        cartPage.removeItemCart(product.name)
        // Validar produtos
        cartPage.itemNotExist(product.name)
    })

    it('CT 4 - Cart - Limpar carrinho', { tags: ['cart', 'vendaDirigida'] }, function () {
        var quantity = '5'
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Pesquisar produto e adicionar no carrinho
        header.searchProduct(product.name)
        searchPage.checkSearchResults(product.name)
        searchPage.openSearchedProduct(product.name, product.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(product.name)

        // Abrir Carrinho
        header.openCartVendaDirigida()

        // Limpar carrinho
        cartPage.emptyCart()
    })

    it('CT 8 - Cart - Aplicar Cupom', { tags: ['cart', 'vendaDirigida'] }, function () {
        var quantity = '5'
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Pesquisar produto e adicionar no carrinho
        header.searchProduct(product.name)
        searchPage.checkSearchResults(product.name)
        searchPage.openSearchedProduct(product.name, product.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(product.name)

        // Abrir Carrinho
        header.openCartVendaDirigida()

        // Compartilhar carrinho (E-mail)
        cartPage.applyCoupon('OBRA50','50,00')
    })

    it('CT 9 - Cart - Continuar para checkout', { tags: ['cart', 'vendaDirigida'] }, function () {
        var quantity = '5'
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Pesquisar produto e adicionar no carrinho
        header.searchProduct(product.name)
        searchPage.checkSearchResults(product.name)
        searchPage.openSearchedProduct(product.name, product.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(product.name)

        // Abrir Carrinho
        header.openCartVendaDirigida()

        // Continuar para o checkout
        cartPage.goToCheckoutVendaDirigida()
    })
})

describe('Venda Dirigida - Mini Cart', () => {

    beforeEach(function () {
    })

    afterEach(function () {
        if (this.currentTest.state == 'passed') {
            cy.screenshot()
        }
    })

    it('CT 1 - Mini Cart - Validar produtos', { tags: ['miniCart', 'vendaDirigida'] }, function () {
        var quantity = '5'
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Pesquisar produto e adicionar no carrinho
        header.searchProduct(product.name)
        searchPage.checkSearchResults(product.name)
        searchPage.openSearchedProduct(product.name, product.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(product.name)

        // Abrir Mini Cart
        header.openMiniCart()

        // Validar produto
        cartPage.checkProduct(product.name)
        // Validar quantidade do produto
        cartPage.checkQuantity(product.code, quantity)
    })

    it('CT 2 - Mini Cart - Modificar quantidade', { tags: ['miniCart', 'vendaDirigida'] }, function () {
        var quantityA = '5'
        var quantityB = '10'
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Pesquisar produto e adicionar no carrinho
        header.searchProduct(product.name)
        searchPage.checkSearchResults(product.name)
        searchPage.openSearchedProduct(product.name, product.page)
        productPage.setQuantity(quantityA)
        productPage.addToCart(product.name)

        // Abrir Cart
        header.openMiniCart()

        // Modificar quantidade
        cartPage.modifyQuantityMiniCart(product.code, quantityB)
        // Validar quantidade dos produtos
        cartPage.checkQuantity(product.code, quantityB)
    })

    it('CT 3 - Mini Cart - Remover item', { tags: ['miniCart', 'vendaDirigida'] }, function () {
        var quantity = '5'
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Pesquisar produto e adicionar no carrinho
        header.searchProduct(product.name)
        searchPage.checkSearchResults(product.name)
        searchPage.openSearchedProduct(product.name, product.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(product.name)

        // Abrir Cart
        header.openMiniCart()

        // Remover item
        cartPage.removerItemMiniCart(product.name)
        // Validar produto
        cartPage.itemNotExist(product.name)
    })

    it('CT 4 - Mini Cart - Limpar carrinho', { tags: ['miniCart', 'vendaDirigida'] }, function () {
        var quantity = '5'
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Pesquisar produto e adicionar no carrinho
        header.searchProduct(product.name)
        searchPage.checkSearchResults(product.name)
        searchPage.openSearchedProduct(product.name, product.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(product.name)

        // Abrir Cart
        header.openMiniCart()

        // Limpar carrinho
        cartPage.emptyMiniCart()
    })

/*     it('CT 5 - Mini Cart - Compartilhar carrinho (E-mail)', { tags: ['miniCart', 'vendaDirigida'] }, function () {
        var quantity = '5'
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Pesquisar produto e adicionar no carrinho
        header.searchProduct(product.name)
        searchPage.checkSearchResults(product.name)
        searchPage.openSearchedProduct(product.name, product.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(product.name)

        // Abrir Cart
        header.openMiniCart()

        // Compartilhar carrinho (E-mail)
        cartPage.shareCartEmail(customer.email,customer.first_name+' '+customer.last_name,customer.email,'Teste compartilhando carrinho')
    })

    it('CT 6 - Mini Cart - Compartilhar carrinho (Link)', { tags: ['miniCart', 'vendaDirigida'] }, function () {
        var quantity = '5'
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Pesquisar produto e adicionar no carrinho
        header.searchProduct(product.name)
        searchPage.checkSearchResults(product.name)
        searchPage.openSearchedProduct(product.name, product.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(product.name)

        // Abrir Cart
        header.openMiniCart()

        // Compartilhar carrinho (E-mail)
        cartPage.shareCartLink(customer.first_name+' '+customer.last_name,customer.email)
    })

    it('CT 7 - Mini Cart - Compartilhar carrinho (WhatsApp)', { tags: ['miniCart', 'vendaDirigida'] }, function () {
        var quantity = '5'
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Pesquisar produto e adicionar no carrinho
        header.searchProduct(product.name)
        searchPage.checkSearchResults(product.name)
        searchPage.openSearchedProduct(product.name, product.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(product.name)

        // Abrir Cart
        header.openMiniCart()

        // Compartilhar carrinho (E-mail)
        cartPage.shareCartWhatsApp(customer.first_name+' '+customer.last_name,customer.email)
    }) */

    // CT 8 NÃO APLICA PARA MINI CART

    it('CT 9 - Mini Cart - Continuar para checkout', { tags: ['miniCart', 'vendaDirigida'] }, function () {
        var quantity = '5'
        var product = productFactory.productVD()

        //Entrar na home
        vendaDirigidaHomePage.go()

        //Pesquisar produto e adicionar no carrinho
        header.searchProduct(product.name)
        searchPage.checkSearchResults(product.name)
        searchPage.openSearchedProduct(product.name, product.page)
        productPage.setQuantity(quantity)
        productPage.addToCart(product.name)

        // Abrir Cart
        header.openMiniCart()

        // Continuar para o checkout
        header.goToCheckout()
    })
})