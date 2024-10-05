import { Asset, Inspection } from "../models";
import faker from "@fakerjs/faker";
import db from "../db";

const INS_TYPE_MAP = ["p", "l", "m"];

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
    const insType =
      INS_TYPE_MAP[Math.floor(Math.random() * INS_TYPE_MAP.length)];

    const identifier = faker().string();

    const asset = await Asset.create({
      identifier,
      type: insType,
      psr: insType === "p" ? identifier : null,
      lsr: insType === "l" ? identifier : null,
      mhn: insType === "m" ? identifier : null,
      x_min: -1 * (Math.floor(Math.random() * 100) + 1),
      x_max: Math.floor(Math.random() * 100) + 1,
    });

    const inspectionCount = Math.floor(Math.random() * maxInspectionCount + 1);
    for (let j = 0; j < inspectionCount; j++) {
      await Inspection.create({
        // @ts-ignore
        asset_id: asset.id,
        type: insType,
        psr: insType === "p" ? identifier : null,
        lsr: insType === "l" ? identifier : null,
        mhn: insType === "m" ? identifier : null,
      });
    }

    if (i % 1000 === 0) {
      console.log(`Created ${i} assets`);
    }
  }
}

export default populateDb;
