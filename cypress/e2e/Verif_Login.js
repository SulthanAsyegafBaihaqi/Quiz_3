describe('verifikasi akun login', () => {
  it('TC_001 - login dengan username & password valid', () => {

    //buka halaman login sesuai alamat url
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    //Action
    //login dengan username & password valid
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');

    //klik button login
    cy.get('button[type="submit"]').click();

    //Assertion
    //Verifikasi masuk ke Dashboard (mengecek apakah terdapat elemen memuat teks 'Dashboard')
    cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard');
  });


  it('TC_002 - login dengan username valid & password tidak valid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    //Action
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('123456789');
    cy.get('button[type="submit"]').click();

    //Assertion
    //Mengecek apakah elemen terlihat dan mememriksa apakah elemen memuat teks 'Invalid credentials'
    cy.get('.oxd-alert-content-text').should('be.visible').and('contain', 'Invalid credentials');
  });


  it('TC_003 - login dengan username tidak valid & password valid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    //Action
    cy.get('input[name="username"]').type('123admin');
    cy.get('input[name="password"]').type('123admin');
    cy.get('button[type="submit"]').click();

    //Assertion
    cy.get('.oxd-alert-content-text').should('be.visible').and('contain', 'Invalid credentials');
  });


  it('TC_004 - login dengan username & password tidak valid', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    //Action
    cy.get('input[name="username"]').type('Admintidakvalid');
    cy.get('input[name="password"]').type('passwordsalah123');
    cy.get('button[type="submit"]').click();

    //Assertion
    cy.get('.oxd-alert-content-text').should('be.visible').and('contain', 'Invalid credentials');
  });


  it('TC_005 - login dengan username valid & password kosong', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    //Action
    cy.get('button[type="submit"]').click();

    //Assertion
    cy.get('.oxd-input-group__message').should('be.visible').and('contain', 'Required');
  });

});