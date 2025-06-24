import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const OrderHistoryCard = ({ order, detailed = false }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return 'CheckCircle';
      case 'shipped':
        return 'Truck';
      case 'processing':
        return 'Clock';
      case 'cancelled':
        return 'XCircle';
      default:
        return 'Package';
    }
  };

  return (
    <div className="bg-surface rounded-lg p-4 border border-subtle">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Image
            src={order.image}
            alt={`Order ${order.id}`}
            className="w-12 h-12 object-cover rounded-sm"
          />
          <div>
            <h3 className="font-body font-body-medium text-text-primary">
              Order {order.id}
            </h3>
            <p className="text-text-secondary text-sm font-body">
              {new Date(order.date).toLocaleDateString()} • {order.items} item{order.items > 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-data text-lg text-text-primary">
            ${order.total.toFixed(2)}
          </p>
          <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-body ${getStatusColor(order.status)}`}>
            <Icon name={getStatusIcon(order.status)} size={12} />
            <span className="capitalize">{order.status}</span>
          </span>
        </div>
      </div>

      {detailed && (
        <div className="space-y-3 mb-4">
          {order.trackingNumber && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary font-body">Tracking Number:</span>
              <span className="font-data text-text-primary">{order.trackingNumber}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary font-body">Estimated Delivery:</span>
            <span className="font-body text-text-primary">
              {new Date(order.estimatedDelivery).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center space-x-3 pt-3 border-t border-subtle">
        <Link
          to="/product-detail"
          className="flex-1 text-center py-2 px-4 border border-subtle rounded-sm font-body text-sm hover:bg-background transition-smooth"
        >
          View Details
        </Link>
        {order.status === 'delivered' && (
          <button className="flex-1 text-center py-2 px-4 bg-primary text-background rounded-sm font-body text-sm hover:bg-opacity-90 transition-smooth">
            Reorder
          </button>
        )}
        {order.trackingNumber && (
          <button className="flex-1 text-center py-2 px-4 border border-accent text-accent rounded-sm font-body text-sm hover:bg-accent hover:text-background transition-smooth">
            Track Order
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryCard;