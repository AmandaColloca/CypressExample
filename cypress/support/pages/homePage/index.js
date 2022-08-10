import { realType } from 'cypress-real-events/commands/realType';
import common from '../common'
const homeElements = require('./elements').ELEMENTS;
const loginElements = require('../loginPage/elements').ELEMENTS;
const headerElements = require('../header/elements').ELEMENTS;


class HomePage {
    go() {
        cy.visit('/')
        cy.get(homeElements.cookiesAceptButton).click()
        cy.get(homeElements.titleLandingPage)
            .should('be.visible')
            .should('have.text', 'Compare e compre os produtos para sua obra nas melhores lojas')
    }

    fillCep(cep) {
        //cy.get(homeElements.addressFieldLandingPage).should('be.visible').click().clear().type(cep)
        common.typeCustom(homeElements.addressFieldLandingPage,cep)
    }

    fillAddress(address) {
        // cy.get(homeElements.addressFieldLandingPage).should('be.visible').click().clear().type(address)
        // common.typeCustom(homeElements.addressFieldLandingPage,address)
        common.typeCustom(homeElements.addressFieldLandingPage,
                        address.street+' '+address.streetNumber+' '
                        +address.district+' '+address.city+' '
                        +address.state+' '+address.cep)
    }

    submit() {
        cy.get(homeElements.searchButtonLandingPage).should('be.visible').click()
    }

    cepShouldBe(cep) {
        // cy.get('.loader-gif').should('not.be.visible')
        cy.get(headerElements.postcodeLabel)
            .should('be.visible')
            .should('have.text', 'Sua obra está no CEP: ')
        //Para validar o CEP preciso tirar o "-"
        //AVERIGUAR COMO FAZER
        //cy.get(homeElements.postcode).should('have.text', cep)
    }

    alertMessageShouldBe(expectedMessage) {
        cy.get(homeElements.alertMessage)
            .should('be.visible')
            .should('have.text', expectedMessage)
    }
}

export default new HomePage;