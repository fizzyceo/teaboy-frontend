import { Player } from "@lottiefiles/react-lottie-player";
const Loading = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <Player src="/LoadingAnimation_1.json" className="player" loop autoplay />
    </div>
  );
};
export default Loading;
