import PhotoTilt from "../components/PhotoTilt";
import Navbar from "../components/navbar";

function LandingPage(){
    return (
        <>
            <Navbar />
            <h2>Landing Page</h2>
            <p className="text-blue-600">The quick brown fox...</p>

            <div className="flex flex-row">
                <div><PhotoTilt/></div>
                <div></div>
            </div>
        </>
    )
}

export default LandingPage;