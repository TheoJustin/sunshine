import PhotoTilt from "../components/PhotoTilt";
import Navbar from "../components/Navbar";

function LandingPage(){
    return (
        <>
            <Navbar />
            <h2>Landing Page</h2>
            <p className="text-blue-600">The quick brown fox...</p>

            <div className="flex flex-row m-5">
                <div><PhotoTilt/></div>
                <div>text</div>
            </div>
        </>
    )
}

export default LandingPage;