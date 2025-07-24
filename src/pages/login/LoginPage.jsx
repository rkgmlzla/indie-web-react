import { supabase } from '../../lib/supabase';

function LoginPage() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    });
    if (error) {
      console.error('로그인 실패:', error.message);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        marginTop: 100,
        alignItems: 'center',
      }}>
      <h2>로그인</h2>
      <button onClick={handleLogin}>카카오로 시작하기</button>
    </div>
  );
}

export default LoginPage;
