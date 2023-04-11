import * as React from 'react';
import './UserCard.scss';

export default function UserCard({
  profileImg,
  name,
  change,
  companyLogo,
  fontSize,
}) {
  return (
    <div className="user-card" style={{ fontSize }}>
      {profileImg && <img className="profile-img" src={profileImg} />}
      {companyLogo && <img className="company-logo" src={companyLogo} />}
      {change && <span className="change">Change</span>}
      {name && <span className="name">{name}</span>}
    </div>
  );
}
