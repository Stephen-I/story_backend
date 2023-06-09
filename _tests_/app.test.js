const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const CharacterTestData = require("../db/test_data/index");
const CharacterData = require("../db/data/index");

beforeEach(() => seed(CharacterTestData));
afterAll(() => db.end());

describe("/api", () => {
  test("return request app", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body }) => {
        expect(body.message).toEqual("all ok");
      });
  });
  test("return array of character objects", () => {
    return request(app)
      .get("/api/charcters")
      .expect(200)
      .then(({ body }) => {
        expect(body.character).toHaveProperty("full_name");
        expect(body.character).toHaveProperty("species");
        expect(body.character).toHaveProperty("age");
        expect(body.character).toHaveProperty("gender");
        expect(body.character).toHaveProperty("unique_skill");
        expect(body.character).toHaveProperty("incarnate_drive");
        expect(body.character).toHaveProperty("extra");
        expect(body.character).toHaveProperty("story_section_id");
        expect(body.character).toHaveProperty("backstory");
      });
  });
});
