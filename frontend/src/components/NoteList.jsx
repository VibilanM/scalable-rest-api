import NoteItem from "./NoteItem";

const NoteList = ({ notes, onNoteUpdated, onNoteDeleted }) => {
    if (notes.length === 0) {
        return <p className="empty-text">No notes yet. Create your first note above!</p>;
    }

    return (
        <div className="note-list">
            {notes.map((note) => (
                <NoteItem
                    key={note._id}
                    note={note}
                    onNoteUpdated={onNoteUpdated}
                    onNoteDeleted={onNoteDeleted}
                />
            ))}
        </div>
    );
};

export default NoteList;
