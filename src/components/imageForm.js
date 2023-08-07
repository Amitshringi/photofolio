import { useEffect, useRef, useState } from "react";
//import required 
export const ImageForm = ({
  updateIntent,
  albumName,
  onAdd,
  onUpdate,
  loading,
}) => {
  const imageTitleInput = useRef();
  const imageUrlInput = useRef();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (updateIntent) {
      setTitle(updateIntent.title);
      setUrl(updateIntent.url);
    } else {
      handleClear();
    }
  }, [updateIntent]);
//image form
  const handleClear = () => {
    setTitle("");
    setUrl("");
  };
// image form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const imageData = { title, url };
    if (updateIntent) {
      onUpdate(imageData);
    } else {
      onAdd(imageData);
    }
    handleClear();
  };

  return (
    <div className="imageForm">
      <span>
        {!updateIntent
          ? `Add image to ${albumName}`
          : `Update image ${updateIntent.title}`}
      </span>

      <form onSubmit={handleSubmit}>
        <input
          required
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          ref={imageTitleInput}
        />
        <input
          required
          placeholder="Image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          ref={imageUrlInput}
        />
        <div className="actions">
          <button type="button" onClick={handleClear} disabled={loading}>
            Clear
          </button>
          <button type="submit" disabled={loading}>
            {!updateIntent ? "Add" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};
