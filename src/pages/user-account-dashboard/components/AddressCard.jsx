import React from 'react';
import Icon from 'components/AppIcon';

const AddressCard = ({ address }) => {
  const handleEdit = () => {
    console.log('Edit address:', address.id);
  };

  const handleDelete = () => {
    console.log('Delete address:', address.id);
  };

  const handleSetDefault = () => {
    console.log('Set as default:', address.id);
  };

  const getAddressIcon = (type) => {
    switch (type) {
      case 'home':
        return 'Home';
      case 'work':
        return 'Building';
      default:
        return 'MapPin';
    }
  };

  return (
    <div className="bg-surface rounded-lg p-4 border border-subtle">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name={getAddressIcon(address.type)} size={20} className="text-text-secondary" />
          <h3 className="font-body font-body-medium text-text-primary">
            {address.name}
          </h3>
          {address.isDefault && (
            <span className="bg-accent text-background px-2 py-1 rounded-sm text-xs font-body">
              Default
            </span>
          )}
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={handleEdit}
            className="p-1 text-text-secondary hover:text-accent transition-smooth"
          >
            <Icon name="Edit" size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-text-secondary hover:text-error transition-smooth"
          >
            <Icon name="Trash2" size={16} />
          </button>
        </div>
      </div>
      
      <div className="text-text-secondary font-body text-sm space-y-1 mb-4">
        <p>{address.street}</p>
        <p>{address.city}, {address.state} {address.zipCode}</p>
        <p>{address.country}</p>
      </div>
      
      {!address.isDefault && (
        <button
          onClick={handleSetDefault}
          className="w-full py-2 px-4 border border-subtle rounded-sm font-body text-sm hover:bg-background transition-smooth"
        >
          Set as Default
        </button>
      )}
    </div>
  );
};

export default AddressCard;