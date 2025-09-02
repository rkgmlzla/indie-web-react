import { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export default function LoginPage() {
  const [checking, setChecking] = useState(true);
  const [me, setMe] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch(`${API_BASE}/user/me`, { credentials: 'include' });
        if (r.status === 401) return;                 // 비로그인 = 정상
        if (!r.ok) throw new Error('user/me failed');
        const data = await r.json();
        if (alive) setMe(data);
      } catch {
        /* noop */
      } finally {
        if (alive) setChecking(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const startKakao = async () => {
    const r = await fetch(`${API_BASE}/auth/kakao/login`);
    const { loginUrl } = await r.json();
    window.location.href = loginUrl;                  // 카카오 로그인 시작
  };

  if (checking) return <div style={{ padding: 24 }}>로그인 상태 확인 중…</div>;
  if (me)       return <div style={{ padding: 24 }}>이미 로그인됨. 홈으로 이동해 주세요.</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>로그인</h2>
      <button onClick={startKakao}>카카오로 로그인</button>
    </div>
  );
}
