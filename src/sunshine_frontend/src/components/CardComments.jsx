

export default function CardComments(){
    return (
        <>
        <div class="grid mb-8 rounded-lg shadow-sm md:mb-12 dark:bg-gray-800 gap-10">
            <figure class="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl">
                <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                    <h3 class="font-sans text-2xl font-bold text-gray-900 dark:text-white">Very good features to integrate</h3>
                    <p class="my-4 font-sans font-semibold">I could chat with my friends anytime!</p>
                </blockquote>
                <figcaption class="flex items-center justify-center ">
                    <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png" alt="profile picture"/>
                    <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                        <div class="font-sans">Darryl Effendi</div>
                        <div class="font-sans text-sm text-gray-500 dark:text-gray-400 ">Developer</div>
                    </div>
                </figcaption>    
            </figure>


            <figure class="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl">
                <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                    <h3 class="font-sans text-2xl font-bold text-gray-900 dark:text-white">Solid foundation for a chat project</h3>
                    <p class="my-4 font-sans font-semibold">Playing games with friends are such a cool feature!</p>
                </blockquote>
                <figcaption class="flex items-center justify-center ">
                    <img class="rounded-full w-9 h-9" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png" alt="profile picture"/>
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