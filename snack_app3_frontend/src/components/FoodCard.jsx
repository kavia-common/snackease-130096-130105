import React from 'react';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function FoodCard({ id, title, sub, price, thumbClass }) {
  /** Product card for "Popular Now" adapted from assets screen 2/3. */
  return (
    <article className="food-card card-162">
      <Link to={`/snack/${id}`} style={{ display: 'block' }}>
        <div className={`food-thumb ${thumbClass}`} aria-hidden="true"></div>
        <h3 className="typo-41 food-title">{title}</h3>
        {sub ? <div className="food-sub typo-42">{sub} <span className="fire" aria-label="Hot"></span></div> : null}
        <div className="price-row">
          <div className="typo-53 price price-muted">Rs.{price}</div>
        </div>
      </Link>
    </article>
  );
}
