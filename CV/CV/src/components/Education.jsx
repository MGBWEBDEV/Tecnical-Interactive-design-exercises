import EducationEntry from './EducationEntry';
import "../styles/Education.css";

function Education({ entries, setEntries }) {

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
    const newEntry = { id: crypto.randomUUID(), school: "", degree: "", year: "" };
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
