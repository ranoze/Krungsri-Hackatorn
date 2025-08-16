import { useState } from "react";
import { useRouter } from "next/router";
import { checkRiskAccount } from "../components/RiskAlertModal";

export default function Transfer() {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ accountNumber, amount, note });

    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("กรุณากรอกจำนวนเงินที่ถูกต้อง");
      return;
    }

    if (!accountNumber || !amount) {
      alert("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    const risk = checkRiskAccount(accountNumber) ? 1 : 0;
    if (risk) {
      alert("บัญชีนี้มีความเสี่ยง กรุณายืนยันตัวตนด้วย OTP หรือ QR Code");
      router.push({
        pathname: "/verify",
        query: { amount, risk },
      });
      return;
    } else {
      router.push(`/result?success=1&amount=${amount}`);
    }
    // สมมติว่าโอนเงินสำเร็จ
  };
  return (
    <div style={styles.page}>
      <div style={styles.header}></div>
      <div style={styles.container}>
        <h1 style={styles.title}>โอนเงิน</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>เลขบัญชีผู้รับเงิน</label>
          <input
            type="text"
            placeholder="000-0000-0000"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            style={styles.input}
          />


          <label style={styles.label}>จำนวนเงิน</label>
          <input
            type="number"
            placeholder="10,000.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>คำอธิบาย</label>
          <input
            type="text"
            placeholder="การโอนเงิน"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            ยืนยัน
          </button>
        </form>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "sans-serif",
    backgroundColor: "#f8f8f8",
    minHeight: "100vh",
  },
  header: {
    background: "linear-gradient(to bottom, #FFD54F, #FFF176)",
    height: 120,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  container: {
    maxWidth: 400,
    margin: "-80px auto 0 auto",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: 22,
    fontWeight: 600,
    marginBottom: 16,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
  },
  input: {
    padding: "10px 12px",
    fontSize: 16,
    border: "1px solid #ccc",
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#FFD54F",
    color: "#000",
    fontSize: 16,
    fontWeight: 600,
    padding: "12px 0",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
    marginTop: 8,
  },
};
