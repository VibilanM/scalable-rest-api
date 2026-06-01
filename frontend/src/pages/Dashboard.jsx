import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const fetchNotes = async () => {
        try {
            const res = await api.get("/notes");
            setNotes(res.data.notes);
            setError("");
        } catch (err) {
            setError("Failed to fetch notes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleNoteCreated = () => {
        fetchNotes();
    };

    const handleNoteUpdated = () => {
        fetchNotes();
    };

    const handleNoteDeleted = () => {
        fetchNotes();
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>My Notes</h1>
                <button className="btn btn-logout" onClick={handleLogout}>
                    Logout
                </button>
            </header>

            <NoteForm onNoteCreated={handleNoteCreated} />

            {error && <div className="alert alert-error">{error}</div>}

            {loading ? (
                <p className="loading-text">Loading notes...</p>
            ) : (
                <NoteList
                    notes={notes}
                    onNoteUpdated={handleNoteUpdated}
                    onNoteDeleted={handleNoteDeleted}
                />
            )}
        </div>
    );
};

export default Dashboard;
