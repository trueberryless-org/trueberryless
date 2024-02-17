import { BackgroundBeams, SparklesCore } from "@/components";

export default function Header() {
    return (
        <div className="h-[100vh] w-full bg-black flex flex-col items-center justify-center rounded-md">
            <h6 className="md:text-md text-sm lg:text-lg text-center text-gray-500 relative z-20">
                @trueberryless
            </h6>
            <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20">
                Felix Schneider
            </h1>
            <div className="w-[40rem] h-40 relative">
                {/* Gradients */}
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                {/* Core component */}
                <SparklesCore
                    background="transparent"
                    minSize={0.3}
                    maxSize={1.2}
                    particleDensity={600}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />

                {/* Radial Gradient to prevent sharp edges */}
                <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
            <div className="absolute w-full h-full bg-gradient-to-b from-transparent via-transparent to-black z-10"></div>
            <BackgroundBeams />
        </div>
    );
}
