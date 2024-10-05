import db from "../db";

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

async function benchmark() {
  const [results, metadata] = await inspectionQueries.byId();
}

export default benchmark;
