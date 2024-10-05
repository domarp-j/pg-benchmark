import { Sequelize } from "sequelize";

export const SQL_TIMEOUT = 10; // seconds

const benchmarkFile = Bun.file("./benchmark.csv");
export const benchmarkWriter = benchmarkFile.writer();

const db = new Sequelize(
  `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
  {
    benchmark: true,
    logging: async (query, time) => {
      console.log("-----------------------------------");
      console.log("QUERY");
      console.log(query);
      console.log("TIME (ms):", time);

      benchmarkWriter.write(`${time},\n`);
    },
    dialectOptions: {
      statement_timeout: SQL_TIMEOUT * 1000,
    },
  }
);

export default db;
