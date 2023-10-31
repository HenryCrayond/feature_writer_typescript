import { apply, tw } from 'twind';
import { css } from 'twind/css';
import React from 'react';
import { Box } from '../../../atoms';
import { CircularProgressProps } from '../../types';

function CircularProgress(props:CircularProgressProps) {
  const { className = '', size = 'md', rootStyle, ...rest } = props;

  const iconSizeMap = {
    sm: apply`w-3 h-3`,
    md: apply`w-4 h-4`,
    lg: apply`w-5 h-5`,
    xl: apply`w-6 h-6`,
    '2xl': apply`w-7 h-7`,
    '3xl': apply`w-8 h-8`,
  };

  const rootTw = apply`animate-spin ${css({
    border: `3px solid white; `,
    borderRadius: '50%',
    borderTop: `2px solid #3b82f6`,
  })} ${iconSizeMap[size]} ${rootStyle}`;

  return React.createElement(Box, {
    className: `${tw(rootTw)} ${className}`,
    ...rest,
  });
}

CircularProgress.displayName = 'CircularProgress';

export { CircularProgress };
