import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../api/config';

function KakaoLogin() {
  const navigate = useNavigate();

  // ✅ 1. 카카오 로그인 버튼 클릭 → 백엔드가 주는 Kakao 로그인 URL로 이동
  const handleLogin = async () => {
    // 백엔드에서 카카오 로그인 URL을 받음
    const res = await fetch(`${baseUrl}/auth/kakao/login`);
    const data = await res.json();
    // 로그인 URL로 리다이렉트
    window.location.href = data.loginUrl;
  };
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');  // URL에서 code 파싱

  if (code) {
    fetch(`${baseUrl}/auth/callback?code=${code}`)
      .then((res) => res.json())
      .then((data) => {
        const { accessToken, refreshToken } = data;
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          navigate('/mypage'); // 로그인 후 마이페이지로 이동
        } else {
          alert('토큰 없음');
        }
      })
      .catch((err) => {
        console.error('카카오 로그인 콜백 처리 에러:', err);
      });
  }
}, []); // 빈 배열로 컴포넌트 마운트 시 한 번만 실행


  return (
    <div style={{ marginTop: 100, textAlign: 'center' }}>
      <h2>카카오 로그인</h2>
      <button onClick={handleLogin}>카카오로 시작하기</button>
    </div>
  );
}

export default KakaoLogin;
