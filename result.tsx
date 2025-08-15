import { useRouter } from 'next/router';

export default function Result() {
  const router = useRouter();
  const success = router.query.success === '1';
  const amount = router.query.amount;

  return (
    <div style={{ padding: 20 }}>
      {success ? (
        <h1 style={{ color: 'green' }}>โอนสำเร็จ {amount} บาท</h1>
      ) : (
        <h1 style={{ color: 'red' }}>การโอนล้มเหลว</h1>
      )}
    </div>
  );
}
