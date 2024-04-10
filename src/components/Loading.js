// src/components/Loading.js
import React from 'react';
import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #1a73e8;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spinAnimation} 1s linear infinite;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(1, 1, 34, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Make sure it's above everything else */
`;

const Loading = () => {
  return (
    <LoadingOverlay>
      <Spinner />
    </LoadingOverlay>
  );
};

export default Loading;
