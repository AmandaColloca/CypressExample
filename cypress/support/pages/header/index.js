const headerElements = require('./elements').ELEMENTS;
const loginElements = require('../loginPage/elements').ELEMENTS;
const searchElements = require('../searchPage/elements').ELEMENTS;
const cartElements = require('../cartPage/elements').ELEMENTS;
const homeElements = require('../homePage/elements').ELEMENTS;


import common from '../common'

class HeaderPage {
    goToLogin() {
        cy.get(headerElements.loginButton).should('be.visible').click()
        cy.get(loginElements.title).should('have.text', 'Acesse sua conta')
    }

    searchProduct(product) {
        common.typeCustom(headerElements.searchBar, product + '{enter}')
        cy.get(searchElements.loaderGif).should('not.be.visible')
        cy.contains(searchElements.resultTitle, "Resultados da busca por: '" + product + "'").should('be.visible')
    }

    openMiniCart() {
        cy.get(headerElements.miniCartIcon).should('be.visible').click()
    }

    openCart() {
        cy.get(headerElements.miniCartIcon).should('be.visible').click()
        cy.get(headerElements.cartButton).should('be.visible').click()
        cy.contains('Buscaremos as lojas com as melhores ofertas da região e apresentaremos os preços finais para sua escolha.')
        cy.contains('Sua obra está no CEP: ')
    }

    openCartVendaDirigida() {
        cy.get(headerElements.miniCartIcon).should('be.visible').click()
        cy.get(headerElements.cartButton).should('be.visible').click()
        cy.contains('Carrinho de compras').should('be.visible')
        cy.get(cartElements.subtotalPrice).should('be.visible')
    }

    goToQuotation() {
        cy.get(headerElements.goToCheckoutButton).should('be.visible').click()

        cy.get('.loader > img').should('not.be.visible')
        cy.contains('Mais barato').should('be.visible')
        cy.wait(2000)
    }

    goToCheckout() {
        cy.get(headerElements.goToCheckoutButton).should('be.visible').click()
        // cy.contains('entrega', { matchCase: false })
        cy.url().should('include','/checkout/#delivery')
    }

    goToCheckoutShippingStep() {
        cy.get(headerElements.goToCheckoutButton).should('be.visible').click()
        // cy.contains('entrega', { matchCase: false })
        cy.url().should('include','/checkout/#shipping')
    }

    logout() {
        cy.get(headerElements.accountButton).should('be.visible').click()
        cy.get(headerElements.logoutButton).should('be.visible').click()
        cy.get(homeElements.titleLandingPage)
            .should('be.visible')
            .should('have.text', 'Compare e compre os produtos para sua obra nas melhores lojas')
    }

    logoutVD() {
        cy.get(headerElements.accountButton).should('be.visible').click()
        cy.get(headerElements.logoutButton).should('be.visible').click()
        cy.contains('Seu Login foi finalizado')
            .should('be.visible')
    }
}

export default new HeaderPage;