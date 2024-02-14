import { AnimatedTooltip } from "@/components";

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
        name: "X",
        designation: "trueberryless",
        image: "/logos/x.jpg",
        href: "https://x.com/trueberryless",
    },
    {
        id: 4,
        name: "LinkedIn",
        designation: "trueberryless",
        image: "/logos/linkedin.png",
        href: "https://www.linkedin.com/in/felix-schneider-214154261/",
    },
    {
        id: 5,
        name: "monkeytype",
        designation: "trueberryless",
        image: "/logos/monkeytype.png",
        href: "https://monkeytype.com/profile/trueberryless",
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
        name: "Reddit",
        designation: "trueberryless",
        image: "/logos/reddit.png",
        href: "https://www.reddit.com/user/trueberryless/",
    },
    {
        id: 9,
        name: "StackOverflow",
        designation: "trueberryless",
        image: "/logos/stack-overflow.png",
        href: "https://stackoverflow.com/users/22573601/trueberryless",
    },
];

export default function SocialMedia() {
    return (
        <div className="w-full grid gap-20">
            <h1 className="md:text-4xl text-xl text-center text-white relative z-20">
                Social Media
            </h1>
            <div className="flex flex-row items-center justify-center mb-10 w-full">
                <AnimatedTooltip items={links} />
            </div>
        </div>
    );
}
