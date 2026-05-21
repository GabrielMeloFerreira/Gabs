import { Next } from 'react-bootstrap/esm/PageItem';


export default function About () {

    const stacks = [
        "Javascript/Typescript",
        "Java",
        "C#",
        "Python",
        "Tailwind",
        "React",
        "Next.js",
        "Node.js",
        "Power Plataform",
        "n8n"
    ];

    const stack_list = stacks.map((stack, index) => (
        <li className='before:content-["▹"] before:text-importantText before:pr-2 hover:text-importantText cursor-default' key={index}>{stack}</li>
    ));

    return (
        <>
            <div id='about' className='flex flex-col max-w md:flex-row justify-center items- gap-8 min-h-screen px-4 scroll-mt-20'>
                <div className='flex flex-col gap-20 max-w-200 text-center md:text-left'>
                    <h1 className='text-5xl font-bold text-boldText'>About</h1>
                    <div className='flex flex-col gap-10 text-base/6'>
                        <div className=''>
                            I’m a software engineer based in São Paulo with a strong passion for identifying productivity bottlenecks in long and manual processes. 
                            I enjoy building solutions that simplify people’s work and tackling complex challenges that push me to explore and better understand new technologies.
                        </div>
                        <div>
                            Here are some of the technologies I work with:
                            <ul className='columns-3 mt-3'>
                                {stack_list}
                            </ul>
                        </div>
                        <div>
                            In my free time, I enjoy developing games, studying pixel art, playing MOBA and indie games.
                        </div>
                    </div>

                </div>
            </div>
        </> 
    )
}