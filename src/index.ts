import db from "./db";
import { Asset, Inspection } from "./models";
import populateDb from "./scripts/populate-db";

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

  console.log(await Asset.count());
  console.log(await Inspection.count());
}

main();
