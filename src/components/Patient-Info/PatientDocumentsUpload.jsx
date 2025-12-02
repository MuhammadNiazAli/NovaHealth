"use client";

import React, { useState, useRef } from "react";

// Allowed file types and max size
const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/jpg",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_SIZE_MB = 10;

// Helper to show human-readable file size
function prettyFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// Single file item component
function UploadedFileItem({ file, onRemove }) {
  return (
    <li
      className="flex items-center justify-between border border-gray-300 rounded-md p-3 shadow-sm"
      title={file.name}
    >
      <div className="flex items-center space-x-3 overflow-hidden">
        <svg
          className="w-6 h-6 text-gray-600 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6h6" />
        </svg>
        <span className="truncate max-w-xs">{file.name}</span>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">{prettyFileSize(file.size)}</span>
        <button
          onClick={onRemove}
          type="button"
          aria-label={`Remove file ${file.name}`}
          className="text-red-600 hover:text-red-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </li>
  );
}

// Main component
export default function PatientDocumentsUpload() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadError, setUploadError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  // Validate file size and type
  function validateFile(file) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `Unsupported file type: ${file.name}`;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return `File too large (max ${MAX_SIZE_MB}MB): ${file.name}`;
    }
    return null;
  }

  // Handle selected files from input or drop
  function handleSelectedFiles(fileList) {
    const newFiles = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const errorMsg = validateFile(file);
      if (errorMsg) {
        setUploadError(errorMsg);
        return;
      }
      newFiles.push(file);
    }

    // Prevent duplicates by name & size
    setUploadedFiles((existing) => {
      const filtered = existing.filter(
        (f) => !newFiles.some((nf) => nf.name === f.name && nf.size === f.size)
      );
      return [...filtered, ...newFiles];
    });

    setUploadError("");
  }

  // Reset input and process files from file input
  function onFileInputChange(e) {
    if (!e.target.files) return;
    handleSelectedFiles(e.target.files);
    e.target.value = null; // Reset input so same file can be reselected if needed
  }

  // Drag events for UI feedback
  function onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }
  function onDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  // Handle dropped files
  function onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleSelectedFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  }

  // Remove file by index
  function removeFileAtIndex(idx) {
    setUploadedFiles((files) => files.filter((_, i) => i !== idx));
  }

  // Trigger hidden input click
  function openFileSelector() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  return (
    <section
      aria-labelledby="upload-section-title"
      className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md"
    >
      <h2
        id="upload-section-title"
        className="text-3xl font-extrabold text-blue-700 mb-6 text-center"
      >
        Upload Documents
      </h2>

      <div
        role="button"
        tabIndex={0}
        onClick={openFileSelector}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            openFileSelector();
          }
        }}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        aria-describedby="upload-section-desc"
        className={`border-4 border-dashed rounded-lg p-10 cursor-pointer flex flex-col items-center justify-center text-center transition-colors ${
          isDragging ? "border-blue-600 bg-blue-50" : "border-gray-300 bg-gray-50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ALLOWED_TYPES.join(",")}
          onChange={onFileInputChange}
          className="hidden"
          aria-hidden="true"
        />
        <svg
          className="w-12 h-12 text-blue-500 mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16v4h10v-4M7 12l5-5 5 5M12 3v9" />
        </svg>
        <p className="text-lg font-medium text-blue-700 mb-1">
          Drag &amp; drop files here, or click to select files
        </p>
        <p id="upload-section-desc" className="text-sm text-gray-600 select-none">
          Supported formats: PDF, JPG, PNG, DOC, DOCX. Max file size: {MAX_SIZE_MB}MB
        </p>
      </div>

      {uploadError && (
        <p
          role="alert"
          aria-live="assertive"
          className="mt-4 text-center text-red-600 font-semibold"
        >
          {uploadError}
        </p>
      )}

      {uploadedFiles.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Uploaded Files</h3>
          <ul className="space-y-3 max-h-60 overflow-y-auto">
            {uploadedFiles.map((file, index) => (
              <UploadedFileItem
                key={`${file.name}-${file.size}-${index}`}
                file={file}
                onRemove={() => removeFileAtIndex(index)}
              />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
