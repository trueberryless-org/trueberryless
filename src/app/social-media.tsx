import { AnimatedTooltip, TypewriterEffectSmooth } from "@/components";

const links = [
    {
        id: 1,
        name: "Instagram",
        designation: "trueberryless",
        image: "/logos/instagram.png",
        href: "https://www.instagram.com/trueberryless/",
    },
    {
        id: 2,
        name: "CodePen",
        designation: "trueberryless",
        image: "/logos/codepen.png",
        href: "https://codepen.io/trueberryless",
    },
    {
        id: 3,
        name: "LinkedIn",
        designation: "felix-schneider",
        image: "/logos/linkedin.png",
        href: "https://www.linkedin.com/in/trueberryless/",
    },
    {
        id: 4,
        name: "monkeytype",
        designation: "trueberryless",
        image: "/logos/monkeytype.png",
        href: "https://monkeytype.com/profile/trueberryless",
    },
    {
        id: 5,
        name: "GitHub",
        designation: "trueberryless",
        image: "/logos/github.webp",
        href: "https://github.com/trueberryless",
    },
    {
        id: 6,
        name: "Lichess",
        designation: "trueberryless",
        image: "/logos/lichess.png",
        href: "https://lichess.org/@/trueberryless",
    },
    {
        id: 7,
        name: "Docker",
        designation: "trueberryless",
        image: "/logos/docker.png",
        href: "https://lichess.org/@/trueberryless",
    },
    {
        id: 8,
        name: "X",
        designation: "trueberryless",
        image: "/logos/x.jpg",
        href: "https://x.com/trueberryless",
    },
    {
        id: 9,
        name: "Reddit",
        designation: "trueberryless",
        image: "/logos/reddit.png",
        href: "https://www.reddit.com/user/trueberryless/",
    },
    {
        id: 10,
        name: "StackOverflow",
        designation: "trueberryless",
        image: "/logos/stack-overflow.png",
        href: "https://stackoverflow.com/users/22573601/trueberryless",
    },
    {
        id: 11,
        name: "Linktree",
        designation: "and many more...",
        image: "/logos/linktree.png",
        href: "https://linktr.ee/trueberryless",
    },
];

export default function SocialMedia() {
    const words = [
        {
            text: "Welcome",
        },
        {
            text: "to",
        },
        {
            text: "the",
        },
        {
            text: "trueberryless",
            className: "text-blue-500 dark:text-blue-500",
        },
        {
            text: "network!",
        },
    ];

    return (
        <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div>
                <div className="flex flex-col items-center justify-center h-[10rem]">
                    <TypewriterEffectSmooth words={words} />
                </div>
                <div className="flex flex-row items-center justify-center mb-10 w-full">
                    <AnimatedTooltip items={links} />
                </div>
            </div>
        </div>
    );
}
