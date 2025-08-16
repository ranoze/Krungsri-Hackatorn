import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Verify() {
  const [otp, setOtp] = useState('');
  const router = useRouter();
  const amount = router.query.amount || 0;
  const risk = router.query.risk === '1';

  const handleVerify = () => {
    // สมมติว่า OTP ที่ถูกต้องคือ '123456'
    if (otp === '123456') {
      router.push(`/result?success=1&amount=${amount}`);
    } else {
      router.push(`/result?success=0&amount=${amount}`);
    }
  };

  const handleOTPButtonClick = () => {
    router.push({
      pathname: "/page",

    });
    // โลจิกสำหรับการกดปุ่ม "ยืนยันตัวตนด้วย OTP"
    // อาจจะแสดง input field สำหรับกรอก OTP หรือเปลี่ยนหน้า
    alert('ปุ่มยืนยันตัวตนด้วย OTP ถูกกดแล้ว');
  };

  return (
    <div style={styles.container as React.CSSProperties}>
      <div style={styles.header}>
        <div style={styles.statusBar}>
          <span style={styles.time}>12:00</span>
          <span style={styles.icons}>
            {/* จำลองไอคอนสถานะ */}
            <span><i className="fas fa-signal"></i></span>
            <span><i className="fas fa-wifi"></i></span>
            <span><i className="fas fa-battery-full"></i></span>
          </span>
        </div>
      </div>
      <div style={styles.content}>
        <h2 style={styles.title}>พบว่าบัญชีปลายทางมี<br />ความเสี่ยงเป็นมิจฉาชีพ</h2>
        <p style={styles.subtitle}>กรุณายืนยันตัวตนด้วย<br />QR Code หรือ OTP</p>

        {/* ส่วนแสดง QR Code */}
        {/* ในความเป็นจริง ควรใช้คอมโพเนนต์ที่สร้าง QR Code จริงๆ */}
        <div style={styles.qrCodeContainer}>
          <Image src="/static/qr-code.png" alt="QR Code" width={200} height={200} />
        </div>

        {/* ปุ่มยืนยันหลัก */}
        <button style={styles.confirmButton} onClick={handleVerify}>
          ยืนยัน
        </button>

        {/* ปุ่มยืนยันด้วย OTP */}
        <button style={styles.otpButton} onClick={handleOTPButtonClick}>
          ยืนยันตัวตนด้วย OTP
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    backgroundColor: '#FFFBEB',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '20px',
  },
  header: {
    width: '100%',
    padding: '10px 0',
  },
  statusBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    color: '#333',
  },
  time: {
    fontWeight: 'bold',
  },
  icons: {
    // สไตล์สำหรับไอคอนสถานะ (5G, Wi-Fi, แบตเตอรี่)
    // ในโปรเจกต์จริงควรใช้ svg หรือ font awesome
  },
  content: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    marginTop: '50px',
  },
  title: {
    fontSize: '24px',
    color: '#333',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '30px',
  },
  qrCodeContainer: {
    padding: '15px',
    backgroundColor: 'white',
    borderRadius: '8px',
    marginBottom: '30px',
  },
  confirmButton: {
    width: '250px',
    padding: '15px',
    backgroundColor: '#FFD700',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  otpButton: {
    width: '250px',
    padding: '15px',
    backgroundColor: 'transparent',
    color: '#FFD700',
    border: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  }
};
