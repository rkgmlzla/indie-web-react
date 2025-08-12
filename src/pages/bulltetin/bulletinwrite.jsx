import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './bulletinwrite.css';
import Header from '../../components/layout/Header';
import { baseUrl } from '../../api/config';
function BulletinWrite() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const isValid = title.trim().length > 0 && content.trim().length > 0;

  const textareaRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setContent(e.target.value);

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  const handleImageUpload = (e) => {
    const selected = Array.from(e.target.files);
    const filtered = selected.filter((file) => file.type.startsWith('image/'));

    if (images.length + filtered.length > 5) {
      alert('사진은 최대 5장까지 업로드 가능합니다.');
      return;
    }

    setImages((prev) => [...prev, ...filtered]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };
  const handleSubmit = async () => {
    if (!isValid) return;

    const accessToken = localStorage.getItem('accessToken');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      images.forEach((img) => formData.append('images', img));

      await axios.post(`${baseUrl}/post`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Content-Type 생략 → 자동 설정됨
        },
      });

      navigate('/bulletinboard'); // 성공 시 이동
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      alert('게시글 작성에 실패했습니다.');
    }
  };

  return (
    <div className="freeboard__write">
      <Header title="자유게시판" showBack showSearch={false} showMenu={false} />
      <div style={{ height: '30px' }} />
      <input
        className="title-input"
        placeholder="제목을 입력해주세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleChange}
        placeholder="자유롭게 얘기해보세요."
        style={{ overflow: 'hidden' }}
      />

      <div className="image-preview">
        {images.map((img, i) => (
          <div key={i} className="thumb">
            <img src={URL.createObjectURL(img)} alt="preview" />
            <button onClick={() => removeImage(i)}>❌</button>
          </div>
        ))}
        {images.length < 5 && (
          <label className="upload-btn">
            + 이미지 업로드
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              hidden
              multiple
            />
          </label>
        )}
      </div>

      <button
        disabled={!isValid}
        className={isValid ? 'submit active' : 'submit'}
        onClick={handleSubmit}>
        완료
      </button>
    </div>
  );
}

export default BulletinWrite;
