import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function OpenAccount() {
  const [name, setName] = useState('');
  const [ndid, setNdid] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('users').insert([{ name, ndid_number: ndid }]);
    if (!error) {
      router.push('/transfer');
    } else {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h1>เปิดบัญชี NDID</h1>
      <input placeholder="ชื่อ" value={name} onChange={e => setName(e.target.value)} />
      <br />
      <input placeholder="NDID Number" value={ndid} onChange={e => setNdid(e.target.value)} />
      <br />
      <button type="submit">บันทึก</button>
    </form>
  );
}
