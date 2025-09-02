import Image from 'next/image'
import React from 'react'

function Notification() {
  return (
    <div className="notif mt-5 h-[447px] mx-auto px-4 py-16 flex flex-col  space-y-10 md:space-y-20 pl-6 md:pl-20">
      <h1 className="text-2xl md:text-4xl font-bold text-white">ОТЗЫВЫ</h1>

      <a
        href="https://2gis.ru/perm/firm/70000001077843133/tab/reviews"
        className="w-full max-w-xs md:max-w-md h-[60px] bg-yellow-500 text-[18px] md:text-[20px] gap-2 flex items-center justify-center text-black rounded-[10px]"
      >
        Отзывы о нас в
        <Image
          src="/images/Логотип_2ГИС 1.png"
          alt="logo"
          width={100}
          height={31}
          className="object-contain"
        />
      </a>
    </div>
  )
}

export default Notification
