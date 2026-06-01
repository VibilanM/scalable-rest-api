import { useState } from "react";
import api from "../services/api";

const NoteForm = ({ onNoteCreated }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const res = await api.post("/notes", { title, content });

            setIsError(false);
            setMessage(res.data.message);
            setTitle("");
            setContent("");

            onNoteCreated();
        } catch (error) {
            setIsError(true);
            setMessage(
                error.response?.data?.message || "Failed to create note."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="note-form-card">
            <h2>Create Note</h2>

            {message && (
                <div className={`alert ${isError ? "alert-error" : "alert-success"}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="note-title">Title</label>
                    <input
                        id="note-title"
                        type="text"
                        placeholder="Note title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="note-content">Content</label>
                    <textarea
                        id="note-content"
                        placeholder="Note content"
                        rows="4"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Add Note"}
                </button>
            </form>
        </div>
    );
};

export default NoteForm;
