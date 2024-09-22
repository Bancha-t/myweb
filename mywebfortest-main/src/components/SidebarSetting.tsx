import React from 'react';

const sidebarStyle = {
    width: '200px',
    padding: '20px',
    margin: '10px',
    backgroundColor: '#fff',
    borderRadius: '20px',
    height: '550px',
  };
  
const userProfileStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
};

const userImageStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  marginRight: '10px',
};

const menuItemStyle = {
  marginBottom: '10px',
  color: '#333',
  cursor: 'pointer',
};

const subMenuStyle = {
  marginLeft: '20px',
  display: 'none',
};

const SidebarSetting: React.FC = () => {
  const toggleSubMenu = (id: string) => {
    const subMenu = document.getElementById(id);
    if (subMenu) {
      subMenu.classList.toggle('show');
    }
  };

  return (
    <aside style={sidebarStyle}>
      <div style={userProfileStyle}>
        <img src="/api/placeholder/50/50" alt="User Avatar" style={userImageStyle} />
        <div>
          <strong>goodboy</strong>
          <div>แก้ไขข้อมูลส่วนตัว</div>
        </div>
      </div>
      <div style={menuItemStyle} onClick={() => toggleSubMenu('account-submenu')}>
        จัดการบัญชีของฉัน
      </div>
      <div style={subMenuStyle} id="account-submenu">
        <div style={menuItemStyle}>ข้อมูลส่วนตัว</div>
        <div style={menuItemStyle}>สมุดที่อยู่</div>
      </div>
      <div style={menuItemStyle} onClick={() => toggleSubMenu('notification-submenu')}>
        การแจ้งเตือน
      </div>
      <div style={subMenuStyle} id="notification-submenu">
        <div style={menuItemStyle}>รายการที่เคยซื้อ</div>
        <div style={menuItemStyle}>การเปลี่ยนสินค้า</div>
        <div style={menuItemStyle}>การคืนสินค้า</div>
        <div style={menuItemStyle}>การยกเลิกสินค้า</div>
      </div>
      <div style={menuItemStyle}>รายการที่ชอบ</div>
    </aside>
  );
};

export default SidebarSetting;
