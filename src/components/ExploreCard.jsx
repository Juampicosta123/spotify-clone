export const ExploreCard = ({ title, img, color }) => {
  return (
    <a
      href='#'
      className={`relative p-3 h-[180px] rounded-lg z-50 overflow-hidden transition hover:scale-105`}
      style={{ backgroundColor: color }}
    >
      <h5 className='text-2xl font-semibold'>{title}</h5>
      <img
        className='absolute bottom-0 right-0 w-[110px] h-[110px] -z-10'
        style={{ transform: 'rotate(25deg) translate(18%,-2%);' }}
        src={img}
        alt=''
      />
    </a>
  );
};
