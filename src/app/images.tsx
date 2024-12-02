import { ParallaxScroll, TypewriterEffectSmooth } from "@/components";

export default function Images() {
  const words = [
    {
      text: "Look",
    },
    {
      text: "at",
    },
    {
      text: "those",
    },
    {
      text: "pics.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-[10rem]">
        <TypewriterEffectSmooth words={words} />
      </div>
      <ParallaxScroll images={images} />
    </div>
  );
}

const images = [
  "/felix/0.jpg",
  "/felix/1.jpg",
  "/felix/2.jpg",
  "/felix/3.jpg",
  "/felix/4.jpg",
  "/felix/5.jpg",
  "/felix/6.jpg",
  "/felix/7.jpg",
  "/felix/8.jpg",
  "/felix/9.jpg",
  "/felix/10.jpg",
];
