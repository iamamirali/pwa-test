import { useEffect, useState } from 'react';

function App() {
  const [value, setValue] = useState('');
  const [confirmButton, setConfirmButton] = useState(false);
  const [startButton, setStartButton] = useState(false);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const pastedData = e.clipboardData?.getData('text');

      if (pastedData) {
        // setValue(pastedData.trim());
        setConfirmButton(true);
      }
    };

    const handleAppFocus = () => {
      setStartButton(true);
    };

    window.addEventListener('paste', handlePaste);
    window.addEventListener('focus', handleAppFocus);

    return () => {
      window.removeEventListener('paste', handlePaste);
      window.removeEventListener('focus', handleAppFocus);
    };
  }, []);

  return (
    <div>
      <h1>hello world</h1>
      <p>{`value: ${value}`}</p>
      {confirmButton && !startButton && (
        <button
          onClick={() => {
            setValue('');
          }}
          style={{ width: 100, height: 100 }}
        >
          confirm
        </button>
      )}
      {startButton && (
        <button
          onClick={() => {
            setStartButton(false);
            setValue('');
          }}
          style={{ width: 100, height: 100 }}
        >
          start
        </button>
      )}
      <input
        inputMode="none"
        value={''}
        onChange={(e) => setValue(e.target.value)}
        // style={{
        //   position: 'absolute',
        //   opacity: 0,
        //   pointerEvents: 'none',
        // }}
      />
    </div>
  );
}

export default App;
