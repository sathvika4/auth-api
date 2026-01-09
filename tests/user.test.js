const request = require("supertest");
const app = require("../server");

let token;

beforeAll(async () => {
  // Register & login user to get token
  await request(app).post("/auth/register").send({
    email: "testuser@example.com",
    password: "password123",
    role: "user",
  });
  const res = await request(app).post("/auth/login").send({
    email: "testuser@example.com",
    password: "password123",
  });
  token = res.body.accessToken;
});

describe("User Routes", () => {
  it("should get profile with valid token", async () => {
    const res = await request(app)
      .get("/users/profile")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("user");
  });

  it("should forbid access to admin route for user role", async () => {
    const res = await request(app)
      .get("/users/admin")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
  });
});
