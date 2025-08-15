import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Transfer() {
  const [amount, setAmount] = useState(0);
  const router = useRouter();

  const handleTransfer = () => {
    if (amount > 20000) {
      const isRiskArea = true; // mock check
      if (isRiskArea) {
        router.push(`/verify?amount=${amount}&risk=1`);
      } else {
        router.push(`/verify?amount=${amount}`);
      }
    } else {
      router.push(`/verify?amount=${amount}`);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>โอนเงิน</h1>
      <input
        type="number"
        placeholder="จำนวนเงิน"
        value={amount}
        onChange={e => setAmount(Number(e.target.value))}
      />
      <br />
      <button onClick={handleTransfer}>ดำเนินการ</button>
    </div>
  );
}
