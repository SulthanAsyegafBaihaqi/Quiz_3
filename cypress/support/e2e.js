// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

//Handler untuk mengabaikan error tertentu dari aplikasi
Cypress.on('uncaught:exception', (err, runnable) => {
    // Mengabaikan error spesifik yang berkaitan dengan `response` undefined
    if (err.message.includes("Cannot read properties of undefined (reading 'response')")) {
        //menandakan Cypress agar tidak gagal karena error ini
        return false;
    }

    // selain itu, error tetap akan membuat test gagal
});