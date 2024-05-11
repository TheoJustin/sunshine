import { FaUserCircle } from 'react-icons/fa';

export default function CardComments() {
    return (
        <>
        <div className="flex flex-col align-top gap-4 w-full h-full">
            <h1 className='font-sans font-bold mb-3 text-white'>Our <span className='text-orange-custom'>Users</span></h1>
            <figure className="flex flex-col  w-full items-start mb-3 px-8 py-5 text-center rounded-xl"
                    style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.3)"
                    }}>
                <figcaption className="flex items-center text-left  border-b border-black w-full pb-3">
                    <FaUserCircle className="rounded-full w-9 h-9 mr-2" alt="profile picture"/>
                    <div className="space-y-0.5 font-medium  text-left rtl:text-right ms-3">
                        <div className="font-sans text-xl font-bold text-orange-custom">Gojo Satoru</div>
                        <div className="font-sans text-sm text-teal-custom ">Developer</div>
                    </div>
                </figcaption>    
                <blockquote className="pt-5 mx-auto text-gray-500 text-left dark:text-gray-400">
                    <h3 className="font-sans text-base font-bold text-darkgreen-custom">Very good features to integrate</h3>
                    <p className="my-2 font-sans text-xs font-semibold text-teal-custom">I could chat with my friends anytime and anywhere and it's super secure to use!</p>
                </blockquote>
            </figure>
            <figure className="flex flex-col w-full items-start px-8 py-5 text-center rounded-xl"
                    style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.3)"
                    }}>
                <figcaption className="flex items-center text-left  border-b border-black w-full pb-3">
                    <FaUserCircle className="rounded-full w-9 h-9 mr-2" alt="profile picture"/>
                    <div className="space-y-0.5 font-medium  text-left rtl:text-right ms-3">
                        <div className="font-sans text-xl font-bold text-orange-custom">Robin</div>
                        <div className="font-sans text-sm text-teal-custom ">Developer</div>
                    </div>
                </figcaption>    
                <blockquote className="pt-5 mx-auto text-gray-500 text-left dark:text-gray-400">
                    <h3 className="font-sans text-base font-bold text-darkgreen-custom">Solid foundation for a chat project</h3>
                    <p className="my-2 font-sans text-xs font-semibold text-teal-custom">Playing games with friends and having cryptocurrency transactions are very useful!</p>
                </blockquote>
            </figure>

            {/* <figure className="flex flex-col items-center justify-center p-14 text-center rounded-xl"
                    style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.3)"
                    }}>
                <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                    <h3 className="font-sans text-2xl font-bold text-gray-900 dark:text-white">Solid foundation for a chat project</h3>
                    <p className="my-4 font-sans font-semibold">Playing games with friends and having cryptocurrency transactions are very useful!</p>
                </blockquote>
                <figcaption className="flex items-center justify-center ">
                    <FaUserCircle className="rounded-full w-9 h-9" alt="profile picture"/>
                    <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                        <div className="font-sans">Victor Halim</div>
                        <div className="font-sans text-sm text-gray-500 dark:text-gray-400">Developer</div>
                    </div>
                </figcaption>    
            </figure> */}
        </div>
        </>
    )
}
