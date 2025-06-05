/// <reference types="cypress"/>
import produtosPage from "../support/page-objects/produtos.page";
import {faker} from '@faker-js/faker';

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      produtosPage.visitarUrl()
  });

  it('Deve selecionar um produto da lista', () => {
    produtosPage.buscarProdutoLista('Aero Daily Fitness Tee')
    cy.get('#tab-title-description > a').should('contain', 'Descrição')
  });

  it('Deve adicionar o produto ao carrinho e fazer o checkout', () => {
    produtosPage.buscarProduto('Aero Daily Fitness Tee')
    produtosPage.addProdutoCarrinho('XS', 'Yellow', 4)
    cy.get('.woocommerce-message > .button').click()
    cy.get('.checkout-button').click()
    cy.get('#billing_first_name').type(faker.person.firstName())
    cy.get('#billing_last_name').type(faker.person.lastName())
    cy.get('#billing_address_1').type(faker.location.streetAddress())
    cy.get('#billing_city').type(faker.location.city())
    cy.get('#billing_postcode').type('88101-530')
    cy.get('#billing_phone').type('489849212')
    cy.get('#billing_email').type(faker.internet.email())
    cy.get('#payment_method_cod').click()
    cy.get('#terms').click()
    cy.get('#place_order').click()
    cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
  });


})
