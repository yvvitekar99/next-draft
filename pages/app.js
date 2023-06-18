import React, { useEffect, useRef, useState } from "react";
import { Editor, EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "@/styles/app.module.css";
import dynamic from "next/dynamic";
import draftToHtml from "draftjs-to-html";
function App() {
  const WysiwygEditor = dynamic(
    () => import("react-draft-wysiwyg").then((module) => module.Editor),
    { ssr: false }
  );
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const editorRef = useRef(null);
  useEffect(() => {
    handleGetHtml();
  }, [editorState]);
  const convertHtmlToEditorState = (html) => {
    const blocksFromHTML = convertFromHTML(html);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    return EditorState.createWithContent(contentState);
  };
  const handleGetHtml = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const markup = draftToHtml(rawContentState);

    console.log(markup); // HTML content of the editor
  };
  return (
    <div style={{ width: "600px", height: "30vh" }}>
      <WysiwygEditor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName={`${styles.wrapper}`}
        editorClassName={`${styles.editor}`}
        toolbarClassName={`${styles.toolbar}`}
        ref={editorRef}
      />
    </div>
  );
}

export default App;
