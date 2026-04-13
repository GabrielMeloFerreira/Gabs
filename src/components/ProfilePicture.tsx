import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import Image, { StaticImageData } from 'next/image';


interface ProfilePictureProps {
    src: StaticImageData;
}

gsap.registerPlugin(useGSAP);

export default function ProfilePicture ({src}: ProfilePictureProps) {
    
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        let mm = gsap.matchMedia();

        // Mobile (< 640px)
        mm.add("(max-width: 639px)", () => {
            gsap.to('.sun-wrapper', {
                duration: 30,
                repeat: -1,
                rotation: 360,
                ease: "none",
                transformOrigin: "50% 90px"
            });
            gsap.to('.sun-inner', {
                duration: 100,
                repeat: -1,
                rotation: -360,
                ease: "none",
            });
            gsap.to('.moon-wrapper', {
                duration: 15,
                repeat: -1,
                rotation: 360,
                ease: "none",
                transformOrigin: "50% -70px"
            });
            gsap.to('.moon-inner', {
                duration: 10,
                repeat: -1,
                rotation: 360,
                ease: "none",
            });
        });

        // Tablet (>= 640px)
        mm.add("(min-width: 640px) and (max-width: 919px)", () => {
            gsap.to('.sun-wrapper', {
                duration: 30,
                repeat: -1,
                rotation: 360,
                ease: "none",
                transformOrigin: "50% 140px"
            });
            gsap.to('.sun-inner', {
                duration: 100,
                repeat: -1,
                rotation: -360,
                ease: "none",
            });
            gsap.to('.moon-wrapper', {
                duration: 15,
                repeat: -1,
                rotation: 360,
                ease: "none",
                transformOrigin: "50% -100px"
            });
            gsap.to('.moon-inner', {
                duration: 10,
                repeat: -1,
                rotation: 360,
                ease: "none",
            });
        });

        // Desktop (>= 920px)
        mm.add("(min-width: 920px)", () => {
            gsap.to('.sun-wrapper', {
                duration: 30,
                repeat: -1,
                rotation: 360,
                ease: "none",
                transformOrigin: "50% 180px"
            });
            gsap.to('.sun-inner', {
                duration: 100,
                repeat: -1,
                rotation: -360,
                ease: "none",
            });
            gsap.to('.moon-wrapper', {
                duration: 15,
                repeat: -1,
                rotation: 360,
                ease: "none",
                transformOrigin: "50% -140px"
            });
            gsap.to('.moon-inner', {
                duration: 10,
                repeat: -1,
                rotation: 360,
                ease: "none",
            });
        });
    });

    return (
        <>
            <div ref={container} className='flex circle relative rounded-full h-40 w-40 sm:h-60 sm:w-60 md:h-80 md:w-80 border-2'>
                <Image src={src} alt='Profile Image' className='flex object-cover rounded-full' />
                <div className='sun-wrapper absolute -top-3 sm:-top-5 md:-top-5 left-1/2 -translate-x-1/2'>
                    <div className='sun-inner relative flex items-center justify-center bg-sun rounded-full h-5 w-5 sm:h-10 sm:w-10 md:h-10 md:w-10 shadow-[0_0_2em_0.5em_rgba(255,200,0,0.4)]'>
                        <div className='absolute inset-0 rounded-full border-4 border-yellow-300/40 scale-125'></div>
                        <div className='absolute inset-0 rounded-full border-2 border-yellow-200/20 scale-150'></div>
                    </div>
                </div>
                    
                <div className='moon-wrapper absolute -bottom-3 sm:-bottom-5 md:-bottom-5 left-1/2 -translate-x-1/2'>
                    <div className='moon-inner relative bg-moon rounded-full h-5 w-5 sm:h-10 sm:w-10 md:h-10 md:w-10 shadow-[0_0_2em_0.5em_rgba(100,150,255,0.4)] overflow-hidden'>
                        <div className='absolute -right-2 top-0 h-full w-6 sm:w-10 md:w-10 rounded-full bg-black/40'></div>
                    </div>
                </div>
            </div>
        </>

        
    )
}