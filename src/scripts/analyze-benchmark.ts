import { benchmarkFile } from "../db";

async function analyzeBenchmark() {
  const benchmarkStream = benchmarkFile.stream();
  const benchmarkReader = benchmarkStream.getReader();
  const decoder = new TextDecoder();

  let buffer = "";

  const queryDurations: { [key: string]: number[] } = {};

  while (true) {
    const { done, value } = await benchmarkReader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");

    for (let i = 0; i < lines.length - 1; i++) {
      const line = lines[i];
      const [name, duration] = line.split(",");
      const d = Number(duration);
      if (isNaN(d)) continue;
      if (!queryDurations[name]) {
        queryDurations[name] = [];
      }
      queryDurations[name].push(d);
    }

    buffer = lines[lines.length - 1];
  }

  // Sort the query durations for each query.
  for (const name in queryDurations) {
    queryDurations[name].sort((a, b) => a - b);
  }

  Object.entries(queryDurations).forEach(([name, durations]) => {
    console.log("-----------------------------------");
    console.log("QUERY:", name);
    console.log(
      "AVERAGE (ms):",
      durations.reduce((a, b) => a + b, 0) / durations.length
    );
    console.log("MEDIAN (ms):", durations[Math.floor(durations.length / 2)]);
    console.log(
      "90TH PERCENTILE (ms):",
      durations[Math.floor(durations.length * 0.9)]
    );
  });
}

export default analyzeBenchmark;
