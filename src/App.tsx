import { useEffect, useState } from 'react';
import ImageUploader from './ImageUploader';

type TLocation = {
  longitude: number | '';
  latitude: number | '';
  error?: string;
};

function App() {
  const [inputValue, setInputValue] = useState('');
  const [clipboardValue, setClipboardValue] = useState('');
  const [location, setLocation] = useState<TLocation>({
    longitude: '',
    latitude: '',
    error: '',
  });

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

  function getUserLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          });
        },
        (error) => {
          setLocation((prev) => ({ ...prev, error: error.message }));
        },
        {
          maximumAge: 0,
        }
      );
    } else {
      setLocation((prev) => ({
        ...prev,
        error: 'Geolocation not supported by this browser',
      }));
    }
  }

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

      <div>
        <h2>تست لوکیشن</h2>
        <button onClick={getUserLocation}>دریافت لوکیشن</button>
        <p>Longitude: {location.longitude}</p>
        <p>Latitude: {location.latitude}</p>
        {location.error && (
          <p style={{ color: 'red', direction: 'ltr' }}>{location.error}</p>
        )}
      </div>
    </div>
  );
}

export default App;
