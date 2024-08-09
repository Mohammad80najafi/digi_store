'use client';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import Image from 'next/image';
import Image1 from '@/public/hero/watch.png';
import Image2 from '@/public/hero/headphone.png';
import Image3 from '@/public/category/macbook.png';

const ImageList = [
  {
    id: 1,
    img: Image1,
    title: '50% تخفیف در همه محصولات مردان',
    description:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف ',
  },
  {
    id: 2,
    img: Image2,
    title: '30% تخفیف در همه محصولات بانوان',
    description:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف ',
  },
  {
    id: 3,
    img: Image3,
    title: '70% تخفیف در همه محصولات دیجیتالی',
    description:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف ',
  },
];

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Hero = ({}) => {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: 'ease-in-out',
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <div className='relative flex min-h-[550px] items-center justify-center overflow-hidden bg-gray-100 duration-200 dark:bg-gray-950 dark:text-white sm:min-h-[650px]'>
      {/* background pattern */}
      <div className='-z[8] absolute -top-1/2 right-0 h-[700px] w-[700px] rotate-45 rounded-3xl bg-primary/40'></div>
      {/* hero section */}
      <div className='container pb-8 sm:pb-0'>
        <Carousel responsive={responsive} {...settings}>
          {ImageList.map((data) => (
            <div key={data.id}>
              <div className='grid grid-cols-1 sm:grid-cols-2'>
                {/* text content section */}
                <div className='relative z-10 order-2 flex flex-col justify-center gap-4 pt-12 text-center sm:order-1 sm:pt-0 sm:text-left'>
                  <h1
                    data-aos='zoom-out'
                    data-aos-duration='500'
                    data-aos-once='true'
                    className='text-5xl font-bold sm:text-6xl lg:text-7xl'
                  >
                    {data.title}
                  </h1>
                  <p
                    data-aos='fade-up'
                    data-aos-duration='500'
                    data-aos-delay='100'
                    className='text-sm'
                  >
                    {data.description}
                  </p>
                  <div
                    data-aos='fade-up'
                    data-aos-duration='500'
                    data-aos-delay='300'
                  >
                    <button className='rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-white duration-200 hover:scale-105'>
                      مشاهده
                    </button>
                  </div>
                </div>
                {/* image section */}
                <div className='order-1 sm:order-2'>
                  <div
                    data-aos='zoom-in'
                    data-aos-once='true'
                    className='relative z-10'
                  >
                    <Image
                      src={data.img}
                      alt=''
                      className='lg:scale-120 mx-auto h-[300px] w-[300px] object-contain sm:h-[450px] sm:w-[450px] sm:scale-105'
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Hero;
