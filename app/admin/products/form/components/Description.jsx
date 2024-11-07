"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }],
      [{ size: ["extra-small", "small", "medium", "large"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  },
};

const Description = ({ data, handleData }) => {
  const handleChange = (value) => {
    handleData("description", value);
  };
  const quillRef = useRef(null);

  return (
    <section className="flex h-full flex-col gap-3 rounded-xl border bg-white p-4 shadow-lg shadow-black/20">
      <h2 className="font-semibold">Descripción</h2>
      <ReactQuill
        ref={quillRef}
        value={data?.description}
        onChange={handleChange}
        modules={modules}
        placeholder="Escribe tu descripción..."
      />
    </section>
  );
};

export default Description;
