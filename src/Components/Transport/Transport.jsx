import React, { useState } from 'react';
import './Transport.scss';
export default function Transport() {
  const initialData = [
    {
      id: 0,
      mode: 'Transfer',
      description: 'Between two locations',
      popular: true,
      selected: true,
      label: 'Private/Public Transfer',
    },
    {
      id: 1,
      mode: 'Transfer',
      description: 'Between two locations',
      popular: false,
      selected: false,
    },
    {
      id: 2,
      mode: 'Transfer',
      description: 'Between two locations',
      popular: true,
      selected: false,
    },
    {
      id: 3,
      mode: 'Transfer',
      description: 'Between two locations',
      popular: false,
      selected: false,
    },
  ];

  const [transportItems, setTransportItems] = useState(initialData);
  console.log('state', transportItems);

  const buttonClickHandler = (item) => {
    console.log('button clicked', item.id);
    transportItems[item.id].selected = true;
    setTransportItems([...transportItems]);
  };

  return (
    <div className="transport-items-container">
      {transportItems &&
        transportItems.map((item, index) => (
          <TransportItem
            item={item}
            key={index}
            buttonClickHandler={buttonClickHandler}
          />
        ))}
    </div>
  );
}

function TransportItem({ item, buttonClickHandler }) {
  const { mode, description, popular, selected, label } = item;

  return (
    <div
      className={selected ? 'transport-item selected-item' : 'transport-item'}
    >
      {popular && <span className="popular">Popular</span>}
      <h1 className="tranport-mode">{mode}</h1>
      <p className="tranport-description">{description}</p>
      {label && <span className="label"> {label}</span>}
      <button
        onClick={() => buttonClickHandler(item)}
        className={selected ? 'select-button  selected' : 'select-button'}
      >
        SELECT
      </button>
    </div>
  );
}
