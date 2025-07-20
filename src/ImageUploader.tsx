import React, { useState, useRef, useEffect } from "react";

interface ImageUploaderProps {
  onChange?: (file: File | null, base64: string | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onChange }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result?.toString() || null;
        onChange?.(file, base64);
      };
      reader.readAsDataURL(file);
    } else {
      reset();
    }
  };

  const reset = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onChange?.(null, null);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div style={{ textAlign: "center" }}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {!previewUrl ? (
        <button onClick={handleClick}>Upload Image</button>
      ) : (
        <div style={{ marginTop: "1rem" }}>
          <img
            src={previewUrl}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "300px",
              borderRadius: "8px",
              marginBottom: "0.5rem",
            }}
          />
          <div>
            <button onClick={reset} style={{ marginRight: "1rem" }}>
              Delete
            </button>
            <button onClick={handleClick}>Change</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
