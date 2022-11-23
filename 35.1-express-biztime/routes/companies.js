const express = require("express");
const db = require("../db");
const ExpressError = require("../expressError")
const router = new express.Router();

router.get('', async (req, res, next) => {
    try {
        const results = await db.query(`SELECT code, name FROM companies`);
        return res.json(results.rows);
    } catch (err) {
        return next(err);
    }
});

router.get('/:code', async (req, res, next) => {
    try {
        const results = await db.query(`SELECT code, name, description FROM companies WHERE code=$1`, [req.params.code]);
        if (results.rows.length === 0) {
            throw new ExpressError('Company not found', 404)
        }
        return res.json(results.rows);
    } catch (err) {
        return next(err);
    }
});

router.post('', async (req, res, next) => {
    try {
        let { code, name, description } = req.body;
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