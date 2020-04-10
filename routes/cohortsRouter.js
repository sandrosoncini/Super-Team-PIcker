const express = require("express");
const knex = require("../db/connection");

const router = express.Router();



router.get("/new", (request, response) => {
    response.render("cohorts/new");
  });

router.post("/", (request, response) => {
    const { name, members, logoUrl } = request.body;
    knex("cohorts")
      .insert({
        name,
        members,
        logoUrl,
      })
      .returning("*")
      .then((cohort) => {
        response.redirect("/cohorts");
    });
});

router.get("/", (request, response) => {
    knex("cohorts")
      .orderBy("createdAt", "desc")
      .then((cohorts) => {
        response.render("cohorts/index", { cohorts });
      });
});

router.get("/:id", (request, response) => {
    const id = request.params.id;
    knex("cohorts")
      .where("id", id)
      .first()
      .then((cohort) => {
        console.log(cohort);
        if (cohort) {
          response.render("cohorts/show", { cohort });
        } else {
          response.redirect("/cohorts");
        }
      });
  });

  module.exports = router;