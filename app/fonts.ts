import localFont from 'next/font/local';

// تعريف خط Cairo المحلي
export const cairoFont = localFont({
  src: [
    {
      path: '../../public/Cairo/static/Cairo-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/Cairo/static/Cairo-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/Cairo/static/Cairo-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/Cairo/static/Cairo-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/Cairo/static/Cairo-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/Cairo/static/Cairo-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/Cairo/static/Cairo-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-cairo',
  display: 'swap',
});

// تعريف خط Poppins المحلي
export const poppinsFont = localFont({
  src: [
    {
      path: '../../public/Poppins/Poppins-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/Poppins/Poppins-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/Poppins/Poppins-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/Poppins/Poppins-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/Poppins/Poppins-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/Poppins/Poppins-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../../public/Poppins/Poppins-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-poppins',
  display: 'swap',
});