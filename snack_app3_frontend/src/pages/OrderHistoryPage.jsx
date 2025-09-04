import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { snacks } from '../data/snacks';

// PUBLIC_INTERFACE
export default function OrderHistoryPage() {
  /** Simple order history list using localStorage orders. */
  const { orders } = useCart();

  return (
    <div className="screen container screen-2" style={{ paddingBottom: 24 }}>
      <div className="status-bar">
        <div className="time typo-45">9:41</div>
        <div className="status-icons">
          <span className="cell-bars" aria-hidden="true"></span>
          <span className="wifi" aria-hidden="true"></span>
          <span className="battery" aria-hidden="true"></span>
        </div>
      </div>

      <div className="top-nav">
        <button className="icon-button grid-button" aria-label="Options">
          <span className="dot"></span><span className="dot"></span><span className="dot"></span><span className="dot"></span>
        </button>
        <div className="location">
          <span className="location-icon" aria-hidden="true"></span>
          <span className="typo-47 location-text">Your Orders</span>
          <span className="chevron-down" aria-hidden="true"></span>
        </div>
        <Link to="/" className="icon-button profile" aria-label="Home"></Link>
      </div>

      <section className="section">
        <div className="section-head">
          <h2 className="typo-39">Order History</h2>
        </div>
        {orders.length === 0 && <div className="typo-41" style={{ padding: 16 }}>No orders yet. <Link to="/">Browse snacks</Link></div>}
        <ul style={{ padding: 16, display: 'grid', gap: 12 }}>
          {orders.map(o => (
            <li key={o.id} className="card-162" style={{ padding: 12, borderRadius: 16 }}>
              <div className="typo-41" style={{ marginBottom: 6 }}>Order #{o.id}</div>
              <div className="typo-42" style={{ marginBottom: 8 }}>{new Date(o.createdAt).toLocaleString()}</div>
              <ul style={{ display: 'grid', gap: 6 }}>
                {o.items.map(it => {
                  const s = snacks.find(sn => sn.id === it.id);
                  return (
                    <li key={it.id} className="typo-42">
                      {s ? s.title : it.id} × {it.qty}
                    </li>
                  );
                })}
              </ul>
              <div className="price-row" style={{ marginTop: 8 }}>
                <div className="typo-53 price price-muted">Rs.{o.total}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
