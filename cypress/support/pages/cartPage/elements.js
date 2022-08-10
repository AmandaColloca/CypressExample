export const ELEMENTS = {
    productName: '.product-item-name',
    productSKU: 'input[data-cart-item-id="',
    // updateQuantityButton: 'button[title*="Atualizar"]',
    updateQuantityCartButton: '.action.update',
    updateQuantityMiniCartButton: '.update-cart-item',
    productNameCart: '#shopping-cart-table>tbody>tr>td>div>strong>a',
    productNameMiniCart: '#mini-cart>li>div>div>strong>a',
    removeConfirmationButton: '.action-primary > span',
    itemActionsRow: '.item-actions',
    td: 'td',
    div: 'div',
    removeCartButton: 'a[title="Remover item"]',
    removeMiniCartButton: '.secondary',
    emptyCartButton: '#empty_cart_button',
    confirmEmptyCartButton: 'button.action-primary.action-accept',
    emptyMiniCartButton: '#empty-minicart',
    
    shareCartButton: '#share-cart-btn-mini-cart',
    emailButton: '#share-cart-email > span',
    linkButton: '#share-cart-link > span',
    whatsappButton: '#share-cart-whatsapp > span',
    
    senderNameEmailField: '#share-cart-email-form > fieldset > div:nth-child(3) > div > input',
    recipientEmailField: '#recipient_email',
    senderEmailField: '#share-cart-email-form > fieldset > div:nth-child(4) > div > input',
    messageEmailField: '#message',
    submitShareCartEmailButton: '#share-cart-email-form > div.actions-toolbar > button',
    resultEmailMessage: '#share-cart-email-form > div.result > span',
    
    submitShareCartLinkButton: '#share-cart-link-form > div.actions-toolbar > button > span > span',
    copyLinkButton: '#copy-link-to-share',
    senderNameLinkField: '#share-cart-link-form > fieldset > div:nth-child(2) > div > input',
    senderEmailLinkField: '#share-cart-link-form > fieldset > div:nth-child(3) > div > input',

    senderNameWhatsField: '#share-cart-whatsapp-form > fieldset > div:nth-child(2) > div > input',
    senderEmailWhatsField: '#share-cart-whatsapp-form > fieldset > div:nth-child(3) > div > input',
    submitShareCartWhatsButton: '#share-cart-whatsapp-form > div.actions-toolbar > button',

    //couponButton: '#block-discount',
    couponButton: 'strong[id="block-discount-heading"]',
    couponCodeField: '#coupon_code',
    applyCouponButton: '#discount-coupon-form > div > div.actions-toolbar > div > button',
    message: '#maincontent > div.page.messages > div:nth-child(2) > div > div',

    cartSummary: '.cart-summary',

    // goToCheckoutButton: '#maincontent > div.columns > div > div.cart-container > div.cart-summary > ul > li:nth-child(1) > button > span'
    // goToCheckoutButton: 'button[data-role="proceed-to-checkout"]'
    // goToCheckoutButton: '#maincontent > div.columns > div > div.cart-container > div.cart-summary > ul > li:nth-child(1) > button'
    goToCheckoutButton: '#maincontent > div.columns > div > div.cart-container > div.cart-summary > ul > li:nth-child(1)',
    goToCheckoutVDButton: '#maincontent > div.columns > div > div.cart-container > div.cart-summary > ul > li > button',
    subtotalPrice: '#cart-totals > div > table > tbody > tr.totals.sub > td > span'
}