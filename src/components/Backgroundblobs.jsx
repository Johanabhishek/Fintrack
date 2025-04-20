// src/components/BackgroundBlobs.jsx
import React from 'react';

export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-purple-500 opacity-30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-2/3 w-96 h-96 bg-pink-500 opacity-25 rounded-full blur-2xl animate-blob animation-delay-4000"></div>
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-500 opacity-20 rounded-full blur-2xl animate-blob"></div>
    </div>
  );
}
