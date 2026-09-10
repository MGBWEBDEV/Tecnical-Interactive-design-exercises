import {useState} from 'react';
import EducationEntry from './EducationEntry'; //import components first
import "../styles/Education.css";

function Education() {
const [entries, setEntries] = useState([
  { id: 1, school: "", degree: "", year: "" }
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
    const newEntry = { id: Date.now(), school: "", degree: "", year: "" };
    setEntries([...entries, newEntry]);
  }

  function deleteEntry(id) {
    const newEntries = entries.filter(entry => entry.id !== id);
    setEntries(newEntries);
  }

return (
  <div className="education">
    <h2>Education</h2>
    {entries.map(entry => (
      <EducationEntry key={entry.id} entry={entry} onUpdate={updateEntry} onDelete={deleteEntry} />
    ))}
    <button onClick={addEntry}>Add Education</button>
  </div>
);

}

export default Education;
