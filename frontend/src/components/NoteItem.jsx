import { useState } from "react";
import api from "../services/api";

const NoteItem = ({ note, onNoteUpdated, onNoteDeleted }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        setLoading(true);

        try {
            await api.put(`/notes/${note._id}`, { title, content });
            setIsEditing(false);
            onNoteUpdated();
        } catch (error) {
            alert(error.response?.data?.message || "Failed to update note.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);

        try {
            await api.delete(`/notes/${note._id}`);
            onNoteDeleted();
        } catch (error) {
            alert(error.response?.data?.message || "Failed to delete note.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setTitle(note.title);
        setContent(note.content);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="note-card note-card-editing">
                <div className="form-group">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <textarea
                        rows="3"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div className="note-actions">
                    <button
                        className="btn btn-save"
                        onClick={handleUpdate}
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                        className="btn btn-cancel"
                        onClick={handleCancel}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="note-card">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div className="note-actions">
                <button
                    className="btn btn-edit"
                    onClick={() => setIsEditing(true)}
                >
                    Edit
                </button>
                <button
                    className="btn btn-delete"
                    onClick={handleDelete}
                    disabled={loading}
                >
                    {loading ? "Deleting..." : "Delete"}
                </button>
            </div>
        </div>
    );
};

export default NoteItem;
