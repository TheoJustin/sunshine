import { FaUserCircle } from 'react-icons/fa';

export default function CardComments() {
    return (
        <>
        <div class="flex flex-col justify-between">
            <figure class="flex flex-col items-center justify-center p-14 text-center rounded-xl"
                    style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.3)"
                    }}>
                <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                    <h3 class="font-sans text-2xl font-bold text-gray-900 dark:text-white">Very good features to integrate</h3>
                    <p class="my-4 font-sans font-semibold">I could chat with my friends anytime and anywhere and it's super secure to use!</p>
                </blockquote>
                <figcaption class="flex items-center justify-center ">
                    <FaUserCircle class="rounded-full w-9 h-9" alt="profile picture"/>
                    <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                        <div class="font-sans">Darryl Effendi</div>
                        <div class="font-sans text-sm text-gray-500 dark:text-gray-400 ">Developer</div>
                    </div>
                </figcaption>    
            </figure>

            <figure class="flex flex-col items-center justify-center p-14 text-center rounded-xl"
                    style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.3)"
                    }}>
                <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                    <h3 class="font-sans text-2xl font-bold text-gray-900 dark:text-white">Solid foundation for a chat project</h3>
                    <p class="my-4 font-sans font-semibold">Playing games with friends and having cryptocurrency transactions are very useful!</p>
                </blockquote>
                <figcaption class="flex items-center justify-center ">
                    <FaUserCircle class="rounded-full w-9 h-9" alt="profile picture"/>
                    <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                        <div class="font-sans">Victor Halim</div>
                        <div class="font-sans text-sm text-gray-500 dark:text-gray-400">Developer</div>
                    </div>
                </figcaption>    
            </figure>
        </div>
        </>
    )
}
