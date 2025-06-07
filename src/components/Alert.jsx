import React from 'react';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaExclamationTriangle,
  FaTimes
} from 'react-icons/fa';

const Alert = ({
  type = 'info',
  title,
  message,
  onClose,
  className = '',
  showIcon = true,
  action,
  ...props
}) => {
  const variants = {
    success: {
      icon: FaCheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      iconColor: 'text-green-400'
    },
    error: {
      icon: FaExclamationCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      iconColor: 'text-red-400'
    },
    warning: {
      icon: FaExclamationTriangle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
      iconColor: 'text-yellow-400'
    },
    info: {
      icon: FaInfoCircle,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-400'
    }
  };

  const { icon: Icon, bgColor, borderColor, textColor, iconColor } = variants[type];

  return (
    <div
      className={`
        rounded-md p-4 border
        ${bgColor}
        ${borderColor}
        ${className}
      `}
      role="alert"
      {...props}
    >
      <div className="flex">
        {showIcon && (
          <div className="flex-shrink-0">
            <Icon className={`h-5 w-5 ${iconColor}`} aria-hidden="true" />
          </div>
        )}
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${textColor}`}>
              {title}
            </h3>
          )}
          {message && (
            <div className={`mt-2 text-sm ${textColor}`}>
              {message}
            </div>
          )}
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          {action && (
            <div className="mr-3">
              {action}
            </div>
          )}
          {onClose && (
            <button
              type="button"
              className={`
                inline-flex rounded-md p-1.5
                ${textColor}
                hover:bg-opacity-20 hover:bg-black
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-${type}-50 focus:ring-${type}-600
              `}
              onClick={onClose}
            >
              <span className="sr-only">Dismiss</span>
              <FaTimes className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert; 