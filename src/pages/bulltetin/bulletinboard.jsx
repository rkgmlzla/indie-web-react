import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostItem from '../../components/ui/postitem';
import Header from '../../components/layout/Header';
import { Pencil } from 'lucide-react';
import './bulletinboard.css';
import axios from 'axios';
import { baseUrl } from '../../api/config';
function BulletinBoard() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = 1; // ✅ 추후 전역 상태에서 관리

  const fetchPosts = async () => {
    try {
      setLoading(true);
      let response;

      if (filter === 'myPosts') {
        const listRes = await axios.get(`${baseUrl}/post`, {
          params: { page: 1, size: 50, sort: 'recent' },
          withCredentials: true,
        });

        const all = listRes.data.posts || [];

        // 각 글의 상세를 병렬 조회
        const details = await Promise.allSettled(
          all.map((p) =>
            axios.get(`${baseUrl}/post/${p.id}`, {
              withCredentials: true,
            })
          )
        );

        // 내 글(id 또는 isMine)만 추려서 목록 형태로 반환
        const myIds = new Set(
          details
            .filter((r) => r.status === 'fulfilled')
            .map((r) => r.value.data)
            .filter((d) => {
              const uid = Number(d?.user?.id ?? NaN);
              const isMine = d?.isMine === true;
              return isMine || uid === currentUserId;
            })
            .map((d) => d.id)
        );

        const myPosts = all.filter((p) => myIds.has(p.id));
        setPosts(myPosts);
        return; // 아래 분기로 떨어지지 않도록 종료
      } else if (filter === 'myComments') {
        // 전체 글 불러오기
        const postResponse = await axios.get(`${baseUrl}/post`, {
          params: {
            page: 1,
            size: 50,
            sort: 'recent',
          },
          withCredentials: true,
        });

        const allPosts = postResponse.data.posts;

        // 각 게시물에 대해 댓글 요청 보내기 (Promise.all로 병렬 처리)
        const postWithMyComments = await Promise.all(
          allPosts.map(async (post) => {
            try {
              const commentRes = await axios.get(
                `${baseUrl}/post/${post.id}/comment`,
                {
                  withCredentials: true,
                }
              );
              const hasMyComment = commentRes.data.comment.some(
                (c) => c.user.id === currentUserId
              );
              return hasMyComment ? post : null;
            } catch (e) {
              console.warn('댓글 가져오기 실패:', e);
              return null;
            }
          })
        );

        setPosts(postWithMyComments.filter(Boolean));
      } else {
        response = await axios.get(`${baseUrl}/post`, {
          params: {
            page: 1,
            size: 50,
            sort: 'recent',
          },
          withCredentials: true,
        });
        setPosts(response.data.posts);
      }
    } catch (err) {
      console.error('❌ 게시글 불러오기 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const filteredPosts = posts.filter((post) => {
    if (filter === 'myPosts') return post.user_id === currentUserId;
    if (filter === 'myComments') {
      // ⭐️ API 확장 전까진 이건 비워두는 구조
      return false;
    }
    return true;
  });
  return (
    <div className="board">
      <Header title="자유게시판" initialSearchTab="자유게시판" />
      <div style={{ height: '30px' }} />
      <div className="board__tabs">
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}>
          전체
        </button>
        <button
          className={filter === 'myPosts' ? 'active' : ''}
          onClick={() => setFilter('myPosts')}>
          내가 쓴 글
        </button>
        <button
          className={filter === 'myComments' ? 'active' : ''}
          onClick={() => setFilter('myComments')}>
          내가 댓글 단 글
        </button>
      </div>
      <ul className="board__list">
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onClick={() => navigate(`/freeboard/${post.id}`)}
          />
        ))}
      </ul>

      <button className="write-btn" onClick={() => navigate('/bulletinwrite')}>
        <Pencil size={16} strokeWidth={2} />
        글쓰기
      </button>
    </div>
  );
}

export default BulletinBoard;
