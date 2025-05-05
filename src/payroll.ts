export type Salary = {
  born: Date;
  payday: Date;
  gross: number;
};

export type Deductions = Map<string, number>;

export const DEDUCTION_RATES: Deductions = new Map([
  ["AHV", 8.7],
  ["IV", 1.4],
  ["EO", 0.5],
  ["ALV", 1.1],
  ["NBU", 0.73],
  ["PK", 8.9],
]);

export type Payslip = {
  salary: Salary;
  deductions: Deductions;
  totalDeductions: number;
  net: number;
};

export function calculatePayslip(salary: Salary): Payslip {
  const result: Payslip = {
    salary: salary,
    deductions: new Map(),
    totalDeductions: 0.0,
    net: salary.gross,
  };

  const age = new Date().getFullYear() - salary.born.getFullYear();
  if (age < 18) {
    result.deductions.set("AHV", salary.gross * 0.087);
    result.deductions.set("IV", salary.gross * 0.014);
    result.deductions.set("EO", salary.gross * 0.005);
  }

  result.totalDeductions = Array.from(result.deductions.values()).reduce((a, b) => a + b ,0)
  result.net = salary.gross - result.totalDeductions;

  return result;
}

