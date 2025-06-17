describe('verifikasi fitur admin', () => {
    const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

    beforeEach(() => {
        cy.visit(baseUrl);

        cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible').type('Admin');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();

        //Tunggu redirect selesai
        cy.url().should('include', '/dashboard');
    });

    // --- --- Verifikasi akses ke menu Admin --- ---
    it('TC_Admin_07 - Verifikasi akses ke menu Admin', () => {

        // membuka sidebar
        cy.get('.oxd-sidepanel-body')
            .contains('Admin')
            .click();
        cy.url().should('include', '/web/index.php/admin/viewSystemUsers');

        // verifikasi apakah halaman admin terdapat text System Users
        cy.get('h5').should('contain', 'System Users');
    });

    // --- --- Verifikasi Tambah User Baru --- ---
    it('TC_Admin_08 - Verifikasi tambah user baru', () => {

        // membuka sidebar
        cy.get('.oxd-sidepanel-body')
            .contains('Admin')
            .click();
        cy.get('button').contains('Add').click();

        // --- --- Isi form user baru --- --- 
        // Pilih User Role
        cy.get('.oxd-select-text').eq(0).click();
        cy.get('.oxd-select-dropdown').should('be.visible').contains('ESS').click();

        //input employee name "Baihaqi"
        cy.get('input[placeholder="Type for hints..."]', { timeout: 10000 }).type('Orange');
        cy.wait(1000);
        cy.get('.oxd-autocomplete-dropdown')
            .should('be.visible')
            .contains('Orange Test')
            .click();

        // Pilih Status
        cy.get('.oxd-select-text').eq(1).click();
        cy.get('.oxd-select-dropdown').should('be.visible').contains('Enabled').click();

        // Input Username
        cy.get('input.oxd-input.oxd-input--active').eq(1).type('BaihaqiQA1');

        // Input Password & Confirm Password
        cy.get('input[type="password"]').eq(0).type('Qa1234567');
        cy.get('input[type="password"]').eq(1).type('Qa1234567');

        // Checkin Password
        cy.get('.oxd-label').should('contain', 'Password');
        cy.get('.oxd-label').should('contain', 'Confirm Password');

        // Save Data Baru
        cy.get('button[type="submit"]').contains('Save').click();

        // Tunggu dan validasi
        cy.url({ timeout: 10000 }).should('include', '/admin/viewSystemUsers');
        cy.get('.oxd-table-body').should('contain', 'BaihaqiQA1');
    });

    // --- --- Verifikasi Search User --- ---
    it('TC_Admin_09 - Verifikasi pencarian user', () => {
        cy.get('.oxd-sidepanel-body')
            .contains('Admin')
            .click();

        // Search employee name
        cy.get('input[placeholder="Type for hints..."]').type('Orange Test');
        cy.get('button[type="submit"]')
            .contains('Search').click();

        // Validasi hasil pencarian
        cy.get('.oxd-table-body').should('contain', 'BaihaqiQA1');
    });

    // --- --- Verifikasi Hapus User --- ---
    it('TC_Admin_10 - Verifikasi hapus user', () => {
        cy.get('.oxd-sidepanel-body').contains('Admin').click();

        // Input Employee Name & Pastikan user muncul
        cy.get('input[placeholder="Type for hints..."]', { timeout: 10000 }).type('Orange');
        cy.get('.oxd-autocomplete-dropdown')
            .should('be.visible')
            .contains('Orange Test')
            .click();

        // Search Employee Name
        cy.get('button[type="submit"]').contains('Search', { timeout: 10000 }).click();

        // Cari barus yang mengandung 'Orange Test' lalu centang checkbox
        cy.get('.oxd-table-body').should('be.visible').contains('Orange Test');
        cy.get('.oxd-table-row').contains('Orange Test');
        cy.get('input[type="checkbox"]').eq(1).check({ force: true });

        // Klik tombol delete
        cy.get('button').contains('Delete').click();

        // Konfirmasi
        cy.get('button').contains('Yes, Delete', { timeout: 5000 }).click();

        // Validasi user sudah terhapus
        cy.get('.oxd-table-body').should('not.contain', 'Orange Test');
    });
});