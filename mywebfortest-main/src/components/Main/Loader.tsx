import React, { useEffect, useRef } from 'react';

const LoadingPage: React.FC = () => {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loaderElement = loaderRef.current;
    if (loaderElement) {
      const listItems = loaderElement.querySelectorAll('li');
      listItems.forEach((li, index) => {
        if (index === 0 || index === 5) return;
        li.innerHTML = `
          <svg viewBox="0 0 90 120" fill="currentColor">
            <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z">
            </path>
          </svg>
        `;
      });
    }
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#1C212E',
      fontFamily: 'Roboto, Arial, sans-serif',
    },
    loader: {
      width: '200px',
      height: '140px',
      position: 'relative' as const,
    },
    loaderInner: {
      width: '100%',
      height: '100%',
      borderRadius: '13px',
      position: 'relative' as const,
      zIndex: 1,
      perspective: '600px',
      boxShadow: '0 4px 6px rgba(39, 94, 254, 0.28)',
      background: 'linear-gradient(135deg, #23C4F8, #275EFE)',
    },
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      position: 'relative' as const,
    },
    li: {
      position: 'absolute' as const,
      top: '10px',
      left: '10px',
      transformOrigin: '100% 50%',
      color: 'rgba(255, 255, 255, 0.36)',
      opacity: 0,
      transform: 'rotateY(180deg)',
      animation: '3s ease infinite',
    },
    svg: {
      width: '90px',
      height: '120px',
      display: 'block',
    },
    span: {
      display: 'block',
      left: 0,
      right: 0,
      top: '100%',
      marginTop: '20px',
      textAlign: 'center' as const,
      color: '#6C7486',
    },
  };

  return (
    <div style={styles.container}>
      <div ref={loaderRef} style={styles.loader}>
        <div style={styles.loaderInner}>
          <ul style={styles.ul}>
            {[...Array(6)].map((_, index) => (
              <li
                key={index}
                style={{
                  ...styles.li,
                  ...(index === 0 && { transform: 'rotateY(0deg)', opacity: 1 }),
                  ...(index === 5 && { opacity: 1 }),
                  ...(index > 0 && index < 5 && { animationName: `page-${index + 1}` }),
                }}
              >
                {index > 0 && index < 5 && (
                  <svg viewBox="0 0 90 120" fill="currentColor" style={styles.svg}>
                    <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z" />
                  </svg>
                )}
              </li>
            ))}
          </ul>
        </div>
        <span style={styles.span}>Loading</span>
      </div>
    </div>
  );
};

export default LoadingPage;