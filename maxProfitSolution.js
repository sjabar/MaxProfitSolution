function maxProfitSolution(n) {
  let dp = new Array(n + 1).fill(-Infinity);
  let parent = new Array(n + 1).fill(null);

  const projects = {
    'T': { rate: 1500, time: 5 },
    'P': { rate: 1000, time: 4 },
    'C': { rate: 3000, time: 10 }
  };

  dp[0] = 0;

  for (let i = 1; i <= n; i++) {
    for (let key of Object.keys(projects)) {
      const { rate, time } = projects[key];
      if (time <= i) {
        const ptime = i - time;
        const val = dp[ptime] + (n - i) * rate;
        if (val > dp[i]) {
          dp[i] = val;
          parent[i] = [ptime, key];
        }
      }
    }
  }

  let max = 0;
  for (let t = 1; t <= n; t++) {
    if (dp[t] > dp[max]) max = t;
  }

  const maxprofit = dp[max];
  const counts = { T: 0, P: 0, C: 0 };

  let cur = max;
  while (cur && parent[cur] !== null) {
    const [prev, key] = parent[cur];
    counts[key]++;
    cur = prev;
  }

  return { earnings: maxprofit, counts};
}
console.log(maxProfitSolution(11))