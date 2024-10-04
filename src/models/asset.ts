import { DataTypes } from "sequelize";
import db from "../db";

const Asset = db.define(
  "asset",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    identifier: {
      type: DataTypes.STRING,
      allowNull: true,
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
        fields: ["identifier", "psr", "lsr", "mhn"],
      },
    ],
  }
);

export { Asset };
