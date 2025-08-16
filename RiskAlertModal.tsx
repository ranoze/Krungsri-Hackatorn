// components/checkRisk.ts
export function checkRiskAccount(accountNumber: string): boolean {
    // mock data: เลขบัญชีที่ถูกจัดว่าเสี่ยง
    const riskyAccounts = [
        "123-456-7890",
        "000-111-2222",
        "999-999-9999"
    ];

    return riskyAccounts.some(
        (acc) => acc.trim().replace(/-/g, "") === accountNumber.trim().replace(/-/g, "")
    );
}
