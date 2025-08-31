import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export default function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/user/me`, {
          credentials: 'include',        // ✅ 쿠키 포함 필수
        });
        if (!res.ok) throw new Error('user/me failed');
        const me = await res.json();

        // TODO: 전역 상태 저장 (e.g. useAuthStore.getState().setUser(me))
        navigate('/', { replace: true });
      } catch (e) {
        console.error(e);
        navigate('/login', { replace: true });
      }
    })();
  }, [navigate]);

  return <div style={{ padding: 24 }}>로그인 처리 중…</div>;
}
