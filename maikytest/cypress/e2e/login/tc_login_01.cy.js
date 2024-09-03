describe("Maiky_Login", () => {
    it("Login success case", () => {
        cy.viewport(1263, 242);
        cy.visit("http://119.59.99.163:8080/login");
        cy.get("div:nth-of-type(1) > input").click();
        cy.get("div:nth-of-type(1) > input").type("admin@admin.com");
        cy.get("div:nth-of-type(2) > input").click();
        cy.get("div:nth-of-type(2) > input").type("password");
        cy.get("form > button").click();
        cy.location("href").should("eq", "http://119.59.99.163:8080/");
        cy.get(':nth-child(3) > .layout').should("have.text","This is explore page");
    });
});
