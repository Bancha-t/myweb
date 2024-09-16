import React from 'react';
import styled, { keyframes } from 'styled-components';

const pageAnimation = (i: number) => keyframes`
  ${0 + (i * 15 - 30)}% {
    transform: rotateY(180deg);
    opacity: 0;
  }
  ${20 + (i * 15 - 30)}% {
    opacity: 1;
  }
  ${35 + (i * 15 - 30)}%, 100% {
    opacity: 0;
  }
  ${50 + (i * 15 - 30)}%, 100% {
    transform: rotateY(0deg);
  }
`;

const FullScreenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Ensure the wrapper takes the full height */
  background-color: #fff; /* Optional background color */
`;

const LoaderWrapper = styled.div`
  --background: linear-gradient(135deg, #667848, #7A8B6F);
  --shadow: rgba(39, 94, 254, 0.28);
  --text: #6C7486;
  --page: rgba(255, 255, 255, 0.36);
  --page-fold: rgba(255, 255, 255, 0.52);
  --duration: 3s;

  width: 200px;
  height: 140px;
  position: relative;

  &:before,
  &:after {
    --r: -6deg;
    content: '';
    position: absolute;
    bottom: 8px;
    width: 120px;
    top: 80%;
    box-shadow: 0 16px 12px var(--shadow);
    transform: rotate(var(--r));
  }

  &:before {
    left: 4px;
  }

  &:after {
    --r: 6deg;
    right: 4px;
  }

  div {
    width: 100%;
    height: 100%;
    border-radius: 13px;
    position: relative;
    z-index: 1;
    perspective: 600px;
    box-shadow: 0 4px 6px var(--shadow);
    background-image: var(--background);

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      position: relative;

      li {
        --r: 180deg;
        --o: 0;
        --c: var(--page);
        position: absolute;
        top: 10px;
        left: 10px;
        transform-origin: 100% 50%;
        color: var(--c);
        opacity: var(--o);
        transform: rotateY(var(--r));
        animation: var(--duration) ease infinite;

        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(4),
        &:nth-child(5) {
          --c: var(--page-fold);
          animation-name: ${pageAnimation(2)};
        }

        svg {
          width: 90px;
          height: 120px;
          display: block;
        }

        &:first-child {
          --r: 0deg;
          --o: 1;
        }

        &:last-child {
          --o: 1;
        }
      }
    }
  }

  span {
    display: block;
    left: 0;
    right: 0;
    top: 100%;
    margin-top: 20px;
    text-align: center;
    color: var(--text);
  }
`;

const Dribbble = styled.a`
  position: fixed;
  display: block;
  right: 24px;
  bottom: 24px;

  img {
    display: block;
    width: 76px;
  }
`;

const Loader: React.FC = () => {
  const renderListItems = () => {
    const listItems = [];
    for (let n = 0; n < 6; n++) {
      listItems.push(
        <li key={n}>
          <svg viewBox="0 0 90 120" fill="currentColor">
            <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z" />
          </svg>
        </li>
      );
    }
    return listItems;
  };

  return (
    <FullScreenWrapper>
      <LoaderWrapper>
        <div>
          <ul>{renderListItems()}</ul>
        </div>
        <span>Loading</span>
      </LoaderWrapper>
      <Dribbble href="https://dribbble.com/shots/7425055-Book-Loader" target="_blank" rel="noopener noreferrer">
      </Dribbble>
    </FullScreenWrapper>
  );
};

export default Loader;
