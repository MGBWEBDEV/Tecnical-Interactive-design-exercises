import { useState } from "react";
import "../styles/GeneralInfo.css";

function GeneralInfo() {
    const [isEditing, setIsEditing] = useState(false);
    const [info, setInfo] = useState({name: "", email: "", phone: ""});

    if (!isEditing) {
        return (
            <div className="general-info">
                <h2>General Information</h2>
                <p><strong>Name:</strong> {info.name}</p>
                <p><strong>Email:</strong>{info.email}</p>
                <p><strong>Phone:</strong> {info.phone}</p>
                <button onClick={() => setIsEditing(true)}>Edit</button>
            </div>
        )
    }

    return (
        <div className="general-info">
            <h2>General Information</h2>
            <input
                placeholder="Name"
                value={info.name}
                onChange={(e) => setInfo({...info, name: e.target.value})}
            />

            <h2>Email</h2>
            <input
                placeholder="Email"
                value={info.email}
                onChange={(e) => setInfo({...info, email: e.target.value})}
            />

            <h2>General Information</h2>
            <input
                placeholder="phone"
                value={info.phone}
                onChange={(e) => setInfo({...info, phone: e.target.value})}
            />
            <button onClick={() => setIsEditing(false)}>Submit</button>
        </div>
    )

}

export default GeneralInfo;