import React, { useState, useRef } from 'react';
import './App.css';
import logo from './logo.jpeg';  // Make sure to add your logo image to the src directory

const App = () => {
  const [textBoxes, setTextBoxes] = useState([]);
  const [history, setHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);
  const [selectedTextBox, setSelectedTextBox] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  const addTextBox = () => {
    const newTextBox = {
      id: Date.now(),
      text: 'New Text',
      fontSize: 20,
      fontFamily: 'Arial',
      bold: false,
      x: 100,
      y: 100,
      width: 200,
      height: 50,
      selected: false,
    };
    updateHistory([...textBoxes, newTextBox]);
  };

  const updateHistory = (newBoxes) => {
    setHistory([...history, textBoxes]);
    setRedoHistory([]);
    setTextBoxes(newBoxes);
  };

  const handleMouseDown = (e, id) => {
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const box = textBoxes.find((box) => box.id === id);

    setIsDragging(true);
    setSelectedTextBox(box);
    setDragOffset({
      x: e.clientX - canvasRect.left - box.x,
      y: e.clientY - canvasRect.top - box.y,
    });

    const updatedTextBoxes = textBoxes.map((box) =>
      box.id === id ? { ...box, selected: true } : { ...box, selected: false }
    );
    setTextBoxes(updatedTextBoxes);
  };

  const handleMouseMove = (e) => {
    if (isDragging && selectedTextBox) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const newX = Math.min(Math.max(e.clientX - canvasRect.left - dragOffset.x, 0), canvasRect.width - 100);
      const newY = Math.min(Math.max(e.clientY - canvasRect.top - dragOffset.y, 0), canvasRect.height - 40);

      const updatedBoxes = textBoxes.map((box) =>
        box.id === selectedTextBox.id
          ? { ...box, x: newX, y: newY }
          : box
      );
      setTextBoxes(updatedBoxes);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      setSelectedTextBox(null);
      updateHistory(textBoxes);
    }
  };

  const handleTextChange = (e) => {
    if (selectedTextBox) {
      const newText = e.target.value;
      const updatedTextBoxes = textBoxes.map((box) =>
        box.id === selectedTextBox.id
          ? { ...box, text: newText, width: Math.max(200, newText.length * 10), height: Math.max(50, newText.split('\n').length * 20) }
          : box
      );
      updateHistory(updatedTextBoxes);
    }
  };

  const editTextBox = (key, value) => {
    if (selectedTextBox) {
      const updatedTextBoxes = textBoxes.map((box) =>
        box.id === selectedTextBox.id ? { ...box, [key]: value } : box
      );
      updateHistory(updatedTextBoxes);
    }
  };

  const undo = () => {
    if (history.length > 0) {
      const previousState = history.pop();
      setRedoHistory([textBoxes, ...redoHistory]);
      setTextBoxes(previousState);
    }
  };

  const redo = () => {
    if (redoHistory.length > 0) {
      const nextState = redoHistory.shift();
      setHistory([...history, textBoxes]);
      setTextBoxes(nextState);
    }
  };

  return (
    <div className="app" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      {/* Header with logo and title */}
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">Celebrare</h1>
      </header>

      <div className="controls">
        
        <button className="btn" onClick={undo} disabled={history.length === 0}>Undo</button>
        <button className="btn" onClick={redo} disabled={redoHistory.length === 0}>Redo</button>
      </div>

      <div className="canvas" ref={canvasRef}>
        {textBoxes.map((box) => (
          <textarea
            key={box.id}
            className="text-box"
            value={box.text}
            style={{
              top: `${box.y}px`,
              left: `${box.x}px`,
              fontSize: `${box.fontSize}px`,
              fontFamily: box.fontFamily,
              fontWeight: box.bold ? 'bold' : 'normal',
              width: `${box.width}px`,
              height: `${box.height}px`,
              border: box.selected ? '1px solid #ccc' : 'none',
            }}
            onMouseDown={(e) => handleMouseDown(e, box.id)}
            onChange={handleTextChange}
            onClick={() => setSelectedTextBox(box)}
          />
        ))}
      </div>

      {selectedTextBox && (
        <div className="text-controls">
          <select
            value={selectedTextBox.fontSize}
            onChange={(e) => editTextBox('fontSize', parseInt(e.target.value))}
            className="input"
          >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
          </select>
          <select
            value={selectedTextBox.fontFamily}
            onChange={(e) => editTextBox('fontFamily', e.target.value)}
            className="input"
          >
            <option value="Arial">Arial</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
          </select>
          <button
            className={`btn bold-btn ${selectedTextBox.bold ? 'active' : ''}`}
            onClick={() => editTextBox('bold', !selectedTextBox.bold)}
          >
            Bold
          </button>
        </div>
      )}<button className="btn" onClick={addTextBox}>Add Text</button>
    </div>
  );
};

export default App;
