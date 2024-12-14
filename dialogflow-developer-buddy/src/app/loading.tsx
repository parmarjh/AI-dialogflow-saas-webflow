// LoadingSpinner.tsx
import React from 'react';

// Define the different types of animations available
type LoadingVariant = 'pulse' | 'spin' | 'dots';

// Props interface for our loading component
interface LoadingSpinnerProps {
  variant?: LoadingVariant;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  variant = 'spin',
  size = 'md',
  color = 'text-blue-600',
  text = 'Loading...',
  fullScreen = false,
}) => {
  // Map size prop to Tailwind classes
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  // Create spinning animation component
  const SpinningCircle = () => (
    <div className={`${sizeClasses[size]} ${color} animate-spin`}>
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );

  // Create pulsing circle animation component
  const PulsingCircle = () => (
    <div className={`${sizeClasses[size]} ${color} animate-pulse rounded-full bg-current`} />
  );

  // Create bouncing dots animation component
  const BouncingDots = () => (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${sizeClasses['sm']} ${color} rounded-full animate-bounce`}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );

  // Select the appropriate animation based on variant prop
  const LoadingAnimation = () => {
    switch (variant) {
      case 'pulse':
        return <PulsingCircle />;
      case 'dots':
        return <BouncingDots />;
      default:
        return <SpinningCircle />;
    }
  };

  // If fullScreen is true, center the loading spinner in the viewport
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75">
        <div className="flex flex-col items-center space-y-4">
          <LoadingAnimation />
          {text && <p className={`${color} text-sm font-medium`}>{text}</p>}
        </div>
      </div>
    );
  }

  // Default render with optional loading text
  return (
    <div className="flex flex-col items-center space-y-4">
      <LoadingAnimation />
      {text && <p className={`${color} text-sm font-medium`}>{text}</p>}
    </div>
  );
};

export default LoadingSpinner;

// Example usage:
/*
import LoadingSpinner from './LoadingSpinner';

// Basic usage
<LoadingSpinner />

// Custom variant
<LoadingSpinner variant="dots" color="text-purple-600" />

// Full screen loading
<LoadingSpinner fullScreen size="lg" text="Processing..." />

// Different sizes
<LoadingSpinner size="sm" />
<LoadingSpinner size="md" />
<LoadingSpinner size="lg" />
*/