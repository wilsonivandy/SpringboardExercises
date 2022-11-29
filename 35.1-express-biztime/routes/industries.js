const express = require("express");
const db = require("../db");
const ExpressError = require("../expressError")
const router = new express.Router();
const slugify = require("slugify");


router.get('/', async (req, res, next) => {
    try {
        let result = [];
        let industry_codes = await db.query(`SELECT code FROM industries`);
        industry_codes = industry_codes.rows;
        for (let i=0;i<industry_codes.length;i++){
            console.log([industry_codes[i].code])
            let results = await db.query(
                `SELECT i.code as industry_code, i.industry, c.code as company_code
                    FROM industries as i
                        LEFT JOIN companies_industries as ci
                            ON i.code = ci.industry_code
                        LEFT JOIN companies as c
                            ON ci.company_code = c.code
                    WHERE i.code = $1`, [industry_codes[i].code]
            );
            let {industry_code, name} = results.rows[0];
            let companies_codes = results.rows.map(r => r.company_code)
            result.push({industry_code, name, companies_codes});
            if (results.rows.length === 0) {
                throw new ExpressError('Company not found', 404)
            }
        }
        return res.json(result);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;