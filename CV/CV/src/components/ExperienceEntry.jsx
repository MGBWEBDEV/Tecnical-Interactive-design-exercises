import { useState } from "react";
import '../styles/ExperienceEntry.css';

function ExperienceEntry({ entry, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(entry);

    if (!isEditing) {
        return (
            <div className="experience-entry">
                <p><strong>Company:</strong> {entry.company}</p>
                <p><strong>Position:</strong> {entry.position}</p>
                <p><strong>Responsibilities:</strong> {entry.responsibilities}</p>
                <p><strong>From:</strong> {entry.dateFrom} </p>
                <p><strong>To:</strong> {entry.dateTo}</p>
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
        <div className="experience-entry">
            <input
                placeholder="Company"
                value={draft.company}
                onChange={(e) => setDraft({ ...draft, company: e.target.value })}
            />
            <input
                placeholder="Position"
                value={draft.position}
                onChange={(e) => setDraft({ ...draft, position: e.target.value })}
            />
            <textarea
                placeholder="Responsibilities"
                value={draft.responsibilities}
                onChange={(e) => setDraft({ ...draft, responsibilities: e.target.value })}
                rows={4}
            />
            <input
                placeholder="Date From"
                value={draft.dateFrom}
                onChange={(e) => setDraft({ ...draft, dateFrom: e.target.value })}
            />
            <input
                placeholder="Date To"
                value={draft.dateTo}
                onChange={(e) => setDraft({ ...draft, dateTo: e.target.value })}
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

export default ExperienceEntry;