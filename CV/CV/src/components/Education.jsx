import {useState} from 'react';
import EducationEntry from './EducationEntry'; //import componets first

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

return (
  <div>
    <h2>Education</h2>
    {entries.map(entry => (
      <EducationEntry key={entry.id} entry={entry} onUpdate={updateEntry} />
    ))}
  </div>
);

}

export default Education;
