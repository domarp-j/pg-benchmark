import { DataTypes } from "sequelize";
import db from "../db";
import { Asset } from "./asset";

const Inspection = db.define(
  "inspection",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    asset_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Asset,
        key: "id",
      },
    },
    psr: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lsr: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mhn: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    indexes: [
      {
        fields: ["psr", "lsr", "mhn"],
      },
    ],
  }
);

export { Inspection };
