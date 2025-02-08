import React, { useRef, useState } from "react";

interface ImageUploaderProps {
  onImageSelect: (file: File | null) => void;
  resetTrigger: boolean; 

}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, resetTrigger }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // ✅ 파일 크기 제한 (2MB 이상 제한)
      if (file.size > 2 * 1024 * 1024) {
        alert("파일 크기가 너무 큽니다! 2MB 이하의 이미지를 업로드해주세요.");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const targetSize = 100; // ✅ 이미지 크기를 100x100으로 조정
          canvas.width = targetSize;
          canvas.height = targetSize;

          let srcX = 0,
            srcY = 0,
            srcWidth = img.width,
            srcHeight = img.height;

          if (img.width > img.height) {
            srcX = (img.width - img.height) / 2; // 중앙 정렬
            srcWidth = img.height;
          } else {
            srcY = (img.height - img.width) / 2;
            srcHeight = img.width;
          }

          ctx?.drawImage(img, srcX, srcY, srcWidth, srcHeight, 0, 0, targetSize, targetSize);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const optimizedFile = new File([blob], file.name, { type: "image/webp" });

                setImagePreview(URL.createObjectURL(optimizedFile));

                // ✅ 부모 컴포넌트로 파일 전달
                onImageSelect(optimizedFile);

              }
            },
            "image/webp",
            0.8 // ✅ 압축 품질 (0.0 ~ 1.0)
          );
        };
      };
    }
  };

  const handleCancelImage = (e: React.FormEvent) => {
    e.preventDefault();
    setImagePreview(null);
    onImageSelect(null); // ✅ 부모 컴포넌트로 `null` 전달

    
  };
  React.useEffect(() => {
    if (resetTrigger) {
      setImagePreview(null);
    }
  }, [resetTrigger]);



  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} />
      {imagePreview && (
        <div>
          <img src={imagePreview} alt="아기 사진 미리보기" />
          <button onClick={handleCancelImage}>이미지 취소</button>
        </div>
      )}
    </div>
  );
};
