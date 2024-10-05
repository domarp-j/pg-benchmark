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
AVERAGE (ms): 1032.04
MEDIAN (ms): 1016
90TH PERCENTILE (ms): 1148
-----------------------------------
QUERY: inspection-query-by-identifier
AVERAGE (ms): 3213.5
MEDIAN (ms): 3179
90TH PERCENTILE (ms): 3599
-----------------------------------
QUERY: asset-query-by-id
AVERAGE (ms): 723.7
MEDIAN (ms): 725
90TH PERCENTILE (ms): 773
-----------------------------------
QUERY: asset-query-by-identifier
AVERAGE (ms): 1782.46
MEDIAN (ms): 1747
90TH PERCENTILE (ms): 2023
```

The `*-query-by-explicit-identifier` queries always timed out (10s).
