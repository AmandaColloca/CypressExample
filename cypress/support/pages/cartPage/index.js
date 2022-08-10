const cartElements = require('./elements').ELEMENTS;
import common from '../common'

class CheckoutPage {
    checkProduct(productName) {
        cy.contains(cartElements.productName, productName).should('be.visible')
    }

    checkQuantity(productSKU, quantity) {
        cy.get('input[data-cart-item-id="' + productSKU + '"]')
            .should('be.visible').should('have.value', quantity)
    }

    modifyQuantityCart(productSKU, quantity) {
        cy.get(cartElements.productSKU + productSKU + '"]')
            .should('be.visible')
            .invoke('attr', 'value', quantity)


        cy.get(cartElements.productSKU + productSKU + '"]')
            .should('be.visible')
            .next()
            .click({ force: true })
    }

    modifyQuantityMiniCart(productSKU, quantity) {
        cy.get(cartElements.productSKU + productSKU + '"]')
            .should('be.visible')
            .clear()
            .type(quantity)

        cy.get(cartElements.productSKU + productSKU + '"]')
            .should('be.visible')
            .next()
            .click()
    }

    removeItemCart(productName) {
        cy.get(cartElements.productNameCart).contains(productName)
            .should('be.visible')
            .parent().parent().parent().parent().parent()
            .children(cartElements.itemActionsRow)
            .children(cartElements.td)
            .children(cartElements.div)
            .children(cartElements.removeCartButton)
            .click()
    }

    removerItemMiniCart(productName) {
        cy.get(cartElements.productNameMiniCart).contains(productName)
            .should('be.visible')
            .parent().parent()
            .children(cartElements.div)
            .children(cartElements.removeMiniCartButton)
            .click()

        cy.get(cartElements.removeConfirmationButton).should('be.visible').click()
    }

    itemNotExist(productName) {
        cy.contains(cartElements.productName, productName).should('not.exist')
    }

    emptyCart() {
        // if (cy.get('.subtitle.empty')) {

        // }
        // else {
            cy.get(cartElements.emptyCartButton).should('be.visible').click({ force: true })
            cy.get(cartElements.confirmEmptyCartButton).should('be.visible').click()
            cy.contains('Você não possui nenhum produto em seu carrinho de compras.').should('be.visible')
        // }
    }

    emptyMiniCart() {
        cy.get(cartElements.emptyMiniCartButton).should('be.visible').click({ force: true })
        cy.get(cartElements.confirmEmptyCartButton).should('be.visible').click()
        cy.contains('Você não possui nenhum produto em seu carrinho de compras.').should('be.visible')
    }

    shareCartEmail(recipientEmail, senderName, senderEmail, messageEmail) {
        cy.get(cartElements.shareCartButton).should('be.visible').click()
        cy.get(cartElements.emailButton).should('be.visible').click()
        cy.get(cartElements.recipientEmailField).should('be.visible').type(recipientEmail)
        cy.get(cartElements.senderNameEmailField).should('be.visible').type(senderName)
        cy.get(cartElements.senderEmailField).should('be.visible').type(senderEmail)
        cy.get(cartElements.messageEmailField).should('be.visible').type(messageEmail)
        cy.get(cartElements.submitShareCartEmailButton).should('be.visible').click({ force: true })
        cy.contains(cartElements.resultEmailMessage, 'Email enviado com sucesso.').should('be.visible')
    }

    shareCartLink(senderName, senderEmail) {
        cy.get(cartElements.shareCartButton).should('be.visible').click()
        cy.get(cartElements.linkButton).should('be.visible').click()
        cy.get(cartElements.senderNameLinkField).should('be.visible').type(senderName)
        cy.get(cartElements.senderEmailLinkField).should('be.visible').type(senderEmail)
        cy.get(cartElements.submitShareCartLinkButton).should('be.visible').click({ force: true })
        cy.get(cartElements.copyLinkButton).should('exist').should('be.visible')
    }

    shareCartWhatsApp(senderName, senderEmail) {
        cy.get(cartElements.shareCartButton).should('exist').click()
        cy.get(cartElements.whatsappButton).should('be.visible').click()
        cy.get(cartElements.senderNameWhatsField).should('be.visible').type(senderName)
        cy.get(cartElements.senderEmailWhatsField).should('be.visible').type(senderEmail)
        cy.get(cartElements.submitShareCartWhatsButton).should('be.visible').click({ force: true })

        // cy.get(cartElements.submitShareCartWhatsButton).invoke('removeAttr', 'target').should('be.visible').click({ force: true })
        // cy.url()
        //     .should('include', 'web.whatsapp.com')
    }

    applyCoupon(coupon, amount) {
        cy.get(cartElements.couponButton).should('be.visible').click()
        cy.get(cartElements.couponCodeField).should('be.visible').type(coupon)
        cy.get(cartElements.applyCouponButton).should('be.visible').click()

        cy.contains(cartElements.message, 'Você usou o código de cupom "OBRA50".')
        cy.contains(cartElements.cartSummary, 'Desconto (' + coupon + ')')
            .should('be.visible')
        cy.contains(cartElements.cartSummary, '-R$' + amount)
            .should('be.visible')
    }

    goToCheckout() {
        cy.get(cartElements.goToCheckoutButton).should('be.visible').click()
        // cy.contains('#maincontent > div.columns > div > div.cart-container > div.cart-summary > ul > li:nth-child(1)','Continuar')
        //     .should('be.visible').click()
        cy.url().should('include', 'checkout/#quotation')
    }

    goToCheckoutVendaDirigida() {
        cy.get(cartElements.goToCheckoutVDButton).should('be.visible').click()
        cy.url().should('include', 'checkout/#delivery')
    }
}

export default new CheckoutPage;