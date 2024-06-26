import {
    CardBody,
    CardContainer,
    CardItem,
    HoverEffect,
    TypewriterEffectSmooth,
} from "@/components";
import Image from "next/image";
import React from "react";

export function Projects() {
    const words = [
        {
            text: "My",
        },
        {
            text: "favourite",
            className: "text-blue-500 dark:text-blue-500",
        },
        {
            text: "personal",
        },
        {
            text: "projects.",
        },
    ];

    return (
        <div>
            <div className="flex flex-col items-center justify-center h-[10rem]">
                <TypewriterEffectSmooth words={words} />
            </div>
            <div className="max-w-5xl mx-auto px-10 lg:flex lg:justify-between lg:items-center">
                <CardContainer className="inter-var">
                    <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-2xl h-auto rounded-xl p-6 border">
                        <CardItem
                            translateZ="50"
                            className="text-xl font-bold text-neutral-600 dark:text-white"
                        >
                            Mutanuq
                        </CardItem>
                        <CardItem
                            as="p"
                            translateZ="60"
                            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                        >
                            Knowledge of a technical college
                        </CardItem>
                        <CardItem translateZ="100" className="w-full mt-4">
                            <Image
                                src="/projects/mutanuq.png"
                                height="1000"
                                width="1000"
                                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                alt="thumbnail"
                            />
                        </CardItem>
                        <div className="flex justify-between items-center mt-10">
                            <div></div>
                            <CardItem
                                translateZ={20}
                                as="button"
                                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                            >
                                <a href="https://mutanuq.trueberryless.org/">Try now →</a>
                            </CardItem>
                        </div>
                    </CardBody>
                </CardContainer>

                <CardContainer className="inter-var">
                    <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-2xl h-auto rounded-xl p-6 border">
                        <CardItem
                            translateZ="50"
                            className="text-xl font-bold text-neutral-600 dark:text-white"
                        >
                            Deep Thoughts
                        </CardItem>
                        <CardItem
                            as="p"
                            translateZ="60"
                            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                        >
                            My personal blog website.
                        </CardItem>
                        <CardItem translateZ="100" className="w-full mt-4">
                            <Image
                                src="/projects/deep-thoughts.png"
                                height="2000"
                                width="2000"
                                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                alt="thumbnail"
                            />
                        </CardItem>
                        <div className="flex justify-between items-center mt-10">
                            <div></div>
                            <CardItem
                                translateZ={20}
                                as="button"
                                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                            >
                                <a href="https://blog.trueberryless.org/">Try now →</a>
                            </CardItem>
                        </div>
                    </CardBody>
                </CardContainer>
            </div>
            <div className="max-w-5xl mx-auto px-8">
                <HoverEffect items={projects} />
            </div>
        </div>
    );
}
export const projects = [
    {
        title: "About",
        description:
            "Find out more about me and my projects. I am a full stack developer with a passion for technology.",
        link: "https://trueberryless.org/",
    },
    {
        title: "Truzzles",
        description: "Collection of some interesting puzzles. More comming soon...",
        link: "https://truzzles.trueberryless.org/",
    },
    {
        title: "Marketing",
        description:
            "How „trueberryless“ represents himself to the audience. Currently in development.",
        link: "https://marketing.trueberryless.org/",
    },
    {
        title: "Button Game",
        description:
            "A simple not round based game where you need to press a button as fast as possible. You can also manipulate your opponent's button. Currently not deployed.",
        link: "https://button-game.trueberryless.org/",
    },
    {
        title: "Group Chat",
        description:
            "Chat with other people all over the world. Either get a random chatter or join the one and only group chat. Currently not deployed.",
        link: "https://chat.trueberryless.org/",
    },
    {
        title: "Networkanalysis",
        description:
            "A fast web application (Angular) with a robust backend (Kafka + Spring Framework) developed for Siemens AG as my thesis. It analysis the errors which happen in the European utility grid.",
        link: "https://networkanalysis.trueberryless.org/",
    },
    {
        title: "TrainIT",
        description:
            "Track your fitness data with this app. Track your workouts, see your progress, and see your progress compared to your friends. Currently not deployed.",
        link: "https://trainit.trueberryless.org/",
    },
    {
        title: "Y",
        description:
            "Y should I explain? Y is a platform that allows you to share your thoughts with your friends. Currently not deployed.",
        link: "https://y.trueberryless.org/",
    },
];
