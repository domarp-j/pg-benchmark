import db, { benchmarkWriter, SQL_TIMEOUT } from "../db";

async function runBenchmark({
  name,
  query,
}: {
  name: string;
  query: () => Promise<[unknown[], unknown]>;
}) {
  benchmarkWriter.write(`${name},`);
  try {
    await query();
  } catch (err) {
    benchmarkWriter.write(`${SQL_TIMEOUT}s-timeout,\n`);
  }
}

async function benchmark({ runs }: { runs: number }) {
  for (let i = 0; i < runs; i++) {
    await runBenchmark({
      name: "inspection-query-by-id",
      query: () =>
        db.query(`
          SELECT inspections.id as inspection_id, assets.id as asset_id
          FROM inspections
          LEFT JOIN assets
          ON assets.id = inspections.asset_id
          WHERE assets.x_max - assets.x_min > 50;
        `),
    });
    await runBenchmark({
      name: "inspection-query-by-identifier",
      query: () =>
        db.query(`
          SELECT inspections.id as inspection_id, assets.id as asset_id
          FROM inspections
          LEFT JOIN assets
          ON (
            assets.identifier = inspections.psr
            OR assets.identifier = inspections.lsr
            OR assets.identifier = inspections.mhn
          )
          WHERE assets.x_max - assets.x_min > 50;
        `),
    });
    await runBenchmark({
      name: "inspection-query-by-explicit-identifier",
      query: () =>
        db.query(`
          SELECT inspections.id as inspection_id, assets.id as asset_id
          FROM inspections
          LEFT JOIN assets
          ON (
            assets.psr = inspections.psr
            OR assets.lsr = inspections.lsr
            OR assets.mhn = inspections.mhn
          )
          WHERE assets.x_max - assets.x_min > 50;
        `),
    });
    await runBenchmark({
      name: "inspection-query-by-union",
      query: () =>
        db.query(`
          SELECT inspections.id as inspection_id, assets.id as asset_id
          FROM inspections
          LEFT JOIN assets
          ON assets.psr = inspections.psr
          WHERE assets.x_max - assets.x_min > 50
          UNION ALL
          SELECT inspections.id as inspection_id, assets.id as asset_id
          FROM inspections
          LEFT JOIN assets
          ON assets.lsr = inspections.lsr
          WHERE assets.x_max - assets.x_min > 50
          UNION ALL
          SELECT inspections.id as inspection_id, assets.id as asset_id
          FROM inspections
          LEFT JOIN assets
          ON assets.mhn = inspections.mhn
          WHERE assets.x_max - assets.x_min > 50;
        `),
    });
    await runBenchmark({
      name: "asset-query-by-id",
      query: () =>
        db.query(`
          SELECT assets.id as asset_id, inspections.id as inspection_id
          FROM assets
          LEFT JOIN inspections
          ON assets.id = inspections.asset_id
          WHERE inspections.length_surveyed >= 150;
        `),
    });
    await runBenchmark({
      name: "asset-query-by-identifier",
      query: () =>
        db.query(`
          SELECT assets.id as asset_id, inspections.id as inspection_id
          FROM assets
          LEFT JOIN inspections
          ON (
            assets.identifier = inspections.psr
            OR assets.identifier = inspections.lsr
            OR assets.identifier = inspections.mhn
          )
          WHERE inspections.length_surveyed >= 150;
    `),
    });
    await runBenchmark({
      name: "asset-query-by-explicit-identifier",
      query: () =>
        db.query(`
          SELECT assets.id as asset_id, inspections.id as inspection_id
          FROM assets
          LEFT JOIN inspections
          ON (
            assets.psr = inspections.psr
            OR assets.lsr = inspections.lsr
            OR assets.mhn = inspections.mhn
          )
          WHERE inspections.length_surveyed >= 150;
        `),
    });
    await runBenchmark({
      name: "asset-query-by-union",
      query: () =>
        db.query(`
          SELECT assets.id as asset_id, inspections.id as inspection_id
          FROM assets
          LEFT JOIN inspections ON assets.psr = inspections.psr
          WHERE inspections.length_surveyed >= 150
          UNION ALL
          SELECT assets.id as asset_id, inspections.id as inspection_id
          FROM assets
          LEFT JOIN inspections ON assets.lsr = inspections.lsr
          WHERE inspections.length_surveyed >= 150
          UNION ALL
          SELECT assets.id as asset_id, inspections.id as inspection_id
          FROM assets
          LEFT JOIN inspections ON assets.mhn = inspections.mhn
          WHERE inspections.length_surveyed >= 150;
        `),
    });
  }
}

export default benchmark;
