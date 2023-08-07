import { useState, useEffect } from "react";
import { toast } from "react-toastify";


// components imports
import { AlbumForm } from "./AlbumForm";
import { ImageList } from "./imageList";

// firebase imports
import { collection, getDocs, addDoc, deleteDoc, doc, Timestamp, query, orderBy } from "firebase/firestore";
import { db } from "./firebase";
//Album
export const AlbumsList = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);

  const [albumAddLoading, setAlbumAddLoading] = useState(false);

  const getAlbums = async () => {
    setLoading(true);
    const albumsRef = collection(db, "albums");
    const albumsSnapshot = await getDocs(query(albumsRef, orderBy("created", "desc")));
    const albumsData = albumsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setAlbums(albumsData);
    setLoading(false);
  };

  useEffect(() => {
    getAlbums();
  }, []);

  const handleAdd = async (name) => {
    if (albums.find((a) => a.name === name)) return toast.error("Album name already in use.");
    setAlbumAddLoading(true);
    const albumRef = await addDoc(collection(db, "albums"), { name, created: Timestamp.now() });
    setAlbums((prev) => [{ id: albumRef.id, name }, ...prev]);
    setAlbumAddLoading(false);
    toast.success("Album added successfully.");
  };

  const [createAlbumIntent, setCreateAlbumIntent] = useState(false);
  const [activeAlbum, setActiveAlbum] = useState(null);

  const handleClick = (name) => {
    if (activeAlbum === name) return setActiveAlbum(null);
    setActiveAlbum(name);
  };

  const handleBack = () => setActiveAlbum(null);

  const handleDeleteAlbum = async (e, albumId) => {
    e.stopPropagation();

    try {
      // Step 1: Delete the album from the "albums" collection
      await deleteDoc(doc(db, "albums", albumId));
      // Step 2: Delete all the images associated with the album from the "images" collection
      const imagesRef = collection(db, "albums", albumId, "images");
      const imagesSnapshot = await getDocs(imagesRef);
      const deletePromises = imagesSnapshot.docs.map((imageDoc) =>
        deleteDoc(doc(db, "albums", albumId, "images", imageDoc.id))
      );
      await Promise.all(deletePromises);

      // Step 3: Update the state to remove the deleted album from the list
      const filteredAlbums = albums.filter((album) => album.id !== albumId);
      setAlbums(filteredAlbums);

      toast.success("Album and its images deleted successfully.");
    } catch (error) {
      toast.error("Error deleting album and its images. Please try again later.");
    }
  };

  return (
    <>
      {createAlbumIntent && !activeAlbum && <AlbumForm loading={albumAddLoading} onAdd={handleAdd} />}
      {!activeAlbum && (
        <div className="Album-container">
          <div className="top">
            <h3>Your albums</h3>
            <button
              className={createAlbumIntent ? "active" : null}
              onClick={() => setCreateAlbumIntent(!createAlbumIntent)}
            >
              {!createAlbumIntent ? "Add album" : "Cancel"}
            </button>
          </div>
          <div className="albumsList">
            {albums.map((album) => (
              <div key={album.id} className="album" onClick={() => handleClick(album.name)}>
                <img
                  src="https://www.ird.lk/wp-content/uploads/2018/11/acd-festival-photo-gallery.png"
                  alt="images"
                />
                <span>{album.name}</span>
                <img
                  className="deleteAlbum"
                  onClick={(e) => handleDeleteAlbum(e, album.id)}
                  src="https://iridescent-faloodeh-3725ab.netlify.app/assets/trash-bin.png"
                  alt="delete"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {activeAlbum && (
        <ImageList
          albumId={albums.find((a) => a.name === activeAlbum).id}
          albumName={activeAlbum}
          onBack={handleBack}
        />
      )}
    </>
  );
};
