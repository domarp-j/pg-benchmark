# pg-benchmark

An experiment to analyze the efficiency of SELECT queries based on various JOIN conditions.

To run the experiment:
- `bun init`
- Run Docker
- Update `src/index.ts`.
  - Populate the database with dummy data
  - Run benchmarks on SELECT queries against the data
  - Conduct basic analysis (averages, medians, p90s) of the benchmark results
- Run `docker-compose up`

Results:
```
-----------------------------------
QUERY: inspection-query-by-id
          SELECT inspections.id as inspection_id, assets.id as asset_id
          FROM inspections
          LEFT JOIN assets
          ON assets.id = inspections.asset_id
          WHERE assets.x_max - assets.x_min > 50;
AVERAGE (ms): 1032.04
MEDIAN (ms): 1016
90TH PERCENTILE (ms): 1148
-----------------------------------
QUERY: inspection-query-by-identifier
          SELECT inspections.id as inspection_id, assets.id as asset_id
          FROM inspections
          LEFT JOIN assets
          ON (
            assets.identifier = inspections.psr
            OR assets.identifier = inspections.lsr
            OR assets.identifier = inspections.mhn
          )
          WHERE assets.x_max - assets.x_min > 50;
AVERAGE (ms): 3213.5
MEDIAN (ms): 3179
90TH PERCENTILE (ms): 3599
-----------------------------------
QUERY: inspection-query-by-explicit-identifier
          SELECT inspections.id as inspection_id, assets.id as asset_id
          FROM inspections
          LEFT JOIN assets
          ON (
            assets.psr = inspections.psr
            OR assets.lsr = inspections.lsr
            OR assets.mhn = inspections.mhn
          )
          WHERE assets.x_max - assets.x_min > 50;
AVERAGE (ms): N/A (too slow)
MEDIAN (ms): N/A (too slow)
90TH PERCENTILE (ms): N/a (too slow)
-----------------------------------
QUERY: asset-query-by-id
          SELECT assets.id as asset_id, inspections.id as inspection_id
          FROM assets
          LEFT JOIN inspections
          ON assets.id = inspections.asset_id
          WHERE inspections.length_surveyed >= 150;
AVERAGE (ms): 723.7
MEDIAN (ms): 725
90TH PERCENTILE (ms): 773
-----------------------------------
QUERY: asset-query-by-identifier
          SELECT assets.id as asset_id, inspections.id as inspection_id
          FROM assets
          LEFT JOIN inspections
          ON (
            assets.identifier = inspections.psr
            OR assets.identifier = inspections.lsr
            OR assets.identifier = inspections.mhn
          )
          WHERE inspections.length_surveyed >= 150;
AVERAGE (ms): 1782.46
MEDIAN (ms): 1747
90TH PERCENTILE (ms): 2023
-----------------------------------
QUERY: asset-query-by-explicit-identifier
          SELECT assets.id as asset_id, inspections.id as inspection_id
          FROM assets
          LEFT JOIN inspections
          ON (
            assets.psr = inspections.psr
            OR assets.lsr = inspections.lsr
            OR assets.mhn = inspections.mhn
          )
          WHERE inspections.length_surveyed >= 150;
AVERAGE (ms): N/A (too slow)
MEDIAN (ms): N/A (too slow)
90TH PERCENTILE (ms): N/a (too slow)
```

The `*-query-by-explicit-identifier` queries always timed out (10s).
