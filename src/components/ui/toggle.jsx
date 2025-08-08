// Toggle.jsx
import './toggle.css';

function Toggle({ value, onChange }) {
  return (
    <button
      className={`toggle-btn ${value ? 'on' : 'off'}`}
      onClick={() => onChange(!value)}>
      {value ? 'ON' : 'OFF'}
    </button>
  );
}

export default Toggle;
