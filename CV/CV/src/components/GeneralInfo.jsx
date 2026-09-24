import { useState } from "react";
import "../styles/GeneralInfo.css";

function GeneralInfo({ info, setInfo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(info);

    if (!isEditing) {
        return (
            <div className="general-info">
                <h2>General Information</h2>
                <p><strong>Name:</strong> {info.name}</p>
                <p><strong>Email:</strong>{info.email}</p>
                <p><strong>Phone:</strong> {info.phone}</p>
                <button onClick={() => { setDraft(info); setIsEditing(true); }}>Edit</button>
            </div>
        )
    }

    return (
        <div className="general-info">
            <h2>General Information</h2>
            <input
                placeholder="Name"
                value={draft.name}
                onChange={(e) => setDraft({...draft, name: e.target.value})}
            />

            <input
                placeholder="Email"
                value={draft.email}
                onChange={(e) => setDraft({...draft, email: e.target.value})}
            />

            <input
                placeholder="Phone"
                value={draft.phone}
                onChange={(e) => setDraft({...draft, phone: e.target.value})}
            />
            <button onClick={() => { setInfo(draft); setIsEditing(false); }}>Submit</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
    )

}

export default GeneralInfo;
