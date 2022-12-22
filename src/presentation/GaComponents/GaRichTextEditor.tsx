import { useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";

import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";

const Emoji = require("quill-emoji");

Quill.register("modules/emoji", Emoji);

export interface EditorContentChanged {
  html: string;
  markdown: string;
}

export interface EditorProps {
  value?: string;
  onChange?: any;
}

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike", "blockquote", "link"],
  [
    {
      color: [
        "#ffa726",
        "#4285F4",
        "#34A853",
        "#FBBC05",
        "#EA4335",
        "#000000",
        "#808080 ",
      ],
    },
  ],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  ,
  [
    { align: "" },
    { align: "center" },
    { align: "right" },
    { align: "justify" },
  ],
  ["emoji"],
];

export default function Editor(props: EditorProps) {
  const reactQuillRef = useRef<ReactQuill>(null);

  return (
    <ReactQuill
      ref={reactQuillRef}
      theme="snow"
      placeholder="Start your description..."
      modules={{
        toolbar: {
          container: TOOLBAR_OPTIONS,
        },

        "emoji-toolbar": false,
        "emoji-textarea": false,
        "emoji-shortname": true,
      }}
      value={props.value}
      onChange={props.onChange}
    />
  );
}
