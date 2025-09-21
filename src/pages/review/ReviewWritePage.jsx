import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/layout/Header';
import { createVenueReview } from '../../api/reviewApi';
import './ReviewWritePage.css';

export default function ReviewWritePage() {
  const [sp] = useSearchParams();
  const venueId = useMemo(() => Number(sp.get('venueId')), [sp]);
  const navigate = useNavigate();

  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const maxLen = 300;

  useEffect(() => {
    if (!Number.isFinite(venueId)) {
      alert('잘못된 접근입니다.');
      navigate(-1);
    }
  }, [venueId, navigate]);

  const onSubmit = async () => {
    if (!content.trim()) return;
    if (!Number.isFinite(venueId)) return;

    setLoading(true);
    try {
      await createVenueReview(venueId, content.trim());
      alert('리뷰가 등록되었습니다.');
      navigate(`/venue/${venueId}/review`, { replace: true });
    } catch (e) {
      console.error(e);
      alert('리뷰 등록에 실패했어요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page page--review-write">
      <Header title="리뷰 작성" showBack />

      <div className="rw__container">
        <textarea
          className="rw__textarea"
          placeholder="리뷰를 입력하세요 (최대 300자)"
          maxLength={maxLen}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="rw__bottom">
          <span className="rw__count">
            {content.length}/{maxLen}
          </span>
          <button
            type="button"
            className="rw__submit"
            disabled={loading || !content.trim()}
            onClick={onSubmit}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
}
