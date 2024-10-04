import React from "react";

const ProductCard: React.FC = () => {
  return (
    <div className="flex border border-gray-300 p-5 mb-5 rounded-lg">
      <img 
        src="/api/placeholder/100/150" 
        alt="Alya Book Cover" 
        className="w-24 h-36 object-cover mr-5" 
      />
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">Alya sometimes hides her feelings in russian 1</h3>
        <p className="text-sm">ผู้แต่ง : ชันชันชิน</p>
        <p className="text-lg font-bold">ราคา : ฿ 650.00</p>
      </div>
      <button className="bg-indigo-100 text-gray-800 border-none px-4 py-2 rounded cursor-pointer hover:bg-indigo-200">
        หยิบใส่รถเข็น
      </button>
    </div>
  );
};

export default ProductCard;
