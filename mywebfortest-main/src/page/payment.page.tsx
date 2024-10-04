import React, { useState } from 'react';

const Checkout: React.FC = () => {
    const [activeSection, setActiveSection] = useState<number | null>(null);

    const toggleSection = (sectionIndex: number) => {
        setActiveSection(activeSection === sectionIndex ? null : sectionIndex);
    };

    return (
        <div className="flex">
            <div className="flex-1 p-5">
                <h1 className="text-green-700 text-3xl mb-5">Ani Meb</h1>

                <div className="mb-5 border border-gray-300 rounded-lg">
                    <div
                        className="bg-purple-100 p-3 cursor-pointer flex justify-between items-center"
                        onClick={() => toggleSection(1)}
                    >
                        <span>1 การติดต่อ</span>
                        <span>{activeSection === 1 ? '▲' : '▼'}</span>
                    </div>
                    {activeSection === 1 && (
                        <div className="p-3">
                            <input
                                type="text"
                                className="input-field w-full mb-3 p-2 border border-gray-300 rounded-lg"
                                placeholder="ชื่อ-นามสกุล"
                            />
                            <input
                                type="email"
                                className="input-field w-full mb-3 p-2 border border-gray-300 rounded-lg"
                                placeholder="อีเมล"
                            />
                            <input
                                type="tel"
                                className="input-field w-full mb-3 p-2 border border-gray-300 rounded-lg"
                                placeholder="เบอร์โทรศัพท์"
                            />
                        </div>
                    )}
                </div>

                <div className="mb-5 border border-gray-300 rounded-lg">
                    <div
                        className="bg-purple-100 p-3 cursor-pointer flex justify-between items-center"
                        onClick={() => toggleSection(2)}
                    >
                        <span>2 การจัดส่ง</span>
                        <span>{activeSection === 2 ? '▲' : '▼'}</span>
                    </div>
                    {activeSection === 2 && (
                        <div className="p-3">
                            <h3 className="text-lg mb-2">1. ข้อมูลที่อยู่จัดส่ง</h3>
                            <input
                                type="text"
                                className="input-field w-full mb-3 p-2 border border-gray-300 rounded-lg"
                                placeholder="เลขที่ หมู่บ้าน ตรอก ซอย และถนน/เลี้ยวซ้าย"
                            />
                            <input
                                type="text"
                                className="input-field w-full mb-3 p-2 border border-gray-300 rounded-lg"
                                placeholder="จังหวัด/อำเภอ"
                            />
                            <input
                                type="text"
                                className="input-field w-full mb-3 p-2 border border-gray-300 rounded-lg"
                                placeholder="ตำบล ตำบล อำเภอ"
                            />
                            <input
                                type="text"
                                className="input-field w-full mb-3 p-2 border border-gray-300 rounded-lg"
                                placeholder="รหัสไปรษณีย์"
                            />
                            <input
                                type="text"
                                className="input-field w-full mb-3 p-2 border border-gray-300 rounded-lg"
                                placeholder="เบอร์โทรศัพท์ผู้รับ"
                            />
                            <h3 className="text-lg mb-2">2. เลือกวิธีการจัดส่ง</h3>
                            <div className="radio-option mb-3">
                                <input type="radio" id="shipping-option" name="shipping" />
                                <label htmlFor="shipping-option">
                                    ไม่มีบริการคนหาม 500 บาทต่อชิ้น / ไม่เกิน 500 บาทต่อชิ้นละ 50 บาท
                                </label>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mb-5 border border-gray-300 rounded-lg">
                    <div
                        className="bg-purple-100 p-3 cursor-pointer flex justify-between items-center"
                        onClick={() => toggleSection(3)}
                    >
                        <span>3 การชำระเงิน</span>
                        <span>{activeSection === 3 ? '▲' : '▼'}</span>
                    </div>
                    {activeSection === 3 && (
                        <div className="p-3">
                            <p>เลือกวิธีชำระเงินที่คุณสะดวก</p>
                            <div className="radio-option mb-3">
                                <input type="radio" id="payment-option1" name="payment" />
                                <label htmlFor="payment-option1">บัตรเครดิต/เดบิต</label>
                            </div>
                            <div className="radio-option mb-3">
                                <input type="radio" id="payment-option2" name="payment" />
                                <label htmlFor="payment-option2">โอนเงินผ่านธนาคาร</label>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-96 bg-gray-200 p-5 sticky top-0 h-screen overflow-y-auto">
                <h2 className="text-xl mb-5">รายการสินค้า</h2>

                <div className="product-item flex justify-between mb-3">
                    <span>Alya sometimes hides her feelings in russian 1</span>
                    <span>฿ 650.00</span>
                </div>

                <input
                    type="text"
                    className="input-field w-full mb-3 p-2 border border-gray-300 rounded-lg"
                    placeholder="กรอกรหัสส่วนลด (ถ้ามี)"
                />

                <div className="product-item flex justify-between mb-3">
                    <span>ราคาสินค้า</span>
                    <span>฿ 650.00</span>
                </div>
                <div className="product-item flex justify-between mb-3">
                    <span>ค่าจัดส่ง</span>
                    <span>฿ 50.00</span>
                </div>
                <div className="product-item flex justify-between mb-3">
                    <span>ส่วนลดรหัส TBF</span>
                    <span>- ฿ 0.00</span>
                </div>

                <div className="product-item flex justify-between font-bold mt-5">
                    <span>ราคาสุทธิ</span>
                    <span>฿ 700.00</span>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
