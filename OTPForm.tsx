
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';


export default function Home() {
  const [timeLeft, setTimeLeft] = useState(120);
  const [otpValues, setOtpValues] = useState(Array(6).fill(""));
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isVerifyDisabled, setIsVerifyDisabled] = useState(true);
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const router = useRouter();
  const amount = router.query.amount;
  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsResendDisabled(false);
      setIsVerifyDisabled(true);
      inputsRef.current.forEach((input) => {
        if (input) {
          input.disabled = true;
          input.style.opacity = "0.5";
        }
      });
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Check if OTP complete
  useEffect(() => {
    setIsVerifyDisabled(otpValues.some((v) => v === ""));
  }, [otpValues]);

  const handleChange = (value: string, index: number) => {
    value = value.replace(/\D/g, "").slice(0, 1);
    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      const newOtp = [...otpValues];
      newOtp[index - 1] = "";
      setOtpValues(newOtp);
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimeLeft(120);
    setIsResendDisabled(true);
    setOtpValues(Array(6).fill(""));
    inputsRef.current.forEach((input) => {
      if (input) {
        input.disabled = false;
        input.style.opacity = "1";
      }
    });
    inputsRef.current[0]?.focus();
  };

  const handleVerify = () => {
    const otp = otpValues.join("");
    if (otp === "123456") {
      alert("ยืนยันตัวตนสำเร็จ! 🎉");

      router.push(`/result?success=1&amount=${amount}`);
    } else {
      alert("รหัสไม่ถูกต้อง");
      setOtpValues(Array(6).fill(""));
      inputsRef.current[0]?.focus();
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.title}>ยืนยันตัวตน</h1>
        <p style={styles.subtitle}>กรุณาใส่รหัส OTP ที่ส่งไปยัง</p>
        <div style={styles.phoneNumber}>0xx-xxx-4321</div>

        <div style={styles.otpContainer}>
          {otpValues.map((v, i) => (
            <input
              key={i}
              type="text"
              value={v}
              maxLength={1}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              ref={(el) => { inputsRef.current[i] = el!; }}
              style={styles.otpInput}
            />
          ))}
        </div>

        <div style={{ marginBottom: 25 }}>
          <div style={styles.timerText}>หมดอายุใน</div>
          <div style={styles.timer}>{timeLeft > 0 ? `${timeLeft} วินาที` : "หมดเวลา"}</div>
        </div>

        <div style={{ marginBottom: 35 }}>
          <p style={styles.resendText}>ไม่ได้รับรหัส?</p>
          <button style={styles.resendBtn} onClick={handleResend} disabled={isResendDisabled}>
            ส่งรหัสใหม่
          </button>
        </div>

        <button style={styles.verifyBtn} onClick={handleVerify} disabled={isVerifyDisabled}>
          ยืนยัน
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "#2c2c2c",
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
    backgroundSize: "20px 20px",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  container: {
    background: "#8B7E5B",
    borderRadius: 32,
    padding: "45px 40px 50px 40px",
    width: "100%",
    maxWidth: 420,
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  },
  title: { fontSize: 32, fontWeight: 600, color: "#fff", marginBottom: 12 },
  subtitle: { color: "#fff", fontSize: 16, marginBottom: 8 },
  phoneNumber: { color: "#F4C430", fontWeight: 600, fontSize: 18, marginBottom: 35 },
  otpContainer: { display: "flex", justifyContent: "center", gap: 12, marginBottom: 35 },
  otpInput: {
    width: 52,
    height: 52,
    border: "2.5px solid #F4C430",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 24,
    fontWeight: 600,
  },
  timerText: { color: "#fff", fontSize: 16 },
  timer: { color: "#F4C430", fontSize: 16, fontWeight: 500 },
  resendText: { color: "#fff", fontSize: 14, marginBottom: 4 },
  resendBtn: {
    background: "none",
    border: "none",
    color: "#F4C430",
    fontWeight: 500,
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: 14,
  },
  verifyBtn: {
    width: "100%",
    background: "#F4C430",
    color: "#fff",
    border: "none",
    padding: 16,
    borderRadius: 12,
    fontSize: 18,
    fontWeight: 600,
    cursor: "pointer",
  },
};
