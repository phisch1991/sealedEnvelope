/// <reference types="Cypress" />
import i18n from '../../src/i18n/translations'

let baseUrl = 'localhost:3000'
const DE = i18n.de.translation

describe('Send', () => {
  it('should seal an envelope, show QR code and transfer via URL', () => {
    cy.visit(baseUrl)
    cy.get('#label').type('This is a label')
    cy.get('#message').type('This is a message')
    cy.get('#seal').click()
    cy.contains(DE.envelopeSealed)
    cy.get('#qrcode')
    cy.get('#urlTransfer')
      .should('have.attr', 'href')
      .then((href) => {
        cy.visit(href)
      })
    cy.contains(DE.envelopeImported)
  })
})
