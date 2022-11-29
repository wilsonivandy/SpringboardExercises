process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const db = require("../db");


let testCompanies;

beforeAll(async function() {
    let result = await db.query(`
      INSERT INTO
        companies (code, name, description) VALUES ('TestCode','TestName','TestDesc')
        RETURNING code, name, description`);
        testCompanies = result.rows[0];
  });

afterAll(async () => {
    await db.query("DELETE FROM companies");
    await db.end();
})

describe("GET /companies", function() {
    test("Gets a list of companies", async function() {
      const response = await request(app).get(`/companies`);
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual([
        {
            "code": "TestCode",
            "name": "TestName"
        }
    ]);
    });
});

describe("GET /companies/:code", function() {
  test("Gets company by code", async function() {
    const response = await request(app).get(`/companies/TestCode`);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([
      {
          "code": "TestCode",
          "description": "TestDesc",
          "name": "TestName"
      }
    ]);
  });
});

describe("POST /companies", function() {
  test("Creates a company", async function() {
    const response = await request(app).post(`/companies`).send({
      "code": "NewCode",
      "name": "NewName",
      "description": "NewDescription"
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      "company": {
        "code": "NewCode",
        "name": "NewName",
        "description": "NewDescription"
      }
    });
  });
});

describe("PUT /companies", function() {
  test("Updates a company", async function() {
    const response = await request(app).put(`/companies/TestCode`).send({
      "code": "TestCode",
      "name": "UpdatedName",
      "description": "UpdatedDescription"
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      "company": {
        "code": "TestCode",
        "name": "UpdatedName",
        "description": "UpdatedDescription"
      }
    });
  });
});

describe("DELETE /companies", function() {
  test("Deletes a company", async function() {
    const response = await request(app).delete(`/companies/TestCode`)
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      "status": "deleted"
    });
  });
});