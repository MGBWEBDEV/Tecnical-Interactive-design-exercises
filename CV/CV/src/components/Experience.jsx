import {useState} from 'react';
import ExperienceEntry from './ExperienceEntry.jsx';//import components first
import '../styles/Experience.css';

function Experience() {
    const [entries, setEntries] = useState([
        { id: 1, company: "", position: "", responsibilities: "", dateFrom: "", dateTo: "" }
    ]);

    function updateEntry(id, updatedData) {
        const newEntries = entries.map(entry => {
            if (entry.id === id) {
                return { ...entry, ...updatedData };
            }
            return entry;
        });
        setEntries(newEntries);
    }

    function addEntry() {
        const newEntry = { id: Date.now(), company: "", position: "", responsibilities: "", dateFrom: "", dateTo: "" };
        setEntries([...entries, newEntry]);
    }

    function deleteEntry(id) {
        const newEntries = entries.filter(entry => entry.id !== id);
        setEntries(newEntries);
    }

    return (
        <div className="experience">
            <h2>Experience</h2>
            {entries.map(entry => (
                <ExperienceEntry key={entry.id} entry={entry} onUpdate={updateEntry} onDelete={deleteEntry} />
            ))}
            <button onClick={addEntry}>Add Experience</button>
        </div>
    );

}

export default Experience;
