import { useState } from "react";
import "../styles/EducationEntry.css";

function EducationEntry({ entry, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(entry);

    if (!isEditing) {
        return (
            <div className="education-entry">
                <p><strong>School:</strong> {entry.school}</p>
                <p><strong>Degree:</strong> {entry.degree}</p>
                <p><strong>Year:</strong> {entry.year}</p>
                <button onClick={() => { setDraft(entry); setIsEditing(true); }}>
                    Edit
                </button>
                <button onClick={() => onDelete(entry.id)}>
                    Delete
                </button>
            </div>
        );
    }

    return (
        <div className="education-entry">
            <input
                placeholder="School"
                value={draft.school}
                onChange={(e) => setDraft({ ...draft, school: e.target.value })}
            />
            <input
                placeholder="Degree"
                value={draft.degree}
                onChange={(e) => setDraft({ ...draft, degree: e.target.value })}
            />
            <input
                placeholder="Year"
                value={draft.year}
                onChange={(e) => setDraft({ ...draft, year: e.target.value })}
            />
            <button onClick={() => { onUpdate(entry.id, draft); setIsEditing(false); }}>
                Submit
            </button>
            <button onClick={() => setIsEditing(false)}>
                Cancel
            </button>
        </div>
    );
}

export default EducationEntry;