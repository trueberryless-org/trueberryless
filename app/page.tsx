import { CurriculumVitae } from "./curriculum-vitae";
import Header from "./header";
import Images from "./images";
import SocialMedia from "./social-media";

export default function Home() {
    return (
        <div>
            <Header />
            {/* <CurriculumVitae /> */}
            <Images />
            <SocialMedia />
        </div>
    );
}
