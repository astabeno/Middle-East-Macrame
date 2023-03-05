const profilePicUrl = 'https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80'

export default function AboutCard() {
    return (
        <div className="w-full rounded-lg shadow-lg lg:max-w-lg md:m-auto md:my-5 bg-stone-100">
            <img
                className="object-cover w-full h-50 rounded-t-lg"
                src="/about-pic.png"
                alt="image"
            />
            <div className="p-4">
                <h4 className="text-xl font-extrabold tracking-tight text-stone-600">
                    About Jacob
                </h4>
                <p className="mb-2 leading-normal">
                    Jacob has always been good with making things with knots and yarn.
                    When he was younger in and living in Jordan he started making lanyards.
                    At first he did the normal style every kid does at some point, but he started
                    making better and better ones.
                    
                </p>

            </div>
        </div>
    );
}