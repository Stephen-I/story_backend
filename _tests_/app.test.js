describe("/api", () => {
  test("return array of character objects", () => {
    return request(app)
      .get("/api/charcters")
      .expect(200)
      .then(({ body }) => {
        expect(body.character).toHaveProperty("full_name");
        expect(body.character).toHaveProperty("species");
        expect(body.character).toHaveProperty("age");
        expect(body.character).toHaveProperty("gender");
        expect(body.character).toHaveProperty("");
        expect(body.character).toHaveProperty("votes");
        expect(body.character).toHaveProperty("category");
        expect(body.character).toHaveProperty("created_at");
        expect(body.character).toHaveProperty("owner");
      });
  });
});
