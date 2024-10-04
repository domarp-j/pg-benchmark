import { Asset, Inspection } from "../models";
import faker from "@fakerjs/faker";
import db from "../db";

async function populateDb({
  assetCount,
  maxInspectionCount,
  clearDb = false,
}: {
  assetCount: number;
  maxInspectionCount: number;
  clearDb?: boolean;
}) {
  if (clearDb) {
    console.log("Clearing database...");
  }
  await db.sync({ force: clearDb });

  console.log("Creating assets and inspections...");

  for (let i = 0; i < assetCount; i++) {
    const insType = Math.floor(Math.random() * 3);
    const identifier = faker().string();

    const asset = await Asset.create({
      identifier,
      psr: insType === 0 ? faker().string() : null,
      lsr: insType === 1 ? faker().string() : null,
      mhn: insType === 2 ? faker().string() : null,
    });

    const inspectionCount = Math.floor(Math.random() * maxInspectionCount + 1);
    for (let j = 0; j < inspectionCount; j++) {
      await Inspection.create({
        // @ts-ignore
        asset_id: asset.id,
      });
    }

    if (i % 1000 === 0) {
      console.log(`Created ${i} assets`);
    }
  }
}

export default populateDb;
