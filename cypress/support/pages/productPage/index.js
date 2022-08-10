const productElements = require('./elements').ELEMENTS;

class ProductPage {
    go(productPage,productName) {
        cy.visit(productPage)
        cy.get(productElements.productName).should('be.visible').should('have.text', productName)
    }

    setQuantity(quantity) {
        cy.get(productElements.quantityField).should('be.visible').invoke('attr','value', quantity).should('have.attr', 'value', quantity)
    }

    addToCart(productName) {
        cy.get(productElements.addToCartButton).should('be.visible').click()
        cy.get(productElements.addToCartMessage)
            .should('be.visible')
            .should('have.text', '\nVocê adicionou '+productName+' para o seu carrinho de compras.')        
    }
}

export default new ProductPage;