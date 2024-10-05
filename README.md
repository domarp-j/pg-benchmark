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
