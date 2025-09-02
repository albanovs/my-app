import React from 'react'
import Image from 'next/image'

function AboutCompany() {
    return (
        <div>
            <div className='lg:mx-20'>
                <div className=" mx-auto lg:py-16 lg:mb-10 flex md:flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white">
                    <div className="flex flex-col lg:mt-0 mt-10 justify-between lg:w-[50%] px-5 lg:px-0 h-[347px] ">
                        <h2 className='lg:text-[40px] mb-5 text-[28px] font-bold'>О КОМПАНИИ</h2>
                        <Image src="/images/Frame 2087326452.png" alt="logo" width={419} height={347} />
                    </div>
                    <div className="mt-5 lg:mt-0 space-y-10 p-5 lg:text-[18px] w-full h-full lg:h-[347px]">
                        <p>C 2015 года «Ереван» радует своих гостей вкуснейшей шаурмой и шашлыком. С тех пор Мы стали эталоном в своей сфере и знамениты своим вкусом и качеством.</p>
                        <p>Люди со всего города приезжают к нам чтобы попробовать «ту самую шаурму, вкуснее которой нет нигде».
                            Все это благодаря бескомпромиссному контролю качества и исключительному подбору ингредиентов. Мы сами готовим наши фирменные соусы, секрет приготовления которых держим в строжайшем секрете. Мы сами маринуем и жарим мясо на углях, что придаёт ему особый, неповторимый вкус «с дымком».</p>
                        <p>Мы используем уникальный лаваш, аналогов которому нет на рынке.
                            Все это лишь для того, чтобы, попробовав нашу шаурму, вы сказали: «ВАУ!».</p>
                        <p>Мы участвовали в шоу Александра Бельчикова «100 мест где поесть»</p>
                    </div>
                </div>
                <div className='mx-5 lg:mx-auto pb-10 lg:py-6 py-0  flex md:flex-row flex-col items-center  justify-between gap-6 text-white'>
                    <p className="lg:text-[20px] flex text-center items-center justify-center w-full lg:w-[305px] h-[134px] bg-white/10 p-4 rounded-[10px]">
                        Собственное
                        производство                      в г. Пермь
                    </p>
                    <p className='lg:text-[20px] flex text-center items-center justify-center w-full lg:w-[305px] h-[134px] bg-white/10 p-4 rounded-[10px]'>Тщательно отобранные ингредиенты, самое свежее мясо</p>
                    <p className='lg:text-[20px] flex text-center items-center justify-center w-full lg:w-[305px] h-[134px] bg-white/10 p-4 rounded-[10px]'>Уникальные рецепты соусов, прямо из Армении</p>
                    <p className='lg:text-[20px] flex text-center items-center justify-center w-full lg:w-[305px] h-[134px] bg-white/10 p-4 rounded-[10px]'>Повара, знающие вкус настоящего мяса        </p>
                </div>
            </div>
            <div className='text-white space-y-5 my-10 lg:mx-20 mx-5'>
                <p>Мы каждый раз улучшаем наш сервис. Наши заведения соответствуют всем нормам и стандартам роспотребнадзор.</p>
                <p>Мы приготовим для Вас вкуснейшие блюда на мангале: сочное мясо, печеные овощи на углях, неповторимую шаурму, вкус которых заставит Вас возвращаться к нам вновь!</p>
            </div>
            <div
                className="hero-section bg-cover bg-center h-full lg:h-[400px] w-full py-6 lg:py-0  md:flex md:flex-row flex flex-col items-center justify-center gap-8 md:gap-8 "
            >
                <div className='md:flex lg:mx-20 px-5 lg:px-0 md:flex-row flex text-sm flex-col items-center justify-center gap-8 w-full'>
                    <div className='space-y-4 px-10 pt-10 w-full  min-h-[202px] pb-10 h-full bg-[#0F1F2F] rounded-[10px]'>
                        <h2 className='text-[22px] text-[#FECE00]'>Профессионалы своего дела</h2>
                        <p className='lg:w-[317px]  text-[16px] text-white'>Все наши повара умеют готовить шашлык закрытыми глазами сочный, мягкий и незабываемо вкусный.</p>
                    </div>
                    <div className='space-y-4 px-10 pt-10 w-full min-h-[202px] h-full bg-[#0F1F2F] rounded-[10px]'>
                        <h2 className='text-[22px] text-[#FECE00]'>Всегда на связи</h2>
                        <p className='lg:w-[317px]  text-[16px] text-white'>Работаем 24 часа. Без обедов
                            и выходных</p>
                    </div>
                    <div className='space-y-4 pt-10 px-10  w-full min-h-[202px] h-full bg-[#0F1F2F] rounded-[10px]'>
                        <h2 className='text-[22px] text-[#FECE00]'>С заботой о Вас</h2>
                        <p className='lg:w-[317px]  text-[16px] text-white'>Мы ценим каждого клиента, наша команда самая ответственная, лояльная.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutCompany