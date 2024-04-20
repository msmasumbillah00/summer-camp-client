import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const Banner = () => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    const banners = [
        {
            id: 1,
            discribe: "Your enchanted emporium for whimsical wonders and playful treasures, curated to spark imagination and adventure in every child's heart.",
            imgUrl: "https://i.pinimg.com/564x/bf/b8/27/bfb8277f3957ff3a8ba38cd298702691.jpg"
        },
        {
            id: 2,
            discribe: "Your enchanted emporium for whimsical wonders and playful treasures, curated to spark imagination and adventure in every child's heart.",
            imgUrl: "https://i.pinimg.com/564x/c5/a0/bd/c5a0bda0a6150490d20c61c32b3d3226.jpg"
        },
        {
            id: 3,
            discribe: "Your enchanted emporium for whimsical wonders and playful treasures, curated to spark imagination and adventure in every child's heart.",
            imgUrl: "https://i.pinimg.com/564x/8e/7c/a1/8e7ca17302124e5999830738bd6d5490.jpg"
        },
        {
            id: 4,
            discribe: "Your enchanted emporium for whimsical wonders and playful treasures, curated to spark imagination and adventure in every child's heart.",
            imgUrl: "https://i.pinimg.com/564x/60/e8/49/60e8497a0d416c22c5589aea0998341b.jpg"
        },
        {
            id: 5,
            discribe: "Your enchanted emporium for whimsical wonders and playful treasures, curated to spark imagination and adventure in every child's heart.",
            imgUrl: "https://i.pinimg.com/564x/de/cc/fd/deccfd90cd8ec219e81ec5142543cbf1.jpg"
        },
        {
            id: 6,
            discribe: "Your enchanted emporium for whimsical wonders and playful treasures, curated to spark imagination and adventure in every child's heart.",
            imgUrl: "https://i.pinimg.com/564x/92/8d/f6/928df6b17e39159b18f5e131cfcb5f5e.jpg"
        },

    ]


    return (
        <div className="bg-gradient-to-l from-cyan-100 p-4 mt-5">
            <Carousel
                swipeable={true}
                showDots={true}
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                removeArrowOnDeviceType={["tablet", "mobile"]}
            >

                {
                    banners.map((ele, ndx) => <div key={ndx} className="overflow-hidden flex flex-col-reverse  lg:flex-row  w-full h-[100vw] md:h-[70vw] lg:h-[30vw] ">
                        <div className="lg:w-5/12 flex flex-col justify-center py-5">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-mono font-semibold"><span className="">CAPTURE</span> SCHOOL <br /> SUMMER SETION</h1>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae cum adipisci omnis cupiditate distinctio, alias tempore architecto? Repudiandae, quam at!
                            </p>
                            <button className="btn w-fit my-4 btn-md text-white bg-gradient-to-tr  from-cyan-500 to-slate-400">See Detailss</button>
                        </div>
                        <img className="object-cover lg:w-7/12 h-full rounded-xl " src={ele.imgUrl}></img>

                    </div>)
                }
            </Carousel>
        </div>
    );
};

export default Banner;
