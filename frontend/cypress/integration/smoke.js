/// <reference types="Cypress" />
import i18n from '../../src/i18n/translations'

let baseUrl = 'localhost:3000'
const DE = i18n.de.translation
const EN = i18n.en.translation

describe('Smoke Test', () => {
  it('loads on /', () => {
    cy.visit(baseUrl)
  })
  it('Loads correct translation', () => {
    const translations = [
      { key: 'de', translation: DE },
      { key: 'en', translation: EN },
    ]
    translations.forEach(async (item) => {
      cy.visit(baseUrl + `?lng=${item.key}`)
      cy.contains(item.translation.send)
      cy.contains(item.translation.receive)
      cy.contains(item.translation.envelopes)
    })
  })
})
