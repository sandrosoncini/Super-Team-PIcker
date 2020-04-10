
exports.up = function(knex) {
   return knex.schema.createTable("cohorts", table => {
        table.increments("id"); // creats an autoincrement column named id ("id", SERIAL)
        table.string("name"); // "title" VARCHAR(255)
        table.text("members"); // "content" TEXT
        table.text("logoUrl");
        table.timestamp("createdAt").defaultTo(knex.fn.now());
   });  
};

exports.down = function(knex) {
    return knex.schema.dropTable("cohorts");
};
