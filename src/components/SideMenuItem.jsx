export const SideMenuItem = ({ href, className, children }) => {
  return (
    <li>
      <a
        className={`flex  text-zinc-400 hover:text-zinc-100 items-center justify-center lg:justify-normal py-3 px-2 lg:px-5 font-bold transition ${className}`}
        href={href}
      >
        {children}
      </a>
    </li>
  );
};
