import React, { useRef, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './bulletinwrite.css';
import Header from '../../components/layout/Header';

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
  const handleSubmit = () => {
    // 🔸 여기에 게시글 저장 로직을 넣을 수 있음 (예: Supabase insert 등)
    console.log('제목:', title);
    console.log('내용:', content);
    console.log('업로드된 이미지:', images);

    // 게시 후 자유게시판으로 이동
    navigate('/bulletinboard');
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
