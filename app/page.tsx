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
            {/* <CurriculumVitae /> */}
            <Projects />
            <Images />
            <SocialMedia />
            <Footer />
        </div>
    );
}
