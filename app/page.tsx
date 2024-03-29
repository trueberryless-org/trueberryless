import { BackgroundBeams } from "@/components";
import { CurriculumVitae } from "./curriculum-vitae";
import { Footer } from "./footer";
import Header from "./header";
import Images from "./images";
import { Projects } from "./projects";
import SocialMedia from "./social-media";

export default function Home() {
    return (
        <div>
            <Header />
            <CurriculumVitae />
            <div className="h-40"></div>
            <Projects />
            <div className="h-40"></div>
            <Images />
            <SocialMedia />
            <div className="h-10"></div>
            <Footer />
        </div>
    );
}
