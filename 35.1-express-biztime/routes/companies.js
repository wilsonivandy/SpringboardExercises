const express = require("express");
const db = require("../db");
const ExpressError = require("../expressError")
const router = new express.Router();
const slugify = require("slugify");

router.get('/', async (req, res, next) => {
    try {
        const results = await db.query(`SELECT code, name FROM companies`);
        return res.json(results.rows);
    } catch (err) {
        return next(err);
    }
});

router.get('/:code', async (req, res, next) => {
    try {
        const results = await db.query(
            `SELECT c.code, c.name, c.description, i.industry
                FROM companies as c
                    LEFT JOIN companies_industries as ci
                        ON c.code = ci.company_code
                    LEFT JOIN industries as i
                        ON ci.industry_code = i.code
                WHERE c.code=$1`, 
            [req.params.code]);
        let {code, name} = results.rows[0];
        industries = results.rows.map(r => r.industry)
        if (results.rows.length === 0) {
            throw new ExpressError('Company not found', 404)
        }
        return res.json({code, name, industries});
    } catch (err) {
        return next(err);
    }
});

router.post('', async (req, res, next) => {
    try {
        let { name, description } = req.body;
        let code = slugify(name, {
            remove: /[*+~.()'"!:@]/g,
            lower: true,
            strict: true
        });
        console.log(code);
        const results = await db.query(
            `INSERT INTO companies (code, name, description)
            VALUES ($1, $2, $3)
            RETURNING code, name, description`,
            [code, name, description]);
        return res.status(201).json({"company": results.rows[0]});
    } catch (err) {
        return next(err);
    }
});

router.put('/:code', async (req, res, next) => {
    try {
        let code = req.params.code;
        let { name, description } = req.body;
        const result = await db.query(
            `UPDATE companies
             SET name=$1, description=$2
             WHERE code = $3
             RETURNING code, name, description`,
          [name, description, code]);
        if (result.rows.length === 0) {
            throw new ExpressError('Company not found', 404)
        }
        return res.status(201).json({"company": result.rows[0]});
    } catch (err) {
        return next(err);
    }
});

router.delete("/:code", async function (req, res, next) {
    try {
      let code = req.params.code;
  
      const result = await db.query(
            `DELETE FROM companies
             WHERE code=$1
             RETURNING code`,
          [code]);
  
        if (result.rows.length === 0) {
            throw new ExpressError('Company not found', 404)
        }
        return res.json({"status": "deleted"});
      } catch (err) {
      return next(err);
    }
});

module.exports = router;