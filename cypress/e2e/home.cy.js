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
      { selector: '[data-cy="navbar-link-resources"]', text: 'Resources' },
      { selector: '[data-cy="navbar-link-contact"]', text: 'Contact' },
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
      '[data-cy="navbar-item-contact"]',
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

  // Novo caso de teste: Verificar acessibilidade
  it('should validate accessibility attributes', () => {
    cy.get('[data-cy="header-title"]').should('have.attr', 'aria-label', 'Website Title');
    cy.get('[data-cy="navbar"]').should('have.attr', 'aria-label', 'Main Navigation');
    cy.get('[data-cy="video"]').should('have.attr', 'aria-label', 'Promotional Video');
    cy.get('[data-cy="pricing-button"]').should('have.attr', 'aria-label', 'Pricing Button');
  });

  // Novo caso de teste: Verificar se o botão Pricing redireciona corretamente
  it('should redirect when Pricing button is clicked', () => {
    cy.get('[data-cy="pricing-button"]').click();
    cy.url().should('include', '/pricing'); // Substitua '/pricing' pelo caminho correto
  });

  // Novo caso de teste: Verificar se o vídeo carrega corretamente
  it('should validate the video loads successfully', () => {
    cy.get('[data-cy="video"]').should('have.prop', 'readyState').and('eq', 4); // Verifica se o vídeo está pronto para reprodução
  });
});