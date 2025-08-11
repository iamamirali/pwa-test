import { useEffect, useState } from 'react';
import ImageUploader from './ImageUploader';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [clipboardValue, setClipboardValue] = useState('');

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const pastedData = e.clipboardData?.getData('text');
      if (pastedData) {
        setClipboardValue(pastedData.trim());
      }
    };

    window.addEventListener('paste', handlePaste);

    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '48px',
        flexWrap: 'wrap',
        gap: '48px',
      }}
    >
      <div style={{ minWidth: '300px' }}>
        <h2>تست اسکن</h2>
        <p>{`مقدار اسکن شده از کلیپ بورد: ${clipboardValue}`}</p>
        <br />
        <p>{`مقدار اسکن شده از اینپوت: ${inputValue}`}</p>
        <br />
        <input
          inputMode="none"
          value=""
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      <div>
        <h2>تست آپلود تصویر</h2>
        <ImageUploader onChange={(_, base64) => console.log(base64)} />
      </div>
    </div>
  );
}

export default App;
