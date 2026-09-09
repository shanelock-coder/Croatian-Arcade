'use strict';

(function () {
  const DEBUG = false;
  const DIRS = {
    across: { dr: 0, dc: 1 },
    down: { dr: 1, dc: 0 }
  };

  function chars(text) {
    return Array.from(String(text).normalize('NFC').toUpperCase());
  }

  function shuffle(source) {
    const a = source.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function key(row, col) {
    return `${row},${col}`;
  }

  function parseKey(k) {
    return k.split(',').map(Number);
  }

  function makeCell(letter) {
    return { letter, across: null, down: null };
  }

  function getBounds(grid, extraPlacement = null) {
    const coords = Array.from(grid.keys()).map(parseKey);
    if (extraPlacement) {
      const { row, col, direction, letters } = extraPlacement;
      const { dr, dc } = DIRS[direction];
      for (let i = 0; i < letters.length; i++) coords.push([row + dr * i, col + dc * i]);
    }
    if (!coords.length) return { minRow: 0, maxRow: 0, minCol: 0, maxCol: 0, area: 1 };
    const rows = coords.map(x => x[0]);
    const cols = coords.map(x => x[1]);
    const minRow = Math.min(...rows), maxRow = Math.max(...rows);
    const minCol = Math.min(...cols), maxCol = Math.max(...cols);
    return { minRow, maxRow, minCol, maxCol, area: (maxRow - minRow + 1) * (maxCol - minCol + 1) };
  }

  function canPlace(grid, letters, row, col, direction, requireIntersection) {
    const { dr, dc } = DIRS[direction];
    const before = grid.get(key(row - dr, col - dc));
    const after = grid.get(key(row + dr * letters.length, col + dc * letters.length));
    if (before || after) return { ok: false, reason: 'word would join another word end-to-end' };

    let intersections = 0;
    for (let i = 0; i < letters.length; i++) {
      const r = row + dr * i;
      const c = col + dc * i;
      const existing = grid.get(key(r, c));

      if (existing) {
        if (existing.letter !== letters[i]) return { ok: false, reason: 'mismatched overlap' };
        if (existing[direction]) return { ok: false, reason: 'same-direction overlap' };
        intersections++;
      } else {
        // Prevent parallel words from touching side-by-side without crossing.
        if (direction === 'across') {
          if (grid.get(key(r - 1, c)) || grid.get(key(r + 1, c))) {
            return { ok: false, reason: 'side adjacency' };
          }
        } else {
          if (grid.get(key(r, c - 1)) || grid.get(key(r, c + 1))) {
            return { ok: false, reason: 'side adjacency' };
          }
        }
      }
    }

    if (requireIntersection && intersections === 0) return { ok: false, reason: 'disconnected word' };
    return { ok: true, intersections };
  }

  function enumeratePlacements(grid, vocabItem) {
    const letters = chars(vocabItem.answer);
    const placements = [];
    if (!grid.size) {
      placements.push({ row: 0, col: 0, direction: 'across', letters, intersections: 0, score: 0 });
      return placements;
    }

    for (const [cellKey, cell] of grid.entries()) {
      const [r, c] = parseKey(cellKey);
      for (let i = 0; i < letters.length; i++) {
        if (letters[i] !== cell.letter) continue;

        // A new across word may cross a down word, and vice versa. At a cell that
        // already has both directions, canPlace rejects the same-direction overlap.
        for (const direction of ['across', 'down']) {
          const { dr, dc } = DIRS[direction];
          const row = r - dr * i;
          const col = c - dc * i;
          const result = canPlace(grid, letters, row, col, direction, true);
          if (!result.ok) continue;
          const b = getBounds(grid, { row, col, direction, letters });
          const squarenessPenalty = Math.abs((b.maxRow - b.minRow + 1) - (b.maxCol - b.minCol + 1));
          const score = result.intersections * 1000 - b.area * 2 - squarenessPenalty * 3 + Math.random() * 8;
          placements.push({ row, col, direction, letters, intersections: result.intersections, score });
        }
      }
    }
    return placements;
  }

  function placeWord(grid, placedWords, vocabItem, placement) {
    const id = placedWords.length;
    const { row, col, direction, letters } = placement;
    const { dr, dc } = DIRS[direction];
    for (let i = 0; i < letters.length; i++) {
      const r = row + dr * i;
      const c = col + dc * i;
      const k = key(r, c);
      let cell = grid.get(k);
      if (!cell) {
        cell = makeCell(letters[i]);
        grid.set(k, cell);
      }
      cell[direction] = id;
    }
    placedWords.push({
      id,
      answer: vocabItem.answer,
      clue: vocabItem.clue,
      category: vocabItem.category,
      difficulty: vocabItem.difficulty,
      letters,
      row,
      col,
      direction,
      intersections: placement.intersections
    });
  }

  function buildAttempt(vocabulary, targetCount) {
    const grid = new Map();
    const placedWords = [];
    const pool = shuffle(vocabulary);

    // Seed with a relatively long word, but randomise among the longest group.
    const longest = pool.slice().sort((a, b) => chars(b.answer).length - chars(a.answer).length);
    const seedGroup = longest.slice(0, Math.min(12, longest.length));
    const seed = seedGroup[Math.floor(Math.random() * seedGroup.length)];
    placeWord(grid, placedWords, seed, { row: 0, col: 0, direction: 'across', letters: chars(seed.answer), intersections: 0 });

    const remaining = pool.filter(v => v !== seed);
    while (placedWords.length < targetCount && remaining.length) {
      let best = null;
      let bestIndex = -1;

      // Search a broad random subset each round. This gives variety while still
      // selecting placements that are compact and well intersected.
      const indexes = shuffle(remaining.map((_, i) => i)).slice(0, Math.min(70, remaining.length));
      for (const idx of indexes) {
        const item = remaining[idx];
        const placements = enumeratePlacements(grid, item);
        if (!placements.length) continue;
        placements.sort((a, b) => b.score - a.score);
        // Select among the top few placements to avoid identical layouts.
        const top = placements.slice(0, Math.min(4, placements.length));
        const candidatePlacement = top[Math.floor(Math.random() * top.length)];
        const candidateScore = candidatePlacement.score + chars(item.answer).length * 2;
        if (!best || candidateScore > best.score) {
          best = { item, placement: candidatePlacement, score: candidateScore };
          bestIndex = idx;
        }
      }

      if (!best) break;
      placeWord(grid, placedWords, best.item, best.placement);
      remaining.splice(bestIndex, 1);
    }

    return { grid, placedWords };
  }

  function normalizePuzzle(raw) {
    const bounds = getBounds(raw.grid);
    const rowShift = -bounds.minRow;
    const colShift = -bounds.minCol;
    const rows = bounds.maxRow - bounds.minRow + 1;
    const cols = bounds.maxCol - bounds.minCol + 1;

    const grid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => null));
    for (const [k, cell] of raw.grid.entries()) {
      const [r, c] = parseKey(k);
      grid[r + rowShift][c + colShift] = {
        solution: cell.letter,
        across: cell.across,
        down: cell.down,
        number: null
      };
    }

    const words = raw.placedWords.map(w => ({ ...w, row: w.row + rowShift, col: w.col + colShift }));

    // Standard numbering: scan top-to-bottom, left-to-right; one number per start cell.
    const startMap = new Map();
    for (const w of words) {
      const k = key(w.row, w.col);
      if (!startMap.has(k)) startMap.set(k, []);
      startMap.get(k).push(w);
    }
    const starts = Array.from(startMap.entries())
      .map(([k, ws]) => ({ k, ws, rc: parseKey(k) }))
      .sort((a, b) => a.rc[0] - b.rc[0] || a.rc[1] - b.rc[1]);

    let number = 1;
    for (const start of starts) {
      const [r, c] = start.rc;
      grid[r][c].number = number;
      for (const w of start.ws) w.number = number;
      number++;
    }

    return { rows, cols, grid, words };
  }

  function validatePuzzle(puzzle) {
    const errors = [];
    const membership = new Map();

    if (!puzzle.words.length) errors.push('Puzzle contains no words.');

    for (const word of puzzle.words) {
      const letters = chars(word.answer);
      if (letters.length !== word.letters.length) errors.push(`Length mismatch for ${word.answer}.`);
      if (!DIRS[word.direction]) errors.push(`Invalid direction for ${word.answer}.`);
      if (!Number.isInteger(word.row) || !Number.isInteger(word.col)) errors.push(`Invalid start coordinate for ${word.answer}.`);

      const { dr, dc } = DIRS[word.direction] || DIRS.across;
      for (let i = 0; i < letters.length; i++) {
        const r = word.row + dr * i;
        const c = word.col + dc * i;
        const cell = puzzle.grid[r]?.[c];
        if (!cell) {
          errors.push(`Missing cell ${i + 1}/${letters.length} for ${word.answer}.`);
          continue;
        }
        if (cell.solution !== letters[i]) errors.push(`Wrong letter in ${word.answer} at index ${i}.`);
        if (cell[word.direction] !== word.id) errors.push(`Cell membership mismatch for ${word.answer}.`);
        const k = key(r, c);
        if (!membership.has(k)) membership.set(k, []);
        membership.get(k).push({ wordId: word.id, direction: word.direction, letter: letters[i] });
      }

      const beforeR = word.row - dr, beforeC = word.col - dc;
      const afterR = word.row + dr * letters.length, afterC = word.col + dc * letters.length;
      if (puzzle.grid[beforeR]?.[beforeC]) errors.push(`Extra touching cell before ${word.answer}.`);
      if (puzzle.grid[afterR]?.[afterC]) errors.push(`Extra touching cell after ${word.answer}.`);
    }

    // Every displayed white square must belong to at least one answer, and crossings
    // must contain the same letter in both words.
    for (let r = 0; r < puzzle.rows; r++) {
      for (let c = 0; c < puzzle.cols; c++) {
        const cell = puzzle.grid[r][c];
        if (!cell) continue;
        const members = membership.get(key(r, c)) || [];
        if (!members.length) errors.push(`Extra active cell at ${r},${c}.`);
        if (members.length > 2) errors.push(`More than two words cross at ${r},${c}.`);
        if (members.length === 2) {
          if (members[0].direction === members[1].direction) errors.push(`Same-direction overlap at ${r},${c}.`);
          if (members[0].letter !== members[1].letter) errors.push(`Intersection mismatch at ${r},${c}.`);
        }
        if ((cell.across !== null) !== members.some(m => m.direction === 'across')) errors.push(`Across metadata mismatch at ${r},${c}.`);
        if ((cell.down !== null) !== members.some(m => m.direction === 'down')) errors.push(`Down metadata mismatch at ${r},${c}.`);
      }
    }

    // Verify clue numbering exactly matches numbered start cells.
    for (const word of puzzle.words) {
      const start = puzzle.grid[word.row]?.[word.col];
      if (!start || start.number !== word.number) errors.push(`Numbering mismatch for ${word.answer}.`);
    }

    // Connectivity check: all words should be reachable through intersections.
    if (puzzle.words.length > 1) {
      const graph = new Map(puzzle.words.map(w => [w.id, new Set()]));
      for (const members of membership.values()) {
        if (members.length === 2) {
          graph.get(members[0].wordId).add(members[1].wordId);
          graph.get(members[1].wordId).add(members[0].wordId);
        }
      }
      const seen = new Set([puzzle.words[0].id]);
      const queue = [puzzle.words[0].id];
      while (queue.length) {
        const id = queue.shift();
        for (const next of graph.get(id)) if (!seen.has(next)) { seen.add(next); queue.push(next); }
      }
      if (seen.size !== puzzle.words.length) errors.push('Puzzle contains disconnected words.');
    }

    return { valid: errors.length === 0, errors };
  }

  function generateCrossword(vocabulary, targetCount, options = {}) {
    const maxAttempts = options.maxAttempts || 140;
    const minCount = Math.max(6, targetCount - 3);
    let requested = targetCount;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      // Gradually relax only the word count, never the spelling or grid rules.
      if (attempt > 55) requested = Math.max(minCount, targetCount - 1);
      if (attempt > 95) requested = Math.max(minCount, targetCount - 2);

      const raw = buildAttempt(vocabulary, requested);
      if (raw.placedWords.length < requested) {
        if (DEBUG) console.log('[Crossword] retry: not enough placed words', attempt, raw.placedWords.length, requested);
        continue;
      }
      const puzzle = normalizePuzzle(raw);
      const validation = validatePuzzle(puzzle);
      if (DEBUG) {
        console.log('[Crossword] attempt', attempt, { requested, words: puzzle.words, validation });
      }
      if (validation.valid) {
        puzzle.validation = validation;
        puzzle.attempts = attempt;
        return puzzle;
      }
      if (DEBUG) console.warn('[Crossword] validation failed', validation.errors);
    }

    throw new Error('Could not generate a valid crossword after repeated attempts. Try a different word count.');
  }

  window.CrosswordEngine = {
    generateCrossword,
    validatePuzzle,
    chars,
    DEBUG
  };
})();
