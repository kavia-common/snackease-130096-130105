import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { snacks } from '../data/snacks';

// PUBLIC_INTERFACE
export default function CartPage() {
  /** Cart/Order details view based on assets/5 and /6. */
  const { items, setQty, removeItem, total, placeOrder } = useCart();
  const navigate = useNavigate();

  const tax = Math.round(total * 0.05);
  const discount = total >= 1500 ? 50 : 0;
  const grand = Math.max(0, total + tax - discount);

  function inc(id, current) { setQty(id, current + 1); }
  function dec(id, current) { setQty(id, Math.max(0, current - 1)); }

  function onPay() {
    const order = placeOrder();
    if (order) navigate('/orders');
  }

  return (
    <div className="screen-6 container">
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
        <button className="icon-button grid-button" aria-label="Options">
          <span className="dot"></span><span className="dot"></span><span className="dot"></span><span className="dot"></span>
        </button>
        <div className="title-wrap">
          <span className="title typo-61">Order details</span>
        </div>
        <button className="icon-button profile" aria-label="Profile"></button>
      </div>

      <button className="back-arrow" aria-label="Back" onClick={() => navigate(-1)}></button>

      <section className="coupon card-141">
        <div className="coupon-icon" aria-hidden="true"></div>
        <div className="coupon-text">
          {discount > 0 ? (
            <>
              <div className="typo-47 line-1">Used Coupon</div>
              <div className="coupon-applied">
                <span className="tick" aria-hidden="true"></span>
                <span className="typo-75 applied">Code NEWUSER applied!</span>
              </div>
            </>
          ) : (
            <>
              <div className="typo-66 line-1">Apply Coupon</div>
              <div className="typo-66 line-2">Save Rs.50 with NEWUSER</div>
            </>
          )}
        </div>
        <span className="chevron-right small" aria-hidden="true"></span>
      </section>

      <section className="order-list card-141">
        {items.length === 0 && <div className="typo-67" style={{ padding: 16 }}>Your cart is empty. <Link to="/">Add items</Link></div>}
        {items.map(ci => {
          const s = snacks.find(sn => sn.id === ci.id);
          if (!s) return null;
          return (
            <div className="order-item" key={ci.id}>
              <div className={`thumb ${s.thumbClass}`} aria-hidden="true"></div>
              <div className="item-info">
                <div className="item-row">
                  <div className="name-wrap">
                    <div className="typo-67 name">{s.title}</div>
                    <div className="customized">
                      <span className="typo-69">CUSTOMIZED</span>
                      <span className="chevron-down tiny" aria-hidden="true"></span>
                    </div>
                  </div>
                  <div className="qty">
                    <button className="btn-qty minus" onClick={() => dec(ci.id, ci.qty)} aria-label="Decrease quantity">-</button>
                    <span className="typo-68 count">{ci.qty}</span>
                    <button className="btn-qty plus" onClick={() => inc(ci.id, ci.qty)} aria-label="Increase quantity">+</button>
                  </div>
                </div>
                <div className="price-row">
                  <span className="rs-icon" aria-hidden="true"></span>
                  <span className="typo-70 price">{s.price * ci.qty}</span>
                  <button className="btn secondary" style={{ height: 28, marginLeft: 12 }} onClick={() => removeItem(ci.id)}>Remove</button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="bill card-174">
        <div className="bill-row">
          <span className="typo-71 label">Subtotal</span>
          <span className="typo-72 value"><span className="rs-icon sm" aria-hidden="true"></span> {total}</span>
        </div>
        <div className="bill-row">
          <span className="typo-71 label">Taxes and Charges</span>
          <span className="typo-72 value"><span className="rs-icon sm" aria-hidden="true"></span> {tax}</span>
        </div>
        <div className="bill-row">
          <span className="typo-71 label">Discount</span>
          <span className="typo-72 value"><span className="rs-icon sm" aria-hidden="true"></span> {discount}</span>
        </div>
        <div className="divider" aria-hidden="true"></div>
        <div className="bill-row total">
          <span className="typo-71 label">Total</span>
          <span className="typo-72 value"><span className="rs-icon sm" aria-hidden="true"></span> {grand}</span>
        </div>
      </section>

      <nav className="bottom-wrap">
        <div className="bottom-bg" aria-hidden="true"></div>
        <Link to="/" className="bottom-btn home" aria-label="Home"></Link>
        <button className="bottom-btn deals" aria-label="Deals"></button>
        <button className="bottom-btn search" aria-label="Search"></button>
        <button className="bottom-btn cart" aria-label="Cart"></button>
        <Link to="/auth" className="bottom-btn user" aria-label="Account"></Link>
      </nav>

      <div className="payment-actions">
        <div className="amount card-147">
          <div className="amount-top">
            <span className="typo-73">{grand}</span>
            <span className="rs-icon xs" aria-hidden="true"></span>
          </div>
          <div className="typo-74 amount-sub">VIEW PAYMENT OPTIONS</div>
        </div>
        <button className="btn-pay card-102" onClick={onPay}>
          <span className="typo-62">MAKE PAYMENT</span>
        </button>
      </div>
    </div>
  );
}
