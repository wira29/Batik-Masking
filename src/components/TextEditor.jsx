import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const TextEditor = ({
  label,
  value,
  onChange,
  placeholder = "Tulis sesuatu...",
  required = false,
}) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [isError, setIsError] = useState(false);

  // Inisialisasi Quill
  useEffect(() => {
    if (quillRef.current) return;

    const q = new Quill(editorRef.current, {
      theme: "snow",
      placeholder,
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
      },
    });

    // Style editor
    q.root.style.backgroundColor = "#0000";
    q.root.style.color = "#ffff";
    q.root.style.minHeight = "200px";
    q.root.style.padding = "0.5rem";
    q.root.style.fontSize = "1rem";

    // Set value awal
    if (value) {
      q.clipboard.dangerouslyPasteHTML(value);
    }

    // Sinkron ke parent
    q.on("text-change", () => {
      const content = q.root.innerHTML;
      onChange(content);

      if (required) {
        const isEmpty = !content || content === "<p><br></p>";
        setIsError(isEmpty);
      }
    });

    quillRef.current = q;
  }, []);

  // Update Quill saat value parent berubah
  useEffect(() => {
    if (!quillRef.current) return;
    if (value !== quillRef.current.root.innerHTML) {
      quillRef.current.clipboard.dangerouslyPasteHTML(value || "");
    }
  }, [value]);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <div
        className={`rounded-lg border overflow-hidden text-white text-lg ${
          isError ? "border-red-500" : "border-gray-500/[0.5]"
        }`}
      >
        <div ref={editorRef} />
      </div>
    </div>
  );
};

export default TextEditor;
