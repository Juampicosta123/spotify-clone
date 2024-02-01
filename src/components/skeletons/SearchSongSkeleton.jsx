export const SearchSongSkeleton = (props) => (
  <svg
    role='img'
    width='842'
    height='60'
    aria-labelledby='loading-aria'
    viewBox='0 0 842 60'
    preserveAspectRatio='none'
  >
    <title id='loading-aria'>Loading...</title>
    <rect
      x='0'
      y='0'
      width='100%'
      height='100%'
      clipPath='url(#clip-path)'
      style={{ fill: `url("#fill")` }}
    ></rect>
    <defs>
      <clipPath
        id='clip-path'
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <rect x='9' y='7' rx='9' ry='9' width='44' height='44' />
        <rect x='63' y='10' rx='0' ry='0' width='85' height='13' />
        <rect x='64' y='31' rx='0' ry='0' width='50' height='8' />
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
