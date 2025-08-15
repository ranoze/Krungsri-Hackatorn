import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Verify() {
  const [otp, setOtp] = useState('');
  const router = useRouter();
  const amount = router.query.amount || 0;
  const risk = router.query.risk === '1';

  const handleVerify = () => {
    if (otp === '123456') {
      router.push(`/result?success=1&amount=${amount}`);
    } else {
      router.push(`/result?success=0&amount=${amount}`);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>ยืนยัน OTP</h1>
      {risk && <p style={{ color: 'red' }}>บัญชีนี้อยู่ในพื้นที่เสี่ยง!</p>}
      <input
        placeholder="กรอก OTP"
        value={otp}
        onChange={e => setOtp(e.target.value)}
      />
      <br />
      <button onClick={handleVerify}>ยืนยัน</button>
    </div>
  );
}
