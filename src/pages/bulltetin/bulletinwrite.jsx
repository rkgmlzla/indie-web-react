import React, { useRef, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './bulletinwrite.css';

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

  return (
    <div className="freeboard__write">
      <header className="write__header">
        <ChevronLeft className="back" onClick={() => navigate(-1)} />
        <h2>자유게시판</h2>
      </header>

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
        className={isValid ? 'submit active' : 'submit'}>
        완료
      </button>
    </div>
  );
}

export default BulletinWrite;
