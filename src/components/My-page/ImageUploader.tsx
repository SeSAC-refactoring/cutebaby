import React, { useRef, useState, useEffect } from "react";

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

      // ✅ 파일 크기 제한 (2MB 이하)
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

          const targetSize = 200; // ✅ 이미지 크기 100x100으로 조정
          canvas.width = targetSize;
          canvas.height = targetSize;

          let srcX = 0,
            srcY = 0,
            srcWidth = img.width,
            srcHeight = img.height;

          if (img.width > img.height) {
            srcX = (img.width - img.height) / 2;
            srcWidth = img.height;
          } else {
            srcY = (img.height - img.width) / 2;
            srcHeight = img.width;
          }

          ctx?.drawImage(img, srcX, srcY, srcWidth, srcHeight, 0, 0, targetSize, targetSize);

          // ✅ 원본 파일의 타입을 유지하여 저장
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const fileType = file.type; // 원본 파일 타입 유지
                const fileName = file.name; // 원본 파일명 유지

                const optimizedFile = new File([blob], fileName, { type: fileType });

                // ✅ 미리보기 URL 생성 및 메모리 누수 방지
                const previewURL = URL.createObjectURL(optimizedFile);
                setImagePreview(previewURL);

                // ✅ 부모 컴포넌트로 파일 전달
                onImageSelect(optimizedFile);
              }
            },
            file.type, // 원본 파일 형식 유지
            0.8 // ✅ 압축 품질 (0.0 ~ 1.0)
          );
        };
      };
    }
  };

  // ✅ 이미지 취소 처리
  const handleCancelImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview); // 메모리 누수 방지
    }
    setImagePreview(null);
    onImageSelect(null);
  };

  // ✅ 외부에서 resetTrigger가 변경되면 이미지 초기화
  useEffect(() => {
    if (resetTrigger) {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview); // 메모리 해제
      }
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
