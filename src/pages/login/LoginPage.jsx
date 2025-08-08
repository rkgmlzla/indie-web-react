import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function KakaoLogin() {
  const navigate = useNavigate();

  // ✅ 1. 로그인 버튼 → 백엔드가 주는 Kakao 로그인 URL로 이동
  const handleLogin = async () => {
    const res = await fetch('http://localhost:8000/auth/kakao/login');
    const data = await res.json();
    window.location.href = data.loginUrl;
  };

  // ✅ 2. 로그인 후 redirect된 URL에서 code 꺼내서 백엔드에 다시 요청
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      // 백엔드에 code 보내서 accessToken 받기
      fetch(`http://localhost:8000/auth/kakao/callback?code=${code}`)
        .then((res) => res.json())
        .then((data) => {
          const { accessToken } = data;
          if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            navigate('/mypage'); // 성공 시 원하는 페이지로 이동
          } else {
            alert('토큰 없음');
          }
        })
        .catch((err) => {
          console.error('콜백 에러:', err);
        });
    }
  }, []);

  return (
    <div style={{ marginTop: 100, textAlign: 'center' }}>
      <h2>카카오 로그인</h2>
      <button onClick={handleLogin}>카카오로 시작하기</button>
    </div>
  );
}

export default KakaoLogin;
