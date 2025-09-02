import React from 'react';

function Contact() {
  return (
    <div className=" relative mt-5 h-[447px] mx-auto px-5  py-16 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-0 lg:opacity-0 z-0" />

      <div className="relative z-10 md:pl-20 pb-20 pt-5">
        <h1 className="text-2xl md:text-4xl font-extrabold text-white uppercase">Контакты</h1>

        <div className="flex justify-between w-76 mt-10 text-white">
          <p>ул. Мира, 30</p>
          <h6 className="font-bold">202-39-93</h6>
        </div>

        <div className="flex justify-between w-76 mt-5 text-white">
          <p>ул. Куйбышева, 38</p>
          <h6 className="font-bold">243-39-93</h6>
        </div>

        <div className="flex justify-between w-76 mt-5 text-white">
          <p>ул. Екатерининская, 30</p>
          <h6 className="font-bold">203-39-93</h6>
        </div>

        <div className="flex justify-between w-76 mt-5 text-white">
          <p>ул. Ким, 69</p>
          <h6 className="font-bold">202-99-33</h6>
        </div>

        <div className="flex justify-between w-76 mt-5 text-white">
          <p>Почта для заявок</p>
          <h6 className="font-bold">erevanip@ya.ru</h6>
        </div>

        <div className="flex justify-between w-76 mt-5 text-white">
          <p>График работы</p>
          <h6 className="font-bold">Круглосуточно</h6>
        </div>
      </div>
    </div>
  );
}

export default Contact;
