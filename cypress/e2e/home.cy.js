describe('Home Page Tests', () => {
  const baseUrl = 'http://127.0.0.1:5500/home.html'; // Substitua pelo URL do seu projeto

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('should display the header title correctly', () => {
    cy.get('[data-cy="header-title"]')
      .should('be.visible')
      .and('contain.text', 'Undone');
  });

  it('should render all navbar links and validate their text', () => {
    const navbarLinks = [
      { selector: '[data-cy="navbar-link-home"]', text: 'Home' },
      { selector: '[data-cy="navbar-link-about"]', text: 'About' },
      { selector: '[data-cy="navbar-link-resources"]', text: 'Pricing' },
    ];

    navbarLinks.forEach(link => {
      cy.get(link.selector)
        .should('be.visible')
        .and('contain.text', link.text);
    });
  });

  it('should validate the video is visible and has correct attributes', () => {
    cy.get('[data-cy="video"]')
      .should('be.visible')
      .and('have.attr', 'autoplay')
      .and('have.attr', 'muted')
      .and('have.attr', 'loop');
  });

  it('should validate the main heading and subheading', () => {
    cy.get('[data-cy="main-heading"]')
      .should('be.visible')
      .and('contain.text', "Undone What you've done.");

    cy.get('[data-cy="sub-heading"]')
      .should('be.visible')
      .and('contain.text', 'Undone Your Bulls#*$!');
  });

  it('should validate the description text', () => {
    cy.get('[data-cy="description-text"]')
      .should('be.visible')
      .and('contain.text', 'Made a mistake? No worries!');
  });

  it('should validate the Pricing button', () => {
    cy.get('[data-cy="pricing-button"]')
      .should('be.visible')
      .and('contain.text', 'Pricing')
      .click();
  });

  it('should validate the navbar hover effects', () => {
    const navbarItems = [
      '[data-cy="navbar-item-home"]',
      '[data-cy="navbar-item-about"]',
      '[data-cy="navbar-item-resources"]',
    ];

    navbarItems.forEach(item => {
      cy.get(item)
        .trigger('mouseover')
        .should('have.css', 'transform', 'matrix(1.1, 0, 0, 1.1, 0, 0)'); // Verifica o efeito de scale
    });
  });

  it('should validate responsiveness for mobile view', () => {
    cy.viewport(375, 667); // Simula um dispositivo mobile (iPhone 6/7/8)
    cy.get('[data-cy="navbar-list"]').should('be.visible');
    cy.get('[data-cy="video"]').should('be.visible');
    cy.get('[data-cy="pricing-button"]').should('be.visible');
  });

  it('should validate responsiveness for tablet view', () => {
    cy.viewport(768, 1024); // Simula um dispositivo tablet (iPad)
    cy.get('[data-cy="navbar-list"]').should('be.visible');
    cy.get('[data-cy="video"]').should('be.visible');
    cy.get('[data-cy="pricing-button"]').should('be.visible');
  });

  it('should validate accessibility attributes', () => {
    cy.get('[data-cy="header-title"]').should('have.attr', 'aria-label', 'Website Title');
    cy.get('[data-cy="navbar"]').should('have.attr', 'aria-label', 'Main Navigation');
    cy.get('[data-cy="video"]').should('have.attr', 'aria-label', 'Promotional Video');
    cy.get('[data-cy="pricing-button"]').should('have.attr', 'aria-label', 'Pricing Button');
  });

  it('should validate the footer contact information', () => {
    cy.get('[data-cy="footer-email"]')
      .should('be.visible')
      .and('contain.text', 'gabrielvolponi11@gmail.com');

    cy.get('[data-cy="footer-phone"]')
      .should('be.visible')
      .and('contain.text', '+55 11 991287-9966');
  });

  it('should validate the footer social links', () => {
    const socialLinks = [
      '[data-cy="footer-link-facebook"]',
      '[data-cy="footer-link-twitter"]',
      '[data-cy="footer-link-instagram"]',
      '[data-cy="footer-link-linkedin"]',
    ];

    socialLinks.forEach(link => {
      cy.get(link)
        .should('be.visible')
        .trigger('mouseover')
        .should('have.css', 'color', 'rgb(34, 197, 94)'); // Verifica o hover verde
    });
  });

  it('should validate the pricing section cards', () => {
    const pricingCards = [
      { selector: '[data-cy="pricing-card-basic"]', title: 'Basic Plan', price: '$9.99/month' },
      { selector: '[data-cy="pricing-card-pro"]', title: 'Pro Plan', price: '$19.99/month' },
      { selector: '[data-cy="pricing-card-enterprise"]', title: 'Enterprise Plan', price: '$49.99/month' },
    ];

    pricingCards.forEach(card => {
      cy.get(card.selector).within(() => {
        cy.get('h3').should('contain.text', card.title);
        cy.get('p').should('contain.text', card.price);
        cy.get('button').should('be.visible').and('contain.text', 'Select Plan');
      });
    });
  });
});

// Testes para a seção Pricing
describe('Pricing Section Tests', () => {
  it('should display the pricing section heading', () => {
    cy.get('[data-cy="pricing-heading"]')
      .should('be.visible')
      .and('contain.text', 'Pricing Plans');
  });

  it('should render all pricing cards with correct content', () => {
    const pricingCards = [
      { selector: '[data-cy="pricing-card-basic"]', title: 'Basic Plan', price: '$9.99/month' },
      { selector: '[data-cy="pricing-card-pro"]', title: 'Pro Plan', price: '$19.99/month' },
      { selector: '[data-cy="pricing-card-enterprise"]', title: 'Enterprise Plan', price: '$49.99/month' },
    ];

    pricingCards.forEach(card => {
      cy.get(card.selector).within(() => {
        cy.get('h3').should('contain.text', card.title);
        cy.get('p').should('contain.text', card.price);
        cy.get('button').should('be.visible').and('contain.text', 'Select Plan');
      });
    });
  });

  it('should apply hover effects on pricing cards', () => {
    const pricingCards = [
      '[data-cy="pricing-card-basic"]',
      '[data-cy="pricing-card-enterprise"]',
    ];

    pricingCards.forEach(card => {
      cy.get(card).trigger('mouseover');
      cy.get(card).should('have.css', 'background-color', 'rgb(34, 197, 94)'); // Verifica o hover verde
    });
  });

  it('should highlight the Pro Plan card', () => {
    cy.get('[data-cy="pricing-card-pro"]')
      .should('have.css', 'transform', 'matrix(1.05, 0, 0, 1.05, 0, 0)') // Verifica o destaque com scale
      .and('have.css', 'background-color', 'rgb(34, 197, 94)'); // Verifica o fundo verde
  });
});

// Testes para o Footer
describe('Footer Tests', () => {
  it('should display social links with hover effects', () => {
    const socialLinks = [
      '[data-cy="footer-link-facebook"]',
      '[data-cy="footer-link-twitter"]',
      '[data-cy="footer-link-instagram"]',
      '[data-cy="footer-link-linkedin"]',
    ];

    socialLinks.forEach(link => {
      cy.get(link)
        .should('be.visible')
        .trigger('mouseover')
        .should('have.css', 'color', 'rgb(34, 197, 94)'); // Verifica o hover verde
    });
  });

  it('should display contact information', () => {
    cy.get('[data-cy="footer-email"]')
      .should('be.visible')
      .and('contain.text', 'gabrielvolponi11@gmail.com');

    cy.get('[data-cy="footer-phone"]')
      .should('be.visible')
      .and('contain.text', '+55 11 991287-9966');
  });

  it('should display the copyright text', () => {
    cy.get('[data-cy="footer-copyright"]')
      .should('be.visible')
      .and('contain.text', '© 2025 Undone. All rights reserved.');
  });
});

// Testes para Responsividade em Mobile
describe('Mobile View Tests', () => {
  beforeEach(() => {
    cy.viewport(375, 667); // Simula um dispositivo mobile (iPhone 6/7/8)
    cy.visit('http://127.0.0.1:5500/home.html'); // Substitua pelo URL do seu projeto
  });

  it('should display the navbar correctly in mobile view', () => {
    cy.get('[data-cy="navbar-list"]').should('be.visible');
    cy.get('[data-cy="navbar-link-home"]').should('contain.text', 'Home');
    cy.get('[data-cy="navbar-link-about"]').should('contain.text', 'About');
    cy.get('[data-cy="navbar-link-resources"]').should('contain.text', 'Resources');
    cy.get('[data-cy="navbar-link-contact"]').should('contain.text', 'Contact');
  });

  it('should display the main heading and subheading in mobile view', () => {
    cy.get('[data-cy="main-heading"]')
      .should('be.visible')
      .and('contain.text', "Undone What you've done.");
    cy.get('[data-cy="sub-heading"]')
      .should('be.visible')
      .and('contain.text', 'Undone Your Bulls#*$!');
  });

  it('should display the pricing section correctly in mobile view', () => {
    cy.get('[data-cy="pricing-heading"]')
      .should('be.visible')
      .and('contain.text', 'Pricing Plans');

    cy.get('[data-cy="pricing-card-basic"]').should('be.visible');
    cy.get('[data-cy="pricing-card-pro"]').should('be.visible');
    cy.get('[data-cy="pricing-card-enterprise"]').should('be.visible');
  });

  it('should display the footer correctly in mobile view', () => {
    cy.get('[data-cy="footer-email"]')
      .should('be.visible')
      .and('contain.text', 'gabrielvolponi11@gmail.com');
    cy.get('[data-cy="footer-phone"]')
      .should('be.visible')
      .and('contain.text', '+55 11 991287-9966');
    cy.get('[data-cy="footer-link-facebook"]').should('be.visible');
    cy.get('[data-cy="footer-link-twitter"]').should('be.visible');
    cy.get('[data-cy="footer-link-instagram"]').should('be.visible');
    cy.get('[data-cy="footer-link-linkedin"]').should('be.visible');
  });

  it('should ensure all elements are stacked vertically in mobile view', () => {
    cy.get('[data-cy="main-section"]').should('have.css', 'flex-direction', 'column');
    cy.get('[data-cy="about-section"]').should('be.visible');
    cy.get('[data-cy="pricing-section"]').should('be.visible');
    cy.get('[data-cy="footer"]').should('be.visible');
  });
});