import { useEffect, useState } from "react";

function LandingPage() {
  // "/assets/img/website/Trimmed-Mobile-Promo-1.mp4",
  // "/assets/img/website/The_Best_Football_Prediction_Software.mp4",

  const [videoSource, setVideoSource] = useState(
    "/assets/img/website/The_Best_Football_Prediction_Software.mp4",
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVideoSource(
          "/assets/img/website/The_Best_Football_Prediction_Software.mp4",
        );
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main className="min-h-screen">
      <video
        className="fixed inset-0 min-h-screen w-full object-cover"
        src={videoSource}
        autoPlay
        muted
        playsInline
        loop
      ></video>
    </main>
  );
}

export default LandingPage;
