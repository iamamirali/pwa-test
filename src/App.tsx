import { useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";

function App() {
  const [value, setValue] = useState("");
  const [confirmButton, setConfirmButton] = useState(false);
  const [startButton, setStartButton] = useState(true);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const pastedData = e.clipboardData?.getData("text");
      if (pastedData) {
        setValue(pastedData.trim());
        setConfirmButton(true);
      }
    };

    const handleAppFocus = () => {
      setStartButton(true);
    };

    window.addEventListener("paste", handlePaste);
    window.addEventListener("focus", handleAppFocus);

    return () => {
      window.removeEventListener("paste", handlePaste);
      window.removeEventListener("focus", handleAppFocus);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "48px",
        flexWrap: "wrap",
        gap: "48px",
      }}
    >
      <div style={{ minWidth: "300px" }}>
        <h2>تست اسکن</h2>
        <p>{`مقدار اسکن شده: ${value}`}</p>
        {confirmButton && !startButton && (
          <button
            onClick={() => {
              setValue("");
            }}
            style={{ width: 80, height: 80 }}
          >
            تایید اسکن
          </button>
        )}

        {startButton && (
          <button
            onClick={() => {
              setStartButton(false);
              setValue("");
            }}
            style={{ width: 80, height: 80 }}
          >
            شروع اسکن
          </button>
        )}
        {/* <input
        inputMode="none"
        value={""}
        onChange={(e) => setValue(e.target.value)}
        // style={{
        //   position: 'absolute',
        //   opacity: 0,
        //   pointerEvents: 'none',
        // }}
      /> */}
      </div>

      <div>
        <h2>تست آپلود تصویر</h2>
        <ImageUploader onChange={(_, base64) => console.log(base64)} />
      </div>
    </div>
  );
}

export default App;
