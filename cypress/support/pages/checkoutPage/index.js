import CreditCardFactory from "../../../factories/CreditCardFactory"
const checkoutElements = require('./elements').ELEMENTS;
import common from '../common'

class CheckoutPage {
    go() {
        cy.visit('/checkout')
    }

    selectQuotation(quotationOption) {
        // TIPOS DE COTAÇÃO:
        // cheaper
        // faster_delivery
        // best_rated
        // combined_price
        if (quotationOption == 'cheaper') {
            cy.get(checkoutElements.cheaperSelectQuotationButton)
            .should('be.visible')
            .click()
        }
        else if (quotationOption == 'faster_delivery') {
            cy.get(checkoutElements.fasterDeliverySelectQuotationButton)
            .should('be.visible')
            .click()
        }
        else if (quotationOption == 'best_rated') {
            cy.get(checkoutElements.bestRatedSelectQuotationButton)
            .should('be.visible')
            .click()
        }
        else {
            cy.get(checkoutElements.combinedPriceSelectQuotationButton)
            .should('be.visible')
            .click()
        }

        cy.get(checkoutElements.shippingStepTitle)
            .should('be.visible')
            .should('have.text', 'Endereço para entrega')
    }

    fillShippingFields(customer, person_type) {
        // Usuário Guest
        if (person_type == 'guest') {
            cy.get(checkoutElements.emailField).should('be.visible').click().clear().type(customer.email)
            cy.wait(3000)
            
            // TIPOS DE PESSOA:
            // fisical
            // legal
            cy.get(checkoutElements.personTypeSelect).should('be.visible').select(customer.person_type)
            cy.get(checkoutElements.cpfField).should('be.visible').click().clear().type(customer.cpf)
            cy.get(checkoutElements.nameField).should('be.visible').click().clear().type(customer.first_name)
            cy.get(checkoutElements.lastNameField).should('be.visible').click().clear().type(customer.last_name)
            cy.get(checkoutElements.telephoneField).should('be.visible').click().clear().type(customer.telephone)
        }
        // Usuário Logado sem endereço cadastrado
        else if (person_type == 'without_address') {
            cy.get(checkoutElements.telephoneField).should('be.visible').click().clear().type(customer.telephone)
        }
    }

    goToPayment() {
        // Tentando não ficar travado apos o click
        // usando tab para chegar ao elemento e enter
        // cy.focused().tab().tab().type('{enter}')
        cy.wait(2000)
        cy.get(checkoutElements.finishOrderButton).should('be.visible')
        cy.get(checkoutElements.finishOrderButton).click({ force: true })
        
        cy.get(checkoutElements.loaderGif).should('not.be.visible')
        cy.get(checkoutElements.paymentStepTitle)
            .should('be.visible')
            .should('have.text', 'Método de pagamento')
    }

    selectPaymentMethod(paymentMethod) {
        // METODOS DE PAGAMENTO:
        // braspag_pagador_boleto
        // braspag_pagador_creditcard
        // cashondelivery      
        if (paymentMethod == 'braspag_pagador_boleto') {
            cy.get(checkoutElements.boletoRadio).should('be.visible').click()
        }
        else if (paymentMethod == 'braspag_pagador_creditcard') {
            cy.get(checkoutElements.creditCardRadio).should('be.visible').click()
        }
        else {
            cy.get(checkoutElements.cashOnDeliveryRadio).should('be.visible').click()
        }
    }

    fillCreditCardFields(card, installments) {
        var card = CreditCardFactory.creditcard()

        cy.get(checkoutElements.ccNumberField)
            .should('be.visible')
            .click().clear().type(card.number)
        cy.get(checkoutElements.ccOwnerField)
            .should('be.visible')
            .click().clear().type(card.owner)
        cy.get(checkoutElements.ccMonthField)
            .should('be.visible')
            .select(card.expMonth)
        cy.get(checkoutElements.ccYearField)
            .should('be.visible')
            .select(card.expYear.toString())
        cy.get(checkoutElements.ccCvvField)
            .should('be.visible')
            .click().clear().type(card.cvv)
        cy.get(checkoutElements.ccInstalmentsSelect)
            .should('be.visible')
            .select(installments)
    }

    finalizeOrder() {
        cy.get(checkoutElements.placeOrderButton)
            .should('be.visible')
            .click()
        cy.scrollTo('top')

        // cy.get('body[data-container="body"] .loading-mask .loader > img').should('not.be.visible')
        cy.get(checkoutElements.sucessfulMessageTitle)
            .should('be.visible')
            .should('have.text', 'Obrigado por sua compra!')
    }

    checkRegisteredEmail() {
        cy.get(checkoutElements.emailRegisteredMessage)
            .should('be.visible')
            .should('have.text', 'Você já tem uma conta conosco. Digite sua senha ou prossiga com o preenchimento dos demais dados.')
    }

    checkQuotationSellers(quotation, sellerA, sellerB) {
        // if (quotation == 'cheaper'){
        //     cy.contains(checkoutElements.sellerNameCheaperQuotation, sellerA)
        //         .should('be.visible')
        //     cy.contains(checkoutElements.sellerNameCheaperQuotation, sellerB)
        //         .should('be.visible')
        // }
        // else if (quotation == 'faster_delivery') {
        //     cy.contains(checkoutElements.sellerNameFasterDeliveryQuotation, sellerA)
        //         .should('be.visible')
        //     cy.contains(checkoutElements.sellerNameFasterDeliveryQuotation, sellerB)
        //         .should('be.visible')
        // }
        // else if (quotation == 'best_rated') {
        //     cy.contains(checkoutElements.sellerNameBestRatedQuotation, sellerA)
        //         .should('be.visible')
        //     cy.contains(checkoutElements.sellerNameBestRatedQuotation, sellerB)
        //         .should('be.visible')
        // }
        // else {
        //     cy.contains(checkoutElements.sellerNameCombinedPriceQuotation, sellerA)
        //         .should('be.visible')
        //     cy.contains(checkoutElements.sellerNameCombinedPriceQuotation, sellerB)
        //         .should('be.visible')
        // }
    }

    fillLoginFields(email, password) {
        common.typeCustom(checkoutElements.emailField,email)
        common.typeCustom(checkoutElements.passwordField,password)
    }

    submitLogin(customerName) {
        cy.get(checkoutElements.submitLoginButton)
            .should('be.visible')
            .click()

        cy.wait(10000)

        cy.get(checkoutElements.customerNameLogged)
            .should('have.value', customerName)
    }

    fillCupomField(cupom,amount) {
        cy.get(checkoutElements.cupomOpen).should('be.visible').click()
        cy.get(checkoutElements.cupomField).should('be.visible').click().clear().type(cupom)
        cy.get(checkoutElements.cupomSubmit).should('be.visible').click()

        cy.get(checkoutElements.cupomMessage)
            .should('be.visible')
            .should('have.text', 'Seu cupom foi aplicado com sucesso.')

        cy.contains(checkoutElements.cupomSummary, cupom)
            .should('be.visible')
        cy.contains(checkoutElements.cupomAmount, '-R$' + amount)
            .should('be.visible')
    }
}

export default new CheckoutPage;