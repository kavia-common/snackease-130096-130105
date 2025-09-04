import React from 'react';

// PUBLIC_INTERFACE
export default function CategoryCard({ title, icon, onClick, highlight = false }) {
  /** Category tile styled per assets/2 and 3. */
  return (
    <div className="category-card chip-164">
      <div className="category-inner card-161">
        <div className={`category-icon ${icon}`} aria-hidden="true"></div>
        <div className="typo-41 category-title">{title}</div>
        <button className={`round-cta ${highlight ? 'yellow' : ''}`} aria-label={`See ${title}`} onClick={onClick}>
          <span className="arrow" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  );
}
