let startPointer = null;

export const hitsStore = { total: 0 };

export function commitHit() {
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

export function cleanOverdueHits() {
  if (startPointer === null || hitsStore.total === 0) {
    return;
  }

  const oneMinuteAgo = Date.now() - 60 * 1000;

  while (startPointer < oneMinuteAgo) {
    if (typeof hitsStore[startPointer] !== 'undefined') {
      hitsStore.total -= hitsStore[startPointer];
      delete hitsStore[startPointer];
    }
    startPointer += 1;
  }
}
