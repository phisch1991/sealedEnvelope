/// <reference types="Cypress" />
import i18n from '../../src/i18n/translations'

let baseUrl = 'localhost:3000'
const DE = i18n.de.translation

describe('Letterbox', () => {
  it('Should show the letterbox', () => {
    cy.visit(baseUrl)
    cy.contains(DE.envelopes).click()
    cy.contains(DE.inbox)
  })
})
