import React from 'react';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';

const Bookdetail: React.FC = () => {
  return (
    <>
      <Header />
      <SearchBar />
      <main style={styles.mainContent}>
        <div style={styles.bookImage}>
          <img src="../photo/alltomorowhohoho.png" alt="All Tomorrows book cover" />
        </div>
        <div style={styles.bookDetails}>
          <h1>All Tomorrows</h1>
          <h2>จักรวาลแห่งวันพรุ่งนี้</h2>
          <h3 style={styles.price}>ราคา: ฿ 400.00</h3>
          <div style={styles.quantitySelector}>
            <button style={styles.quantityBtn}>-</button>
            <input type="number" value="1" min="1" style={styles.quantityInput} />
            <button style={styles.quantityBtn}>+</button>
            <p style={styles.quantityInfo}>มีสินค้าทั้งหมด 4316 ชิ้น</p>
          </div>
          <p>มีสินค้าทั้งหมด 4316 ชิ้น</p>
          <div style={styles.actionButtons}>
            <button style={styles.buyNow}>ซื้อทันที</button>
            <button style={styles.addToCart}>หยิบใส่รถเข็น</button>
          </div>
        </div>
      </main>

      <div style={styles.infoContent}>
        <div style={styles.bookInfo}>
          <h3>ข้อมูลหนังสือ</h3>
          <p>สำนักพิมพ์ : สำนักพิมพ์เวลา</p>
          <p>ผู้แต่ง : เอช. พี. เลิฟคราฟท์</p>
          <p>น้ำหนัก : 350 กรัม</p>
          <p>รหัสสินค้า : 1212312121123</p>
          {/* Add book information here */}
        </div>
        <div style={styles.productDetails}>
          <h3>
            <strong>รายละเอียดสินค้า :</strong>
            <span style={styles.lightText}>All Tomorrows จักรวาลแห่งวันพรุ่งนี้</span>
          </h3>
          <p>สิ่งที่ทำในวันนี้จะส่งผลต่อวันพรุ่งนี้ ไม่มีทางเป็นอื่นไปได้ จงรักวันนี้ และไขว่คว้าวันพรุ่งนี้! อนาคตอันมืดมนของมนุษยชาติในอีกพันล้านปีข้างหน้า เมื่อโลกเสื่อมถอยลง สงครามที่ยาวนานหลายศตวรรษ มลพิษจากการแสวงหาผลประโยชน์ตามอำเภอใจของมนุษย์ เปลี่ยนโลกให้กลายเป็นแหล่งรวมความสกปรกและความสิ้นหวัง ดาวอังคารเป็นที่หมายใหม่ในการตั้งอาณานิคม หลังจากการอพยพมาตั้งถิ่นฐานบนดาวอังคารทำให้มีประชากรเพิ่มขึ้นถึงสิบสองพันล้านคน เกิดความเปลี่ยนแปลงด้านสิ่งแวดล้อม ความแตกแยกระหว่างอาณานิคมกลายเป็นสงครามกลางเมืองทำให้มีผู้เสียชีวิตถึงแปดพันล้านคน ผู้รอดชีวิตได้พัฒนาตัวเองกลายเป็นมนุษย์สายพันธุ์ใหม่ เมื่อเวลาผ่านก็ได้สร้างอาณาจักรของกาแล็คซีขึ้น</p>
          <p>หลังจากนั้นไม่นานการปรากฎตัวของ 'คิว”'เผ่าพันธุ์ที่มีอายุหลายพันล้านปี ได้เข้ามาควบคุมทุกอย่างและได้สร้างจักรวาลขึ้นมาใหม่ตามใจชอบ คิวได้ทำลายอารยธรรมของมนุษย์และทำให้มนุษยชาติเป็นเพียงของเล่นและทาส เป็นเวลาถึง 40 ล้านปีที่คิวครอบครองกาแลคซีแล้วก็จากไปอย่างไร้เหตุผล หลังจากนั้นมนุษย์กลายพันธุ์ก็เริ่มปรับตัวเพื่อความอยู่รอด บางสายพันธุ์ต้องสูญพันธุ์ บางคนที่รอดก็วิวัฒนาการและกลายเป็นสายพันธุ์ใหม่ในอีกหลายล้านปีต่อมา</p>
          <p>มีภาพประกอบสี่สีจำนวน 53 ภาพ</p>
          <p>All Tomorrows <br /> ซี.เอ็ม.โคสเมน เขียน <br /> นภัค ลิมป์ แปล <br /> 182 หน้า ปกแข็ง</p>
          {/* Add product details here */}
        </div>
      </div>

      <section style={styles.relatedProducts}>
        <h2>สินค้าที่เกี่ยวข้อง</h2>
        <div style={styles.relatedProductsGrid}>
          <div style={styles.productCard}>
            <img src="../photo/alltomorowhohoho.png" alt="All Tomorrows" />
            <h3>All Tomorrows</h3>
            <p>฿ 400.00</p>
          </div>
          <div style={styles.productCard}>
            <img src="../photo/alltomorowhohoho.png" alt="All Tomorrows" />
            <h3>All Tomorrows</h3>
            <p>฿ 400.00</p>
          </div>
          <div style={styles.productCard}>
            <img src="../photo/alltomorowhohoho.png" alt="All Tomorrows" />
            <h3>All Tomorrows</h3>
            <p>฿ 400.00</p>
          </div>
          <div style={styles.productCard}>
            <img src="../photo/alltomorowhohoho.png" alt="All Tomorrows" />
            <h3>All Tomorrows</h3>
            <p>฿ 400.00</p>
          </div>
        </div>
      </section>
    </>
  );
};

const styles = {
  mainContent: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '20px',
    maxWidth: '700px',
    margin: '20px auto',
  },
  bookImage: {
    flex: '0 0 300px',
    marginRight: '40px',
  },
  bookDetails: {
    flex: '2',
    paddingLeft: '20px',
  },
  price: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#385729',
  },
  quantitySelector: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  quantityBtn: {
    backgroundColor: 'white',
    color: '#385729',
    borderRadius: '20px',
    padding: '5px 15px',
    border: '2px solid #385729',
    cursor: 'pointer',
    margin: '0',
  },
  quantityInput: {
    width: '50px',
    textAlign: 'center',
    margin: '0 10px',
    padding: '5px',
    borderRadius: '20px',
    margin: '0',
  },
  quantityInfo: {
    marginLeft: '20px',
  },
  actionButtons: {
    display: 'flex',
    gap: '10px',
  },
  buyNow: {
    backgroundColor: '#385729',
    borderRadius: '20px',
    color: 'white',
    padding: '10px 20px',
    border: '2px solid #385729',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  addToCart: {
    backgroundColor: 'white',
    borderRadius: '20px',
    color: '#385729',
    padding: '10px 20px',
    border: '2px solid #385729',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  infoContent: {
    margin: '20px auto',
    backgroundColor: '#f0e6f4',
    borderRadius: '50px',
    padding: '20px',
    paddingLeft: '50px',
    paddingRight: '50px',
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '80vw',
    gap: '10px',
  },
  bookInfo: {
    flex: '1',
    maxWidth: '100%',
  },
  productDetails: {
    flex: '1',
    maxWidth: '100%',
  },
  lightText: {
    fontWeight: 'normal',
  },
  relatedProducts: {
    textAlign: 'center',
    padding: '20px',
  },
  relatedProductsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
  },
  productCard: {
    textAlign: 'center',
  },
};

export default Bookdetail;
