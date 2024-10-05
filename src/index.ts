import db from "./db";
import populateDb from "./scripts/populate-db";
import benchmark from "./scripts/benchmark";

const ASSET_COUNT = 500000;
const MAX_INSPECTION_COUNT = 5;

async function main() {
  await db.authenticate();

  // NOTE: Enable with caution!
  // await populateDb({
  //   assetCount: ASSET_COUNT,
  //   maxInspectionCount: MAX_INSPECTION_COUNT,
  //   // clearDb: true, // NOTE: Enable with caution!
  // });

  await benchmark();
}

main();
