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
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    identifier: {
      type: DataTypes.STRING,
      allowNull: false,
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
    x_min: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    x_max: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
