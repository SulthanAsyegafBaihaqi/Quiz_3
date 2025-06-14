describe('Verifikasi proses logout setelah login', () => {
    it('TC_006 - Verifikasi proses logout setelah login', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        //Action
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();

        //Assertion
        cy.get('.oxd-topbar-header-title').should('contain', 'Dashboard');

        //Action
        cy.get('.oxd-userdropdown-icon').click();

        //Assertion
        cy.get('a[href="/web/index.php/auth/logout"]')
            .should('be.visible')
            .and('contain', 'Logout')
            .click();

        //Verifikasi redirect ke halaman login setelah logout
        cy.url().should('include', '/auth/login');

    });
});