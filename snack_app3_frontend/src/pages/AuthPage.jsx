import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// PUBLIC_INTERFACE
export default function AuthPage() {
  /** Sign in / Sign up per assets/1 design. */
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signUp } = useAuth();
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setErr('');
    try {
      if (mode === 'signin') await signIn(email, password);
      else await signUp(email, password);
      navigate('/');
    } catch (ex) {
      setErr(ex.message || 'Failed');
    }
  }

  return (
    <div className="screen-1 container">
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

      <h1 className="hero typo-58">Snacks at your seat!</h1>

      <div className="decor" aria-hidden="true">
        <div className="donut">
          <span className="donut-bread"></span>
          <span className="donut-cream"></span>
          <span className="donut-topping"></span>
        </div>
        <div className="burger"></div>
        <div className="hotdog"></div>
      </div>

      <section className="auth-toggle">
        <button className={`tab tab-left typo-59 ${mode === 'signup' ? 'active' : ''}`} onClick={() => setMode('signup')}>Sign up</button>
        <button className={`tab tab-right typo-59 ${mode === 'signin' ? 'active' : ''}`} onClick={() => setMode('signin')}>Sign in</button>
      </section>

      <section className="social-row">
        <button className="social-btn google">
          <span className="icon" aria-hidden="true"></span>
          <span className="label typo-60">GOOGLE</span>
        </button>
        <button className="social-btn facebook">
          <span className="icon" aria-hidden="true"></span>
          <span className="label typo-60">FACEBOOK</span>
        </button>
      </section>

      <form className="form" onSubmit={onSubmit}>
        <label className="field style-128">
          <span className="field-label typo-55">Email address</span>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required aria-label="Email address" />
        </label>

        <label className="field style-128">
          <span className="field-label typo-55">Password</span>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required aria-label="Password" />
        </label>

        {err ? <div className="typo-57" style={{ color: 'var(--color-f43f5e)' }}>{err}</div> : null}

        <button type="submit" className="cta style-170">
          <span className="cta-text typo-56">{mode === 'signup' ? 'Create account' : 'Sign in'}</span>
        </button>

        <div className="divider"></div>

        <p className="subtext typo-57">
          {mode === 'signin' ? 'New here? ' : 'Already have an account? '}
          <button type="button" onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')} className="btn secondary" style={{ height: 32, padding: '0 10px', marginLeft: 8 }}>
            {mode === 'signin' ? 'Create one' : 'Sign in'}
          </button>
        </p>
      </form>

      <div className="safe-area" aria-hidden="true"></div>
    </div>
  );
}
