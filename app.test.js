const request = require("supertest");
const app = require("./app");

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  test("Sentence should contain 'is'", async () => {
    const response = await request(app).get("/");
    expect(response.text).toMatch(/is/);
  });
});
