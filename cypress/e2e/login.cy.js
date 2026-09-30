/**
 * Skenario pengujian E2E:
 *
 * - Login spec
 *  - should display login page correctly
 *  - should display alert when email and password are wrong
 *  - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login page correctly', () => {
    // memverifikasi elemen halaman login terlihat
    cy.get('input[placeholder="nama@email.com"]').should('be.visible');
    cy.get('input[placeholder="Minimal 6 karakter"]').should('be.visible');
    cy.get('button').contains('Masuk Sekarang').should('be.visible');
  });

  it('should display alert when email and password are wrong', () => {
    // mengisi email dan password yang salah
    cy.get('input[placeholder="nama@email.com"]').type('invalid_user_999@test.com');
    cy.get('input[placeholder="Minimal 6 karakter"]').type('wrongpassword');

    // menekan tombol submit
    cy.get('button').contains('Masuk Sekarang').click();

    // memverifikasi window alert terpanggil dengan pesan error
    cy.on('window:alert', (text) => {
      expect(text).to.contain('email or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', () => {
    // mengisi kredensial login (menggunakan akun valid di Forum API atau intercept)
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'User authenticated',
        data: {
          token: 'fake-access-token-12345',
        },
      },
    }).as('loginRequest');

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'ok',
        data: {
          user: {
            id: 'user-cypress',
            name: 'Cypress Tester',
            email: 'cypress@test.com',
            avatar: 'https://generated-image-url.jpg',
          },
        },
      },
    }).as('meRequest');

    cy.get('input[placeholder="nama@email.com"]').type('cypress@test.com');
    cy.get('input[placeholder="Minimal 6 karakter"]').type('password123');
    cy.get('button').contains('Masuk Sekarang').click();

    // memverifikasi navigasi ke homepage dan nama user ditampilkan
    cy.get('.user-name').should('be.visible');
    cy.get('.user-name').should('contain', 'Cypress Tester');
  });
});
