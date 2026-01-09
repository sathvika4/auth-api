const request = require("supertest");
const app = require("../server");

describe("Auth API", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/auth/register").send({
      email: "ciuser@example.com",
      password: "password123",
      role: "user",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("userId");
  });

  it("should login the user", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "ciuser@example.com",
      password: "password123",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
  });
});
