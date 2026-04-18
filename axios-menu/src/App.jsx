import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [notebooks, setNotebooks] = useState([]);
  const [formData, setFormData] = useState({
    manufacturer: "",
    type: "",
    display: "",
    memory: "",
    harddisk: "",
    videocontroller: "",
    price: "",
    processorid: "",
    opsystemid: "",
    pieces: ""
  });
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    axios
      .get("./notebooks.json")
      .then((res) => {
        setNotebooks(res.data);
    })
      .catch((err) => {
        console.error("Error loading notebooks.json:", err);
    });
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (formData.manufacturer.trim() === "") {
      alert("Manufacturer required");
      return;
    }

    if (selectedId === null) {
      const newNotebook = {
        ...formData,
        id: Date.now().toString()
      };
      setNotebooks([...notebooks, newNotebook]);
    } else {
      const updated = notebooks.map((item) =>
        item.id === selectedId ? { ...formData, id: selectedId } : item
      );
      setNotebooks(updated);
      setSelectedId(null);
    }

    resetForm();
  }

  function handleDelete(id) {
    const updated = notebooks.filter((item) => item.id !== id);
    setNotebooks(updated);
  }

  function handleEdit(item) {
    setFormData({
      manufacturer: item.manufacturer,
      type: item.type,
      display: item.display,
      memory: item.memory,
      harddisk: item.harddisk,
      videocontroller: item.videocontroller,
      price: item.price,
      processorid: item.processorid,
      opsystemid: item.opsystemid,
      pieces: item.pieces
    });
    setSelectedId(item.id);
  }

  function resetForm() {
    setFormData({
      manufacturer: "",
      type: "",
      display: "",
      memory: "",
      harddisk: "",
      videocontroller: "",
      price: "",
      processorid: "",
      opsystemid: "",
      pieces: ""
    });
    setSelectedId(null);
  }

  return (
    <div className="container">
      <h1>Notebook CRUD (Axios)</h1>

      <form onSubmit={handleSubmit} className="form">
        <input name="manufacturer" placeholder="Manufacturer" value={formData.manufacturer} onChange={handleChange} />
        <input name="type" placeholder="Type" value={formData.type} onChange={handleChange} />
        <input name="display" placeholder="Display" value={formData.display} onChange={handleChange} />
        <input name="memory" placeholder="Memory" value={formData.memory} onChange={handleChange} />
        <input name="harddisk" placeholder="Hard Disk" value={formData.harddisk} onChange={handleChange} />
        <input name="videocontroller" placeholder="Video" value={formData.videocontroller} onChange={handleChange} />
        <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
        <input name="processorid" placeholder="Processor ID" value={formData.processorid} onChange={handleChange} />
        <input name="opsystemid" placeholder="OS ID" value={formData.opsystemid} onChange={handleChange} />
        <input name="pieces" placeholder="Pieces" value={formData.pieces} onChange={handleChange} />

        <div className="buttons">
          <button type="submit">
            {selectedId ? "Update Notebook" : "Add Notebook"}
          </button>
          <button type="button" onClick={resetForm}>
            Clear
          </button>
        </div>
      </form>

      <table>
        <thead>
          <tr>
            <th>Manufacturer</th>
            <th>Type</th>
            <th>Price</th>
            <th>Pieces</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {notebooks.map((item) => (
            <tr key={item.id}>
              <td>{item.manufacturer}</td>
              <td>{item.type}</td>
              <td>{item.price}</td>
              <td>{item.pieces}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;