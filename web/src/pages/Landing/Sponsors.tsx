import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import GameMachineBase from "../../assets/LandingPage/Sponsors/GameMachineBase.svg";
import GameMachineGlass from "../../assets/LandingPage/Sponsors/GameMachineGlass.svg";
import GameMachineTop from "../../assets/LandingPage/Sponsors/GameMachineTop.svg";
import Hoop from "../../assets/LandingPage/Sponsors/Hoop.svg";
import Bubbles from "../../assets/LandingPage/Sponsors/Bubbles.svg";
import Fush from "../../assets/LandingPage/Sponsors/Fush.svg";
import PufferFish from "../../assets/LandingPage/Sponsors/PufferFish.svg";
import biga from "../../assets/LandingPage/Sponsors/sponsors/biga.svg";
import bigf from "../../assets/LandingPage/Sponsors/sponsors/bigf.svg";
import chase from "../../assets/LandingPage/Sponsors/sponsors/chase.svg";
import cloude from "../../assets/LandingPage/Sponsors/sponsors/cloude.svg";
import google from "../../assets/LandingPage/Sponsors/sponsors/google.svg";
import mongo from "../../assets/LandingPage/Sponsors/sponsors/mongo.svg";
import penguin from "../../assets/LandingPage/Sponsors/sponsors/penguin.svg";
import tiktok2 from "../../assets/LandingPage/Sponsors/sponsors/tiktok2.svg";
import meta from "../../assets/LandingPage/Sponsors/sponsors/meta.svg";

const sponsors = [
  { label: "biga", texture: biga },
  { label: "bigf", texture: bigf },
  { label: "chase", texture: chase },
  { label: "cloude", texture: cloude },
  { label: "google", texture: google },
  { label: "mongo", texture: mongo },
  { label: "penguin", texture: penguin },
  { label: "tiktok2", texture: tiktok2 },
  { label: "meta", texture: meta },
];

export function Sponsors() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const [score, setScore] = useState(0);

  const [bubblesTrigger, setBubblesTrigger] = useState(0);

  const [isCooldown, setIsCooldown] = useState(false);

  useEffect(() => {
    if (!sceneRef.current) return;

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite,
      Mouse = Matter.Mouse,
      MouseConstraint = Matter.MouseConstraint,
      Events = Matter.Events;

    const engine = Engine.create();
    engineRef.current = engine;

    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    const isMobile = window.innerWidth < 640;

    const spriteScale = isMobile ? 0.7 : 1.2;

    const bodySize = isMobile ? 40 : 60;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: "transparent",
        wireframes: false,
      },
    });

    engine.gravity.y = 0.15;

    const ground = Bodies.rectangle(width / 2, height + 30, width, 60, {
      isStatic: true,
      render: { visible: false },
    });
    const leftWall = Bodies.rectangle(-30, height / 2, 60, height, {
      isStatic: true,
      render: { visible: false },
    });
    const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height, {
      isStatic: true,
      render: { visible: false },
    });
    const ceiling = Bodies.rectangle(width / 2, -100, width, 60, {
      isStatic: true,
      render: { visible: false },
    });

    const createHoop = (x: number, y: number, labelPrefix: string) => {
      const visualWidth = isMobile ? 100 : 160;
      const rimRadius = 5;
      const physicsY = y;

      const rimL = Bodies.circle(x - visualWidth / 2 + rimRadius, physicsY, rimRadius, {
        isStatic: true,
        render: { visible: false },
      });

      const rimR = Bodies.circle(x + visualWidth / 2 - rimRadius, physicsY, rimRadius, {
        isStatic: true,
        render: { visible: false },
      });

      const sensor = Bodies.rectangle(x, physicsY, visualWidth - rimRadius * 4, 20, {
        label: `${labelPrefix}_sensor`,
        isStatic: true,
        isSensor: true,
        render: { visible: false },
      });

      return [rimL, rimR, sensor];
    };

    const hoop1Bodies = createHoop(width * 0.25, height * 0.3, "hoop1");
    const hoop2Bodies = createHoop(width * 0.75, height * 0.5, "hoop2");

    const sponsorBodies = sponsors.map((sponsor) => {
      const x = Math.random() * (width - 100) + 50;
      const y = Math.random() * (height / 2) + height / 2;

      return Bodies.rectangle(x, y, bodySize, bodySize, {
        restitution: 0.5,
        frictionAir: 0.05,
        render: {
          sprite: {
            texture: sponsor.texture,
            xScale: spriteScale,
            yScale: spriteScale,
          },
        },
      });
    });

    Composite.add(engine.world, [
      ground,
      leftWall,
      rightWall,
      ceiling,
      ...hoop1Bodies,
      ...hoop2Bodies,
      ...sponsorBodies,
    ]);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });
    Composite.add(engine.world, mouseConstraint);

    Events.on(engine, "collisionStart", (event) => {
      const pairs = event.pairs;
      for (let i = 0; i < pairs.length; i++) {
        const bodyA = pairs[i].bodyA;
        const bodyB = pairs[i].bodyB;
        if (bodyA.label.includes("_sensor") || bodyB.label.includes("_sensor")) {
          setScore((prev) => prev + 1);
        }
      }
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    const handleResize = () => {
      if (!sceneRef.current) return;
      const newWidth = sceneRef.current.clientWidth;
      const newHeight = sceneRef.current.clientHeight;

      render.canvas.width = newWidth;
      render.canvas.height = newHeight;

      Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 30 });
      Matter.Body.setPosition(rightWall, { x: newWidth + 30, y: newHeight / 2 });
      Matter.Body.setPosition(ceiling, { x: newWidth / 2, y: -30 });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      Render.stop(render);
      Runner.stop(runner);
      if (engineRef.current) {
        Engine.clear(engineRef.current);
      }
      render.canvas.remove();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render.canvas = null as any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render.context = null as any;

      render.textures = {};
    };
  }, []);

  const handleLaunch = () => {
    if (isCooldown) return;

    setBubblesTrigger((prev) => prev + 1);

    setIsCooldown(true);
    setTimeout(() => setIsCooldown(false), 3000);

    if (!engineRef.current) return;
    const bodies = Matter.Composite.allBodies(engineRef.current.world);
    bodies.forEach((body) => {
      if (!body.isStatic) {
        Matter.Body.applyForce(body, body.position, {
          x: (Math.random() - 0.5) * 0.05,
          y: -0.15 - Math.random() * 0.2,
        });
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center text-slate-100 w-full relative md:mt-15 mt-8 md:gap-15 gap-6">
      <h1 className="xl:text-[146px] md:text-[86px] text-[56px] font-nemo leading-none text-[#BEF3FC]">
        Sponsors
      </h1>
      <h1 className="xl:text-[84px] md:text-[46px] text-[28px] font-bagel text-[#BEF3FC]">
        Score: {score}
      </h1>

      <div className="relative align-center justify-center flex flex-col w-full md:w-auto sm:px-4 px-8 md:px-10 mt-3 sm:mt-0">
        <img
          src={GameMachineTop}
          alt="Game Machine Top"
          className="md:w-full  left-1/2 -translate-x-1/2 md:mx-auto absolute sm:-top-10 -top-5 z-20"
        />

        <div className="relative w-fit mx-auto ">
          <div className="absolute w-full h-full z-20"></div>
          <div className="relative">
            <img
              src={GameMachineGlass}
              alt="Game Machine Glass"
              className="block mx-auto md:w-[600px] w-full h-auto pointer-events-none select-none relative -z-20"
            />

            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20 ">
              <img
                src={Hoop}
                alt="Hoop 1"
                className="absolute sm:w-[160px] w-[90px]"
                style={{
                  top: "30%",
                  left: "25%",

                  transform: "translate(-50%, -10px)",
                }}
              />

              <img
                src={Hoop}
                alt="Hoop 2"
                className="absolute sm:w-[160px] w-[90px]"
                style={{
                  top: "50%",
                  left: "75%",

                  transform: "translate(-50%, -10px)",
                }}
              />
            </div>

            <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
              {bubblesTrigger > 0 && (
                <img
                  key={bubblesTrigger}
                  src={Bubbles}
                  alt="Bubbles"
                  className="absolute bottom-0 left-0 w-full animate-bubble-float opacity-0"
                />
              )}
            </div>

            <div ref={sceneRef} className="absolute top-0 left-0 w-full h-full z-10" />
          </div>
        </div>
        <div className={`cursor-pointer transition-all duration-300 `} onClick={handleLaunch}>
          <img src={GameMachineBase} alt="Game Machine Base" className="full mx-auto" />
        </div>
      </div>

      <div className="flex justify-between w-full md:px-30 px-6">
        <img src={PufferFish} alt="PufferFish" className="md:w-1/7 sm:w-1/5 w-0" />
        <img src={Fush} alt="Fish" className="md:w-1/2 sm:w-2/5 w-[1100px]" />
      </div>
    </div>
  );
}
