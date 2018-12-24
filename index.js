const express = require('express');

const app = express();

const PORT = process.env.PORT || 1234;

let startPointer = null;

const hitsStore = { total: 0 };

function commitHit() {
  const now = Date.now();

  if (!startPointer || hitsStore.total === 0) {
    startPointer = now;
  }
  if (hitsStore[now]) {
    hitsStore[now] += 1;
  } else {
    hitsStore[now] = 1;
  }
  hitsStore.total += 1;
}

function cleanOverdueHits() {
  if (startPointer === null || hitsStore.total === 0) {
    return;
  }

  const oneMinuteAgo = Date.now() - 5 * 1000;

  for (;startPointer < oneMinuteAgo; startPointer += 1) {
    if (typeof hitsStore[startPointer] !== 'undefined') {
      hitsStore.total -= hitsStore[startPointer];
      delete hitsStore[startPointer];
    }
  }
}

app.get('/hits', (request, response) => {
  commitHit();
  cleanOverdueHits();
  response.send({ pageviews: hitsStore.total });
});

module.exports = app.listen(PORT);
