import { Player } from "@lottiefiles/react-lottie-player";
const LoadingHome = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <p className="text-center text-3xl font-medium">
        Scan the QR code to access the menu
      </p>
      <Player src="/ScanMenuAnimation.json" className="player" loop autoplay />
    </div>
  );
};
export default LoadingHome;
