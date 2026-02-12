import { motion, useScroll, useTransform } from "framer-motion";
import SubmarineImg from "../assets/LandingPage/Hero/Submarine.svg";
import SubmarineImg2 from "../assets/LandingPage/Hero/Submarine2.svg";

export function SubmarinePath() {
  const { scrollYProgress } = useScroll();

  const xPercent = useTransform(
    scrollYProgress,
    [0, 0.02, 0.045, 0.06, 0.09, 0.13, 0.2],
    [42, 30, 5, -30, -30, 20, 110],
  );
  const left = useTransform(xPercent, (v) => `${v}%`);

  const top = "20%";

  const scale = useTransform(scrollYProgress, [0, 0.06, 0.09, 0.2], [1, 1, 0.35, 0.35]);

  const scaleX = useTransform(scrollYProgress, [0, 0.06, 0.08, 0.2], [1, 1, -1, -1]);

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.005, 0.045, 0.06, 0.09, 0.1, 0.19, 0.21],
    [0, 1, 1, 0, 0, 1, 1, 0],
  );

  return (
    <>
      <style>{`
        @keyframes rudder-swap {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .sub-frame-1 { animation: rudder-swap 0.1s infinite; }
        .sub-frame-2 { animation: rudder-swap 0.1s infinite reverse; }
      `}</style>

      <div
        className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden"
        style={{ zIndex: -15 }}
      >
        <motion.div
          style={{
            position: "absolute",
            width: "750px",
            height: "750px",
            left,
            top,
            scale,
            scaleX,
            opacity,
          }}
        >
          <div className="relative w-full h-full">
            <img
              src={SubmarineImg}
              className="absolute inset-0 w-full h-full object-contain sub-frame-1"
            />
            <img
              src={SubmarineImg2}
              className="absolute inset-0 w-full h-full object-contain sub-frame-2"
            />
          </div>
        </motion.div>
      </div>
    </>
  );
}
