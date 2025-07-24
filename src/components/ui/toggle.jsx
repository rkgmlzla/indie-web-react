import { useState } from 'react';
import './toggle.css';

function Toggle() {
  const [on, setOn] = useState(true);

  return (
    <button
      className={`toggle-btn ${on ? 'on' : 'off'}`}
      onClick={() => setOn(!on)}>
      {on ? 'ON' : 'OFF'}
    </button>
  );
}

export default Toggle;
