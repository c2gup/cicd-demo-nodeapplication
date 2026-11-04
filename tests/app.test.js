const request = require("supertest");
const app = require("../src/app");

describe("API Endpoints", () => {
  // Test GET /
  describe("GET /", () => {
    it("should return Hello World!", async () => {
      const res = await request(app).get("/");
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe("Hello World!");
    });
  });

  // Test GET /health (Health Check)
  describe("GET /health", () => {
    it("should return status UP with uptime and timestamp", async () => {
      const res = await request(app).get("/health");
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe("UP");
      expect(res.body).toHaveProperty("uptime");
      expect(res.body).toHaveProperty("timestamp");
    });
  });

  // Test POST /user
  describe("POST /user", () => {
    it("should create a new user successfully", async () => {
      const res = await request(app)
        .post("/user")
        .send({ name: "Anupam", email: "anupam@example.com" });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("User added successfully");
      expect(res.body.user).toHaveProperty("id", 1);
      expect(res.body.user.name).toBe("Anupam");
      expect(res.body.user.email).toBe("anupam@example.com");
    });

    it("should return 400 if user data is missing or invalid", async () => {
      const res = await request(app)
        .post("/user")
        .send({ name: "NoEmail" });

      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe("Invalid user data");
    });
  });

  // Test GET /user
  describe("GET /user", () => {
    it("should return list of all users", async () => {
      const res = await request(app).get("/user");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  // Test GET /user/:id
  describe("GET /user/:id", () => {
    it("should allow access for user id 1", async () => {
      const res = await request(app).get("/user/1");
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Access granted");
      expect(res.body.user.id).toBe(1);
    });

    it("should deny access (403) for user id other than 1", async () => {
      const res = await request(app).get("/user/2");
      expect(res.statusCode).toBe(403);
      expect(res.body.message).toBe("Access denied");
    });
  });
});
