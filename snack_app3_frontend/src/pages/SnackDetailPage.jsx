import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { snacks } from '../data/snacks';
import { useCart } from '../context/CartContext';

// PUBLIC_INTERFACE
export default function SnackDetailPage() {
  /** Snack detail per assets/4 and 40 dark style. */
  const { id } = useParams();
  const snack = useMemo(() => snacks.find(s => s.id === id), [id]);
  const [size, setSize] = useState('m');
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const navigate = useNavigate();

  if (!snack) return <div className="container screen-4"><div style={{ padding: 16 }}>Not found</div></div>;

  function inc() { setQty(q => q + 1); }
  function dec() { setQty(q => Math.max(1, q - 1)); }
  function onAdd() {
    addItem(snack.id, qty);
    navigate('/cart');
  }

  return (
    <div className="screen-4 container">
      <div className="bg-frame" aria-hidden="true">
        <div className="bg-ellipse" aria-hidden="true"></div>
        <div className="waves-stack" aria-hidden="true">
          <div className="wave band-1"></div>
          <div className="wave band-2"></div>
          <div className="wave band-3"></div>
          <div className="wave band-4"></div>
          <div className="wave band-5"></div>
        </div>
      </div>

      <div className="status-bar">
        <div className="time typo-45">9:41</div>
        <div className="status-icons">
          <span className="cell-bars" aria-hidden="true"></span>
          <span className="wifi" aria-hidden="true"></span>
          <span className="battery" aria-hidden="true">
            <span className="battery-border"></span>
            <span className="battery-cap"></span>
            <span className="battery-level"></span>
          </span>
        </div>
      </div>

      <div className="top-nav">
        <button className="icon-button back" aria-label="Back" onClick={() => navigate(-1)}>
          <span className="arrow-left" aria-hidden="true"></span>
        </button>
        <div className="spacer"></div>
        <button className="icon-button heart" aria-label="Favorite">
          <span className="heart-glyph" aria-hidden="true"></span>
        </button>
      </div>

      <section className="heading">
        <h1 className="title typo-82">{snack.title}</h1>
        <div className="price-row">
          <span className="price-prefix" aria-hidden="true">Rs.</span>
          <span className="price typo-83">{snack.price}</span>
        </div>
      </section>

      <main className="content">
        <aside className="size-selector">
          <div className="size-label typo-80">Size</div>
          <button className={`size-box ${size === 's' ? 'active' : ''}`} onClick={() => setSize('s')}><span className="typo-81">S</span></button>
          <button className={`size-box ${size === 'm' ? 'active' : ''}`} onClick={() => setSize('m')}><span className="typo-81">M</span></button>
          <button className={`size-box ${size === 'l' ? 'active' : ''}`} onClick={() => setSize('l')}><span className="typo-81">L</span></button>
        </aside>

        <div className="pizza-thumb" aria-label="Product" role="img"></div>

        <div className="quantity">
          <div className="quantity-label typo-80">Quantity</div>
          <div className="quantity-row">
            <button className="btn-square minus" onClick={dec} aria-label="Decrease quantity">-</button>
            <span className="count typo-60">{qty}</span>
            <button className="btn-square plus" onClick={inc} aria-label="Increase quantity">+</button>
          </div>
        </div>

        <div className="review-row">
          <div className="meta rating">
            <span className="icon star" aria-hidden="true"></span>
            <span className="typo-79 text">4.9</span>
          </div>
          <div className="meta calories">
            <span className="icon fire" aria-hidden="true"></span>
            <span className="typo-79 text">{snack.cal} cal</span>
          </div>
          <div className="meta time">
            <span className="icon time" aria-hidden="true"></span>
            <span className="typo-79 text">{snack.estMins} min</span>
          </div>
        </div>

        <section className="details">
          <h2 className="typo-78 details-title">Details</h2>
          <p className="typo-42 details-text">{snack.description}</p>
        </section>

        <button className="cta-add" onClick={onAdd}>
          <span className="cta-text typo-77">Add to cart</span>
        </button>
      </main>

      <div className="safe-bottom" aria-hidden="true"></div>
    </div>
  );
}
