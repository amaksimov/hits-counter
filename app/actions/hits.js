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

  const oneMinuteAgo = Date.now() - 60 * 1000;

  for (;startPointer < oneMinuteAgo; startPointer += 1) {
    if (typeof hitsStore[startPointer] !== 'undefined') {
      hitsStore.total -= hitsStore[startPointer];
      delete hitsStore[startPointer];
    }
  }
}

module.exports = { hitsStore, cleanOverdueHits, commitHit }
