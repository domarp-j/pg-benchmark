import db, { benchmarkWriter, SQL_TIMEOUT } from "../db";

const inspectionQueries = {
  byId: () =>
    db.query(`
      SELECT inspections.id as inspection_id, assets.id as asset_id
      FROM inspections
      LEFT JOIN assets
      ON assets.id = inspections.asset_id
      WHERE assets.x_max - assets.x_min > 50;
    `),
  byIdentifier: () =>
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
  byExplicitIdentifier: () =>
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
};

const assetQueries = {
  byId: () =>
    db.query(`
      SELECT assets.id as asset_id, inspections.id as inspection_id
      FROM assets
      LEFT JOIN inspections
      ON assets.id = inspections.asset_id
      WHERE inspections.length_surveyed >= 150;
    `),
  byIdentifier: () =>
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
  byExplicitIdentifier: () =>
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
};

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
      query: inspectionQueries.byId,
    });

    await runBenchmark({
      name: "inspection-query-by-identifier",
      query: inspectionQueries.byIdentifier,
    });

    await runBenchmark({
      name: "inspection-query-by-explicit-identifier",
      query: inspectionQueries.byExplicitIdentifier,
    });

    await runBenchmark({
      name: "asset-query-by-id",
      query: assetQueries.byId,
    });

    await runBenchmark({
      name: "asset-query-by-identifier",
      query: assetQueries.byIdentifier,
    });

    await runBenchmark({
      name: "asset-query-by-explicit-identifier",
      query: assetQueries.byExplicitIdentifier,
    });
  }
}

export default benchmark;
