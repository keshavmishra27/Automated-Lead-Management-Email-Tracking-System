
interface NavbarProps {
  onNavigate?: (view: string) => void;
}

export const Navbar = ({ onNavigate }: NavbarProps = {}) => {
  return (
    <nav className="h-[64px] bg-canvas border-b border-hairline px-lg flex items-center justify-between sticky top-0 z-50">
      <div 
        className="text-[18px] font-bold tracking-[1.4px] uppercase flex items-center gap-xxs cursor-pointer"
        onClick={() => onNavigate?.('home')}
      >
        <span className="text-primary">LEADFLOW</span> AI
      </div>
      <div className="flex items-center gap-md text-[13px] font-semibold uppercase tracking-[0.65px]">
        <button className="hover:text-primary transition-colors cursor-pointer uppercase tracking-[0.65px] font-semibold">Products</button>
        <button className="hover:text-primary transition-colors hidden sm:block cursor-pointer uppercase tracking-[0.65px] font-semibold">Solutions</button>
        <button 
          onClick={() => onNavigate?.('dashboard')}
          className="hover:text-primary transition-colors cursor-pointer uppercase tracking-[0.65px] font-semibold"
        >
          Dashboard
        </button>
      </div>
    </nav>
  );
};
