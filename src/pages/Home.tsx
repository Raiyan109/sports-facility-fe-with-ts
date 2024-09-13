import Facilities from "./home/facilities/Facilities";
import Hero from "./home/Hero";



const Home = () => {
    return (
        <div>
            <div className="max-w-[1480px] mx-auto container overflow-hidden px-10">
                <Hero />
                <Facilities />
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default Home;