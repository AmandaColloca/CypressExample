const vdHomeElements = require('./elements').ELEMENTS;

class VendaDirigidaHomePage {
    go() {
        cy.visit('/')
        cy.get(vdHomeElements.cookiesAceptButton).click()
        cy.get('.loader-gif').should('not.be.visible')
        cy.get(vdHomeElements.title)
            .should('be.visible')
            // .should('have.text', '\n                    jun1            ')
            .should('have.text', '\n                    Vargas Mats. Para Construção            ')
    }
}

export default new VendaDirigidaHomePage;