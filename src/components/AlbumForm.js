import { useRef } from "react";
//Album Form for creating a new album
export const AlbumForm = ({ onAdd, loading }) => {
  const albumNameInput = useRef();
//clear the form
  const handleClear = () => (albumNameInput.current.value = "");
//form details submit
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    const albumName = albumNameInput.current.value;
    onAdd(albumName);
    handleClear();
  };

  return (
    <div className="albumForm">
      <span>Create an album</span>
      <form onSubmit={handleSubmit}>
        <input required placeholder="Album Name" ref={albumNameInput} />
        <button type="button" onClick={handleClear} disabled={loading}>
          Clear
        </button>
        <button disabled={loading}>Create</button>
      </form>
    </div>
  );
};
