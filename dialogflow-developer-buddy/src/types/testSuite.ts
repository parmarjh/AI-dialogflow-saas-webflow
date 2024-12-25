export interface TestCase {
  id: string;
  name: string;
  input: string;
  expectedOutput: string;
  status?: 'passed' | 'failed' | 'pending';
}

export interface TestSuite {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  testCases: TestCase[];
}
