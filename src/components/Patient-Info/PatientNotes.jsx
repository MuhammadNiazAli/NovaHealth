"use client";

import React, { useState, useRef, useEffect } from "react";

const PatientNotes = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: "Patient reported mild headaches over the last week.",
      createdAt: new Date("2024-07-25T10:30:00"),
    },
    {
      id: 2,
      content: "Recommended increasing hydration and follow-up in 2 weeks.",
      createdAt: new Date("2024-07-28T14:15:00"),
    },
  ]);

  const [currentInput, setCurrentInput] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);

  const textareaRef = useRef(null);

  // Auto-focus textarea when editing a note
  useEffect(() => {
    if (editingNoteId !== null) {
      textareaRef.current?.focus();
    }
  }, [editingNoteId]);

  // Handlers
  const onInputChange = (e) => setCurrentInput(e.target.value);

  const saveNote = () => {
    if (!currentInput.trim()) return;

    if (editingNoteId !== null) {
      // Update existing note
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editingNoteId ? { ...note, content: currentInput.trim() } : note
        )
      );
      setEditingNoteId(null);
    } else {
      // Add new note
      const newNote = {
        id: Date.now(),
        content: currentInput.trim(),
        createdAt: new Date(),
      };
      setNotes((prevNotes) => [newNote, ...prevNotes]);
    }

    setCurrentInput("");
  };

  const startEditing = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit) {
      setCurrentInput(noteToEdit.content);
      setEditingNoteId(id);
    }
  };

  const deleteNote = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (!confirmed) return;

    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));

    if (editingNoteId === id) {
      setEditingNoteId(null);
      setCurrentInput("");
    }
  };

  const cancelEdit = () => {
    setEditingNoteId(null);
    setCurrentInput("");
  };

  // Ctrl+Enter or Cmd+Enter shortcut to save note
  const onTextareaKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      saveNote();
    }
  };

  return (
    <section
      aria-labelledby="patient-notes-heading"
      className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md"
    >
      <h2
        id="patient-notes-heading"
        className="text-3xl font-extrabold text-blue-700 mb-6 text-center"
      >
        Patient Notes
      </h2>

      <div className="mb-6">
        <label
          htmlFor="note-textarea"
          className="block font-semibold text-gray-700 mb-2"
        >
          {editingNoteId !== null ? "Edit Note" : "Add a New Note"}
        </label>
        <textarea
          id="note-textarea"
          ref={textareaRef}
          rows={4}
          value={currentInput}
          onChange={onInputChange}
          onKeyDown={onTextareaKeyDown}
          placeholder="Write your note here. Press Ctrl+Enter (Cmd+Enter) to save."
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition-colors"
          aria-multiline="true"
        />

        <div className="flex space-x-3 mt-3">
          <button
            type="button"
            onClick={saveNote}
            disabled={!currentInput.trim()}
            aria-disabled={!currentInput.trim()}
            className={`px-6 py-2 font-semibold rounded-lg text-white transition-colors ${
              currentInput.trim()
                ? "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                : "bg-blue-700 opacity-50 cursor-not-allowed"
            }`}
          >
            {editingNoteId !== null ? "Save Note" : "Add Note"}
          </button>

          {editingNoteId !== null && (
            <button
              type="button"
              onClick={cancelEdit}
              className="px-6 py-2 font-semibold rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-4 focus:ring-gray-300 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <ul className="space-y-5 max-h-[480px] overflow-y-auto">
        {notes.length === 0 ? (
          <li className="text-center text-gray-500">No notes available.</li>
        ) : (
          notes.map(({ id, content, createdAt }) => (
            <li
              key={id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <p className="whitespace-pre-line text-gray-900">{content}</p>

                <div className="flex space-x-2 ml-4 flex-shrink-0">
                  <IconButton
                    label={`Edit note created on ${createdAt.toLocaleDateString()}`}
                    onClick={() => startEditing(id)}
                    icon={
                      <EditIcon />
                    }
                    colorClasses="text-blue-600 hover:text-blue-800"
                  />
                  <IconButton
                    label={`Delete note created on ${createdAt.toLocaleDateString()}`}
                    onClick={() => deleteNote(id)}
                    icon={
                      <DeleteIcon />
                    }
                    colorClasses="text-red-600 hover:text-red-800"
                  />
                </div>
              </div>

              <time
                dateTime={createdAt.toISOString()}
                className="block mt-2 text-xs text-gray-500 select-none"
              >
                Created on{" "}
                {createdAt.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

const IconButton = ({ label, onClick, icon, colorClasses }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={label}
    className={`focus:outline-none focus:ring-2 focus:ring-offset-1 rounded ${colorClasses}`}
  >
    {icon}
  </button>
);

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

export default PatientNotes;
