const express = require("express");
const knex = require("../db/connection");
const teamList = require("../db/teams");

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
    const {quantity, method}  = request.query
    knex("cohorts")
      .where("id", id)
      .first()
      .then((cohort) => {
        console.log(cohort);
        if (cohort) {
          response.render("cohorts/show", { 
            cohort, 
            method,
            group:  teamList(cohort.members, method, quantity)
          });
        } else {
          response.redirect("/cohorts");
        }
      });
  });

  router.delete("/:id", (request, response) => {
    knex("cohorts")
      .where("id", request.params.id)
      .del()
      .then(() => {
        response.redirect("/cohorts");
      });
  });

  router.get("/:id/edit", (request, response) => {
    knex("cohorts")
      .where("id", request.params.id)
      .first()
      .then((cohort) => {
        console.log(cohort.members)
        response.render("cohorts/edit", { cohort });
      });
  });

  router.patch("/:id", (request, response) => {
    const { logoUrl, members, name } = request.body;
    const updatedCohort = {
      logoUrl,
      members,
      name,
    };
    knex("cohorts")
      .where("id", request.params.id)
      .update(updatedCohort)
      .then(() => {
        response.redirect(`/cohorts/${request.params.id}`);
      });
  });

  

  module.exports = router;