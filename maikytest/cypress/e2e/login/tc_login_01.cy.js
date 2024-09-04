describe("Maiky_Login", () => {
    it("Login success case", () => {
        const baseUrl = Cypress.config('baseUrl')
        cy.visit(baseUrl+"/login");
        cy.get("div:nth-of-type(1) > input").click();
        cy.get("div:nth-of-type(1) > input").type("admin@admin.com");
        cy.get("div:nth-of-type(2) > input").click();
        cy.get("div:nth-of-type(2) > input").type("password");
        cy.get("form > button").click();
        cy.location("href").should("eq", baseUrl+"/");
        cy.get(':nth-child(3) > .layout').should("have.text","This is explore page");
    });
});
