import React from 'react';

const Loader: React.FC = () => {
  const renderListItems = () => {
    const listItems = [];
    for (let n = 0; n < 6; n++) {
      listItems.push(
        <li key={n} className={`absolute top-2 left-2 transform origin-right text-gray-200 transition-all duration-300`} style={{ opacity: n === 0 || n === 5 ? 1 : 0 }}>
          <svg viewBox="0 0 90 120" fill="currentColor" className="w-24 h-30">
            <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z" />
          </svg>
        </li>
      );
    }
    return listItems;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="relative w-52 h-36">
        <div className="absolute bottom-2 left-0 w-28 h-28 shadow-2xl transform rotate-6"></div>
        <div className="absolute bottom-2 right-0 w-28 h-28 shadow-2xl transform -rotate-6"></div>
        <div className="relative z-10 w-full h-full rounded-lg overflow-hidden bg-gradient-to-r from-[#667848] to-[#7A8B6F] shadow-lg">
          <ul className="relative m-0 p-0 list-none">
            {renderListItems()}
          </ul>
        </div>
        <span className="block mt-4 text-center text-gray-600">Loading</span>
      </div>
    </div>
  );
};

export default Loader;
