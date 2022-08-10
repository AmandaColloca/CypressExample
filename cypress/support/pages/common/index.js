class Common {
    typeCustom(element,text) {
        cy.get(element).should('be.visible').clear().click()
        cy.get(element).type(text,{timeout: 4000})
    }
}

export default new Common;