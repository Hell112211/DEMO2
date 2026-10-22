import type { LucideIcon } from 'lucide-react';
import { FunctionSquare, Sigma, Variable } from 'lucide-react';

export type Topic = {
  id: string;
  name: string;
  icon: LucideIcon;
  lesson: {
    intro: string;
    sections: Array<{ heading: string; body: string }>;
    keyIdea: string;
  };
  examples: Array<{
    problem: string;
    steps: string[];
    answer: string;
  }>;
};

export const TOPICS: Topic[] = [
  {
    id: 'basic-algebra',
    name: 'Basic Algebra',
    icon: Variable,
    lesson: {
      intro:
        'Algebra uses letters (called variables) to stand for numbers we do not know yet. The goal is often to figure out what number the letter represents.',
      sections: [
        {
          heading: 'Variables and expressions',
          body:
            'A variable is a letter like x or y that holds the place of a number. An expression such as 3x + 2 means "three times some number, then add two".',
        },
        {
          heading: 'Equations',
          body:
            'An equation has an equals sign, like 2x + 4 = 10. Solving it means finding the value of x that makes both sides equal.',
        },
        {
          heading: 'Golden rule of equations',
          body:
            'Whatever you do to one side, do to the other. Add, subtract, multiply, or divide — but keep the balance.',
        },
      ],
      keyIdea:
        'Think of an equation as a balanced scale: change one side and you must change the other the same way.',
    },
    examples: [
      {
        problem: 'Solve: x + 5 = 12',
        steps: [
          'Subtract 5 from both sides to isolate x.',
          'x + 5 − 5 = 12 − 5',
          'x = 7',
        ],
        answer: 'x = 7',
      },
      {
        problem: 'Solve: 3x = 18',
        steps: [
          'Divide both sides by 3.',
          '3x ÷ 3 = 18 ÷ 3',
          'x = 6',
        ],
        answer: 'x = 6',
      },
      {
        problem: 'Solve: 2x + 3 = 11',
        steps: [
          'Subtract 3 from both sides.',
          '2x = 8',
          'Divide both sides by 2.',
          'x = 4',
        ],
        answer: 'x = 4',
      },
    ],
  },
  {
    id: 'polynomials',
    name: 'Polynomials',
    icon: FunctionSquare,
    lesson: {
      intro:
        'A polynomial is an expression made by adding and multiplying variables and numbers. Each piece is called a term.',
      sections: [
        {
          heading: 'Terms and degree',
          body:
            'A term looks like 2x² or 5x. The exponent on the variable is the degree of that term. The biggest exponent in the polynomial is its degree.',
        },
        {
          heading: 'Adding and subtracting',
          body:
            'Combine terms that share the same variable part. 3x + 2x = 5x, but 3x + 2y cannot be combined.',
        },
        {
          heading: 'Multiplying',
          body:
            'Use the distributive property: multiply each term in one expression by each term in the other. (x + 2)(x + 3) = x² + 3x + 2x + 6 = x² + 5x + 6.',
        },
      ],
      keyIdea:
        'Group like terms together and always keep the variable part attached to its coefficient.',
    },
    examples: [
      {
        problem: 'Simplify: (3x² + 2x) + (x² − 5x)',
        steps: [
          'Group like terms: 3x² + x² and 2x − 5x.',
          '(3 + 1)x² = 4x²',
          '(2 − 5)x = −3x',
          'Combine: 4x² − 3x',
        ],
        answer: '4x² − 3x',
      },
      {
        problem: 'Expand: (x + 2)(x + 3)',
        steps: [
          'Multiply each term: x·x, x·3, 2·x, 2·3.',
          'x² + 3x + 2x + 6',
          'Combine like terms: 3x + 2x = 5x.',
          'x² + 5x + 6',
        ],
        answer: 'x² + 5x + 6',
      },
      {
        problem: 'Expand: 2(x² + 4x − 1)',
        steps: [
          'Distribute the 2 to every term inside.',
          '2·x² = 2x²',
          '2·4x = 8x',
          '2·(−1) = −2',
          '2x² + 8x − 2',
        ],
        answer: '2x² + 8x − 2',
      },
    ],
  },
  {
    id: 'sequences',
    name: 'Sequences',
    icon: Sigma,
    lesson: {
      intro:
        'A sequence is an ordered list of numbers that usually follows a rule. Figuring out the rule lets you predict any term.',
      sections: [
        {
          heading: 'Arithmetic sequences',
          body:
            'Each term adds the same amount. 3, 7, 11, 15, … adds 4 each time. That fixed amount is the common difference.',
        },
        {
          heading: 'Geometric sequences',
          body:
            'Each term multiplies by the same amount. 2, 6, 18, 54, … multiplies by 3 each time. That fixed multiplier is the common ratio.',
        },
        {
          heading: 'Finding the nth term',
          body:
            'For an arithmetic sequence, the nth term is a + (n − 1)·d, where a is the first term and d is the common difference.',
        },
      ],
      keyIdea:
        'Ask: am I adding the same number, or multiplying by the same number? That tells you the type of sequence.',
    },
    examples: [
      {
        problem: 'Find the next term: 5, 8, 11, 14, …',
        steps: [
          'Look at the gap between terms.',
          '8 − 5 = 3, 11 − 8 = 3, 14 − 11 = 3.',
          'The common difference is 3.',
          'Next term: 14 + 3 = 17.',
        ],
        answer: '17',
      },
      {
        problem: 'Find the next term: 2, 6, 18, 54, …',
        steps: [
          'Check the ratio between terms.',
          '6 ÷ 2 = 3, 18 ÷ 6 = 3, 54 ÷ 18 = 3.',
          'The common ratio is 3.',
          'Next term: 54 × 3 = 162.',
        ],
        answer: '162',
      },
      {
        problem: 'Find the 10th term of 4, 9, 14, …',
        steps: [
          'Common difference: 9 − 4 = 5.',
          'Use nth term: a + (n − 1)·d.',
          'a = 4, d = 5, n = 10.',
          '4 + (10 − 1)·5 = 4 + 45 = 49.',
        ],
        answer: '49',
      },
    ],
  },
];
