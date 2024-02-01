export const SearchAlbumSkeleton = () => (
  <svg
    role='img'
    width='176'
    height='244'
    aria-labelledby='loading-aria'
    viewBox='0 0 176 244'
    preserveAspectRatio='none'
  >
    <title id='loading-aria'>Loading...</title>
    <rect
      x='0'
      y='0'
      width='100%'
      height='100%'
      clipPath='url(#clip-path2)'
      style={{ fill: `url("#fill")` }}
    ></rect>
    <defs>
      <clipPath id='clip-path2'>
        <rect x='0' y='0' rx='9' ry='9' width='176' height='244' />
      </clipPath>
      <linearGradient id='fill'>
        <stop offset='0.599964' stopColor='#e6e6e6' stopOpacity='1'>
          <animate
            attributeName='offset'
            values='-2; -2; 1'
            keyTimes='0; 0.25; 1'
            dur='2s'
            repeatCount='indefinite'
          ></animate>
        </stop>
        <stop offset='1.59996' stopColor='#ababab' stopOpacity='1'>
          <animate
            attributeName='offset'
            values='-1; -1; 2'
            keyTimes='0; 0.25; 1'
            dur='2s'
            repeatCount='indefinite'
          ></animate>
        </stop>
        <stop offset='2.59996' stopColor='#e6e6e6' stopOpacity='1'>
          <animate
            attributeName='offset'
            values='0; 0; 3'
            keyTimes='0; 0.25; 1'
            dur='2s'
            repeatCount='indefinite'
          ></animate>
        </stop>
      </linearGradient>
    </defs>
  </svg>
);
