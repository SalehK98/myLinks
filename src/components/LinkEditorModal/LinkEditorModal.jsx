// export default function LinkEditorModal() {
//   return <div>LinkEditorModal</div>;
// }
import React, { useState } from "react";

const LinkModal = ({ show, onHide, onSave }) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const handleSave = () => {
    // Perform validation here if needed
    const newLink = {
      title,
      link,
      category,
      isFavorite,
    };
    onSave(newLink);
    onHide();
  };

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Link</h5>
            <button type="button" className="close" onClick={onHide}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Link</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Select category...</option>
                  {/* Populate options dynamically based on your categories */}
                  <option>Category 1</option>
                  <option>Category 2</option>
                  <option>Category 3</option>
                </select>
              </div>
              <div className="form-group">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="favoriteCheckbox"
                    checked={isFavorite}
                    onChange={() => setIsFavorite(!isFavorite)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="favoriteCheckbox"
                  >
                    Add to Favorites
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onHide}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkModal;
