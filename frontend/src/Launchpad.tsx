import React from 'react';
import { useNavigate } from 'react-router-dom';

const Launchpad: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="launchpad">
      <button onClick={() => navigate('/inventory')} className="launchpadButton">
        Inventory
      </button>
      <button onClick={() => navigate('/menu')} className="launchpadButton">
        Order
      </button>
      <button onClick={() => navigate('/management')} className="launchpadButton">
        Management
      </button>
    </div>
  );
};

export default Launchpad;
