import express from "express";
import route from "./routes/route.js";
import cors from "cors";
import "dotenv/config";
import { sequelize } from "./database.js";
import { WaterQualityData } from "./models/at200.js";
import { WaterQualityDataSecond } from "./models/at500.js";
import { BatteryData } from "./models/vulink.js";
import cookieParser from "cookie-parser";

const app = express();

// Other middleware setup...
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "http://3.12.149.109:3000"
        : process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Mount the data routes
app.use("/api", route);

app.get("/api/waterqualityData", async (req, res) => {
  try {
    // Query the database for a single page of data
    const data = await WaterQualityData.findAll({
      limit: 30,
    });

    // Send the paginated data as JSON response
    res.json(data);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error fetching paginated data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/waterqualityData/Distinct", async (req, res) => {
  try {
    // Fetch unique combinations of Easting and Northing along with specific values of other columns
    const uniqueCoordinatesQuery = `
            SELECT DISTINCT "Easting", "Northing",
                   MIN("DateTime") AS "DateTime",
                   MIN("Salinity") AS "Salinity",
                   MIN("TotalDissolvedSolids") AS "TotalDissolvedSolids",
                   MIN("StationID") AS "StationID",
                   MIN("pH") AS "pH",
                   MIN("pHMV") AS "pHMV",
                   MIN("SaturationOxygen") AS "SaturationOxygen",
                   MIN("PartialPressureOxygen") AS "PartialPressureOxygen"
            FROM "WaterQualityData"
            GROUP BY "Easting", "Northing"
        `;
    const [uniqueCoordinates, metadataCoordinates] = await sequelize.query(
      uniqueCoordinatesQuery
    );

    // Send the unique data as JSON response
    res.json(uniqueCoordinates);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error fetching unique data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/waterqualityDataSecond/Distinct", async (req, res) => {
  try {
    // Fetch unique combinations of Easting and Northing along with specific values of other columns
    const uniqueCoordinatesQuery = `
            SELECT DISTINCT "Easting", "Northing",
                   MIN("DateTime") AS "DateTime",
                   MIN("Salinity") AS "Salinity",
                   MIN("TotalDissolvedSolids") AS "TotalDissolvedSolids",
                   MIN("StationID") AS "StationID"
            FROM "WaterQualityDataSeconds"
            GROUP BY "Easting", "Northing"
        `;
    const [uniqueCoordinates, metadataCoordinates] = await sequelize.query(
      uniqueCoordinatesQuery
    );

    // Send the unique data as JSON response
    res.json(uniqueCoordinates);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error fetching unique data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/batteryData/Distinct", async (req, res) => {
  try {
    // Fetch unique combinations of Easting and Northing along with specific values of other columns
    const uniqueCoordinatesQuery = `
            SELECT DISTINCT "Easting", "Northing",
                   MIN("DateTime") AS "DateTime",
                   MIN("BatteryLevel") AS "BatteryLevel",
                   MIN("StationID") AS "StationID",
                   MIN("Baro") AS "Baro",
                   MIN("Temperature") AS "Temperature"
            FROM "BatteryData"
            GROUP BY "Easting", "Northing"
        `;
    const [uniqueCoordinates, metadataCoordinates] = await sequelize.query(
      uniqueCoordinatesQuery
    );

    // Send the unique data as JSON response
    res.json(uniqueCoordinates);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error fetching unique data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/waterqualityDatasecond/maxmin", async (req, res) => {
  try {
    // Query the database for the maximum and minimum values of easting and northing
    const maxMinValues = await WaterQualityDataSecond.findOne({
      attributes: [
        [sequelize.fn("MAX", sequelize.col("Easting")), "maxEasting"],
        [sequelize.fn("MIN", sequelize.col("Easting")), "minEasting"],
        [sequelize.fn("MAX", sequelize.col("Northing")), "maxNorthing"],
        [sequelize.fn("MIN", sequelize.col("Northing")), "minNorthing"],
      ],
    });

    // Send the max and min values as JSON response
    res.json(maxMinValues);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error fetching max and min values:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/api/batteryData/maxmin", async (req, res) => {
  try {
    // Query the database for the maximum and minimum values of easting and northing
    const maxMinValues = await BatteryData.findOne({
      attributes: [
        [sequelize.fn("MAX", sequelize.col("Easting")), "maxEasting"],
        [sequelize.fn("MIN", sequelize.col("Easting")), "minEasting"],
        [sequelize.fn("MAX", sequelize.col("Northing")), "maxNorthing"],
        [sequelize.fn("MIN", sequelize.col("Northing")), "minNorthing"],
      ],
    });

    // Send the max and min values as JSON response
    res.json(maxMinValues);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error fetching max and min values:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/api/waterqualityData/maxmin", async (req, res) => {
  try {
    // Query the database for the maximum and minimum values of easting and northing
    const maxMinValues = await WaterQualityData.findOne({
      attributes: [
        [sequelize.fn("MAX", sequelize.col("Easting")), "maxEasting"],
        [sequelize.fn("MIN", sequelize.col("Easting")), "minEasting"],
        [sequelize.fn("MAX", sequelize.col("Northing")), "maxNorthing"],
        [sequelize.fn("MIN", sequelize.col("Northing")), "minNorthing"],
      ],
    });

    // Send the max and min values as JSON response
    res.json(maxMinValues);
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error("Error fetching max and min values:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/", (req, res) => res.json("Connected to API"));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
