import React, { useMemo, useState } from 'react';
import CategoryCard from '../components/CategoryCard';
import FoodCard from '../components/FoodCard';
import { categories, snacks } from '../data/snacks';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function HomePage() {
  /** Home screen: categories grid and popular items. */
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return snacks;
    return snacks.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="screen screen-2 container">
      {/* Status bar mimic */}
      <div className="status-bar">
        <div className="time typo-45">9:41</div>
        <div className="status-icons">
          <span className="cell-bars" aria-hidden="true"></span>
          <span className="wifi" aria-hidden="true"></span>
          <span className="battery" aria-hidden="true"></span>
        </div>
      </div>

      {/* Top Navigation */}
      <div className="top-nav">
        <button className="icon-button grid-button" aria-label="Options grid">
          <span className="dot"></span><span className="dot"></span><span className="dot"></span><span className="dot"></span>
        </button>
        <div className="location">
          <span className="location-icon" aria-hidden="true"></span>
          <span className="typo-47 location-text">PVR, Jabalpur</span>
          <span className="chevron-down" aria-hidden="true"></span>
        </div>
        <Link to="/orders" className="icon-button profile" aria-label="Orders"></Link>
      </div>

      {/* Filters panel quick demo */}
      <section className="panel panel-filters card-169">
        <div className="panel-row">
          <div className="panel-location">
            <span className="loc-mini" aria-hidden="true"></span>
            <span className="typo-48">All snacks</span>
          </div>
          <button className="panel-search" aria-label="Search"></button>
        </div>

        <div className="panel-section">
          <div className="panel-label typo-49">Category</div>
          <div className="chip-row">
            <button className="chip chip-120" onClick={() => setActiveCategory('all')}><span className="typo-50">All</span></button>
            {categories.map(c => (
              <button key={c.id} className="chip chip-120" onClick={() => setActiveCategory(c.id)}><span className="typo-50">{c.title}</span></button>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Title */}
      <h1 className="hero typo-43">Get your food<br/>Delivered!</h1>

      {/* Categories */}
      <section className="section">
        <div className="section-head">
          <h2 className="typo-39">Catagories</h2>
        </div>
        <div className="categories">
          {categories.map((c, idx) => (
            <CategoryCard
              key={c.id}
              title={c.title}
              icon={c.icon}
              highlight={idx > 0}
              onClick={() => setActiveCategory(c.id)}
            />
          ))}
        </div>
      </section>

      {/* Popular */}
      <section className="section popular">
        <div className="section-head">
          <h2 className="typo-39">Popular Now</h2>
          <a href="#popular" className="typo-40 view-all">View all</a>
        </div>
        <div className="popular-grid">
          {filtered.map(s => (
            <FoodCard
              key={s.id}
              id={s.id}
              title={s.title}
              sub={s.description.split('.')[0]}
              price={s.price}
              thumbClass={s.thumbClass}
            />
          ))}
        </div>
      </section>

      {/* Bottom nav styling mimic */}
      <nav className="bottom-wrap">
        <div className="bottom-bg" aria-hidden="true"></div>
        <button className="bottom-btn home active" aria-label="Home"></button>
        <button className="bottom-btn deals" aria-label="Deals"></button>
        <Link to="/cart" className="bottom-btn search" aria-label="Cart"></Link>
        <button className="bottom-btn cart" aria-label="Cart"></button>
        <Link to="/auth" className="bottom-btn user" aria-label="Account"></Link>
      </nav>
    </div>
  );
}
