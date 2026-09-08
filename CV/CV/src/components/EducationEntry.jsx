import { useState } from "react";

function EducationEntry({ entry, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(entry);

  if (!isEditing) {
    return (
      <div>
        <p>{entry.school}</p>
        <p>{entry.degree}</p>
        <p>{entry.year}</p>
        <button onClick={() => { setDraft(entry); setIsEditing(true); }}>
          Edit
        </button>
      </div>
    );
  }

  return (
    <div>
      <input
        value={draft.school}
        onChange={(e) => setDraft({ ...draft, school: e.target.value })}
      />
      <input
        value={draft.degree}
        onChange={(e) => setDraft({ ...draft, degree: e.target.value })}
      />
      <input
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