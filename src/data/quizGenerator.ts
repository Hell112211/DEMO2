export type Difficulty = 'easy' | 'medium' | 'hard';

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

function shuffleOptions(
  correct: string,
  distractors: string[],
  seed: number
): { options: string[]; answerIndex: number } {
  const opts = [correct, ...distractors];
  // Deterministic shuffle using seed
  const arr = opts.map((o, i) => ({ o, r: (seed * 9301 + i * 49297) % 233280 }));
  arr.sort((a, b) => a.r - b.r);
  const options = arr.map((x) => x.o);
  return { options, answerIndex: options.indexOf(correct) };
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function uniqueDistractors(correct: number, count: number, range: number): number[] {
  const set = new Set<number>();
  let guard = 0;
  while (set.size < count && guard < 200) {
    const delta = randInt(-range, range);
    const cand = correct + delta;
    if (cand !== correct && cand >= -50) set.add(cand);
    guard++;
  }
  while (set.size < count) set.add(correct + (set.size + 1) * 10);
  return Array.from(set).slice(0, count);
}

export function generateAlgebra(difficulty: Difficulty): QuizQuestion {
  const seed = Math.floor(Math.random() * 100000);
  if (difficulty === 'easy') {
    const a = randInt(1, 20);
    const b = randInt(1, 30);
    const x = b - a;
    const correct = String(x);
    const d = uniqueDistractors(x, 3, 5);
    const { options, answerIndex } = shuffleOptions(correct, d.map(String), seed);
    return {
      id: `alg-easy-${seed}`,
      prompt: `Solve for x: x + ${a} = ${b}`,
      options,
      answerIndex,
      explanation: `Subtract ${a} from both sides: x = ${b} − ${a} = ${x}.`,
    };
  }
  if (difficulty === 'medium') {
    const m = randInt(2, 9);
    const x = randInt(2, 12);
    const c = randInt(1, 20);
    const result = m * x + c;
    const correct = String(x);
    const d = uniqueDistractors(x, 3, 6);
    const { options, answerIndex } = shuffleOptions(correct, d.map(String), seed);
    return {
      id: `alg-med-${seed}`,
      prompt: `Solve for x: ${m}x + ${c} = ${result}`,
      options,
      answerIndex,
      explanation: `Subtract ${c}: ${m}x = ${result - c}. Then divide by ${m}: x = ${x}.`,
    };
  }
  const m1 = randInt(2, 8);
  const m2 = randInt(2, 8);
  const c1 = randInt(1, 15);
  const c2 = randInt(1, 15);
  const x = randInt(2, 9);
  const left = m1 * x + c1;
  const right = m2 * x + c2;
  const correctX = Math.round((right - left) / (m1 - m2));
  if (m1 === m2 || !Number.isInteger(correctX)) return generateAlgebra(difficulty);
  const correct = String(correctX);
  const d = uniqueDistractors(correctX, 3, 6);
  const { options, answerIndex } = shuffleOptions(correct, d.map(String), seed);
  return {
    id: `alg-hard-${seed}`,
    prompt: `Solve for x: ${m1}x + ${c1} = ${m2}x + ${c2}`,
    options,
    answerIndex,
    explanation: `Move x terms to one side: ${m1 - m2}x = ${c2 - c1}. So x = ${correctX}.`,
  };
}

export function generatePolynomial(difficulty: Difficulty): QuizQuestion {
  const seed = Math.floor(Math.random() * 100000);
  if (difficulty === 'easy') {
    const a1 = randInt(1, 9);
    const a2 = randInt(1, 9);
    const b1 = randInt(-8, 8);
    const b2 = randInt(-8, 8);
    const aSum = a1 + a2;
    const bSum = b1 + b2;
    const correct = `${aSum}x${bSum >= 0 ? ` + ${bSum}` : ` − ${Math.abs(bSum)}`}`;
    const d = [
      `${a1}x + ${b2}`,
      `${a2}x − ${Math.abs(b1)}`,
      `${aSum + 1}x + ${bSum}`,
    ];
    const { options, answerIndex } = shuffleOptions(correct, d, seed);
    return {
      id: `poly-easy-${seed}`,
      prompt: `Simplify: (${a1}x ${b1 >= 0 ? `+ ${b1}` : `− ${Math.abs(b1)}`}) + (${a2}x ${b2 >= 0 ? `+ ${b2}` : `− ${Math.abs(b2)}`})`,
      options,
      answerIndex,
      explanation: `Combine like terms: ${a1}x + ${a2}x = ${aSum}x, and ${b1} + ${b2} = ${bSum}.`,
    };
  }
  if (difficulty === 'medium') {
    const k = randInt(2, 6);
    const a = randInt(1, 6);
    const b = randInt(1, 6);
    const c = randInt(-5, 5);
    const correct = `${k * a}x² + ${k * b}x ${k * c >= 0 ? `+ ${k * c}` : `− ${Math.abs(k * c)}`}`;
    const d = [
      `${k * a}x² + ${b}x + ${c}`,
      `${a}x² + ${k * b}x + ${k * c}`,
      `${k * a}x² + ${k * b}x + ${c}`,
    ];
    const { options, answerIndex } = shuffleOptions(correct, d, seed);
    return {
      id: `poly-med-${seed}`,
      prompt: `Expand: ${k}(${a}x² + ${b}x ${c >= 0 ? `+ ${c}` : `− ${Math.abs(c)}`})`,
      options,
      answerIndex,
      explanation: `Distribute ${k} to each term: ${k}·${a}x² = ${k * a}x², ${k}·${b}x = ${k * b}x, ${k}·(${c}) = ${k * c}.`,
    };
  }
  const b = randInt(2, 5);
  const c = randInt(2, 5);
  const correct = `x² + ${b + c}x + ${b * c}`;
  const d = [
    `x² + ${b * c}x + ${b + c}`,
    `x² + ${b}x + ${c}`,
    `x² + ${b * c}x + ${b * c}`,
  ];
  const { options, answerIndex } = shuffleOptions(correct, d, seed);
  return {
    id: `poly-hard-${seed}`,
    prompt: `Expand: (x + ${b})(x + ${c})`,
    options,
    answerIndex,
    explanation: `x·x = x², x·${c} = ${c}x, ${b}·x = ${b}x, ${b}·${c} = ${b * c}. Combine: x² + ${b + c}x + ${b * c}.`,
  };
}

export function generateSequence(difficulty: Difficulty): QuizQuestion {
  const seed = Math.floor(Math.random() * 100000);
  if (difficulty === 'easy') {
    const a = randInt(1, 10);
    const d = randInt(2, 7);
    const seq = [a, a + d, a + 2 * d, a + 3 * d];
    const next = a + 4 * d;
    const correct = String(next);
    const dd = uniqueDistractors(next, 3, 4);
    const { options, answerIndex } = shuffleOptions(correct, dd.map(String), seed);
    return {
      id: `seq-easy-${seed}`,
      prompt: `Find the next term: ${seq.join(', ')}, …`,
      options,
      answerIndex,
      explanation: `Common difference is ${d}. Next term = ${seq[3]} + ${d} = ${next}.`,
    };
  }
  if (difficulty === 'medium') {
    const a = randInt(2, 6);
    const r = randInt(2, 4);
    const seq = [a, a * r, a * r * r, a * r * r * r];
    const next = a * r * r * r * r;
    const correct = String(next);
    const dd = uniqueDistractors(next, 3, 8);
    const { options, answerIndex } = shuffleOptions(correct, dd.map(String), seed);
    return {
      id: `seq-med-${seed}`,
      prompt: `Find the next term: ${seq.join(', ')}, …`,
      options,
      answerIndex,
      explanation: `Common ratio is ${r}. Next term = ${seq[3]} × ${r} = ${next}.`,
    };
  }
  const a = randInt(1, 8);
  const d = randInt(2, 7);
  const n = randInt(6, 20);
  const nth = a + (n - 1) * d;
  const correct = String(nth);
  const dd = uniqueDistractors(nth, 3, 6);
  const { options, answerIndex } = shuffleOptions(correct, dd.map(String), seed);
  return {
    id: `seq-hard-${seed}`,
    prompt: `Find the ${n}th term of the arithmetic sequence ${a}, ${a + d}, ${a + 2 * d}, …`,
    options,
    answerIndex,
    explanation: `Use a + (n − 1)·d = ${a} + ${n - 1}·${d} = ${nth}.`,
  };
}

export function generateQuiz(
  topicId: string,
  difficulty: Difficulty,
  count = 5
): QuizQuestion[] {
  const gen =
    topicId === 'basic-algebra'
      ? generateAlgebra
      : topicId === 'polynomials'
        ? generatePolynomial
        : generateSequence;
  const out: QuizQuestion[] = [];
  const seen = new Set<string>();
  let guard = 0;
  while (out.length < count && guard < 200) {
    const q = gen(difficulty);
    if (!seen.has(q.prompt)) {
      seen.add(q.prompt);
      out.push(q);
    }
    guard++;
  }
  return out;
}
