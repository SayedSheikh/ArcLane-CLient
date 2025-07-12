import Lottie from "lottie-react";
import React from "react";
// import loadingLottie from "./hand-loading.json";
import loadingLottie_dark from "./Loading-dark.json";
import loadingLottie_light from "./Loading-light.json";

const Loading1 = () => {
  const isDark = document.documentElement.classList.contains("dark");

  return (
    <div className="h-screen flex items-center justify-center dark:bg-dark">
      {isDark ? (
        <Lottie className="w-15" animationData={loadingLottie_dark} />
      ) : (
        <Lottie className="w-15" animationData={loadingLottie_light} />
      )}
    </div>
  );
};

export default Loading1;
