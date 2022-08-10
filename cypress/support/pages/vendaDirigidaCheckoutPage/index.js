const vdCheckoutElements = require('./elements').ELEMENTS;
import common from '../common'

class VendaDirigidaCheckoutPage {
    go() {
        cy.visit('/checkout/')
        cy.url().should('include', '/checkout/')
    }

    fillShippingFields(address) {
        // cy.get('input[data-bind*="value: addressStreet"]').should('be.visible').click().clear().type(address.street+' '+address.district+' '+address.city+' '+address.state+' '+address.cep)
        // cy.wait(1000)
        // cy.get('input[data-bind*="value: addressStreet"]').click().clear().type('{downarrow}{enter}') 
        // cy.get('input[data-bind*="value: addressNumber"]').should('be.visible').click().clear().type(' '+address.streetNumber)    
        common.typeCustom(vdCheckoutElements.addressField,address.street+' '+address.district+' '+address.city+' '+address.state+' '+address.cep)
        cy.wait(1000)
        cy.get(vdCheckoutElements.addressField).click().type('{downarrow}{enter}') 
        common.typeCustom(vdCheckoutElements.streetNumberField,' '+address.streetNumber)   
    }

    calculateShippingSubmit() {
        cy.contains(vdCheckoutElements.calculateButton, 'Calcular frete')
            .should('be.visible')
            .click()
    }
}

export default new VendaDirigidaCheckoutPage;