export const STATUS = {
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
  TIME_LIMIT_EXCEEDED: "Time Limit Exceeded",
  MEMORY_LIMIT_EXCEEDED: "Memory Limit Exceeded",
  RUNTIME_ERROR: "Runtime Error",
  COMPILE_ERROR: "Compile Error",
} as const;

export const DIFFICULTY = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
} as const;

export const LANGUAGES = {
  PYTHON: "Python",
  JAVASCRIPT: "JavaScript",
  JAVA: "Java",
  CPP: "C++",
  RUBY: "Ruby",
  GO: "Go",
  CSHARP: "C#", // C#
  SWIFT: "Swift",
  KOTLIN: "Kotlin",
  TYPESCRIPT: "TypeScript",
  PHP: "PHP",
} as const;
