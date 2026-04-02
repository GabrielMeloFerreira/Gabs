'use client'

import perfil from '@/assets/perfil.jpg';
import Image from 'next/image';
import { Typewriter } from 'react-simple-typewriter';

export function Intro () {
    return (
    <>
        <div className='flex justify-center items-center gap-8'>
            <Image src={perfil} alt='Profile Image' className='rounded-full h-90 w-90' />
            <div className=''>
                <div className=''>I Am Into
                <Typewriter words={[" Backend Development", " Python Development", " Web Development"]} loop={Infinity} typeSpeed={70} cursor cursorStyle='_' deleteSpeed={50} delaySpeed={1000}/></div>
                <div className="">Welcome! <p className='inline text-importantText'>Gabriel</p> here.</div>
                <div className="">I love create new things</div>
                <div className="">I am a full-stack developer, i like to work with react for front, and love work with java, databases, API development</div>
            </div>
        </div>
    </>
    )
}