import React, { useState } from 'react';

const MenuItem = ({
  icon,
  activeIcon,
  label,
  onClick,
  isActive,
  onHover,
  isSideNavOpen
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`menuItem ${isActive ? 'activeMenuItem' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ margin: '10px 6px'}}
    >
      <img
        src={isActive || isHovered ? activeIcon : icon}
        alt={label}
      />
      {isSideNavOpen && <span>{label}</span>}
    </div>
  );
};

export default MenuItem;
