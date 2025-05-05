import { calculatePayslip } from "./payroll";

describe("calculatePayslip", () => {
    test("should return 0 deductions for 16 year old with 700 CHF", () => {
        const result = calculatePayslip({
            born: new Date("2008-12-12"),
            payday: new Date("2024-01-01"),
            gross: 700
        });

        expect(result.deductions.size).toBe(0);
        expect(result.totalDeductions).toBe(0);
        expect(result.net).toBe(700);
    })
});

describe("calculatePayslip", () => {
    test("should return AHV, IV, EO deductions for 18 year old with 1200 CHF", () => {
        const result = calculatePayslip({
            born: new Date("2006-12-12"),
            payday: new Date("2024-01-01"),
            gross: 1200
        });

        expect(result.deductions.has("AHV")).toBe(true);
        expect(result.deductions.has("IV")).toBe(true);
        expect(result.deductions.has("EO")).toBe(true);
        expect(result.net).toBe(1200);
    })
});