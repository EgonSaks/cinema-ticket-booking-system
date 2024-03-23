import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer className="mt-8 p-4 border text-center">
        &copy; {currentYear} Egon Saks
      </footer>
    </div>
  );
}
