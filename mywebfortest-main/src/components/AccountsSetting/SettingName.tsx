import React, { useState } from 'react';

const SettingName: React.FC = () => {
  const [profileImage, setProfileImage] = useState('/api/placeholder/100/100');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // ในสถานการณ์จริง คุณจะต้องจัดการกับการอัปโหลดไฟล์ที่นี่
    // สำหรับตัวอย่างนี้ เราจะแค่แสดง placeholder
    console.log('Image upload triggered');
  };

  return (
    <div className="flex-grow p-6">
      <h2 className="text-2xl font-bold mb-6">ข้อมูลส่วนตัว</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full mb-2" />
          <label htmlFor="upload-photo" className="text-blue-600 cursor-pointer">
            อัพโหลดรูป
            <input
              type="file"
              id="upload-photo"
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
            />
          </label>
        </div>
        <form>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อ</label>
              <input type="text" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">นามสกุล</label>
              <input type="text" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input type="email" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์มือถือ</label>
              <input type="tel" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">วันเกิด</label>
              <div className="flex space-x-2">
              <input type="date" id="birthday" name="birthday"></input>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingName;