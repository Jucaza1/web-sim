import LogoNavy from "../assets/logo/Davante_simbolo_navy.svg"

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark: bg-navy z-50">
        <img src={LogoNavy} alt="Logo Davante" className="absolute h-12 w-12" />
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500"></div>
    </div>
  );
}

export default LoadingScreen;