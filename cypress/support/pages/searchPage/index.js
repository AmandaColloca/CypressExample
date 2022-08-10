const searchElements = require('./elements').ELEMENTS;

class SearchPage {
    checkSearchResults(product) {
        cy.contains(searchElements.results, product).should('be.visible')
    }

    openSearchedProduct(product, productURL) {
        cy.contains(searchElements.resultsName, product)
            .should('be.visible')
            .click()
        cy.url().should('include', productURL)
    }
}

export default new SearchPage;