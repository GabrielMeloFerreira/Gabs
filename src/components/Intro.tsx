'use client'

import perfil from '@/assets/perfil.jpg';
import { Typewriter } from 'react-simple-typewriter';
import ProfileBorder from './ProfilePicture';

export function Intro () {
    return (
    <>
        <div className='flex flex-col md:flex-row max-w-400 justify-center items-center gap-8 min-h-screen px-4'>
            <ProfileBorder src={perfil}/>
            <div className='max-w-130 text-center md:text-left'>
                <div className='text-xl sm:text-2xl md:text-3xl'>I Am Into
                <span className='inline text-importantText'><Typewriter words={[" Backend Development", " Python Development", " Web Development"]} loop={Infinity} typeSpeed={70} cursor cursorStyle='_' deleteSpeed={50} delaySpeed={1000}/></span></div>
                <div className='text-2xl'>Welcome! <p className='inline text-importantText'>Gabriel</p> here.</div>
                <div className="">I am a software engineer based in São Paulo, i like to work with react for front, and love work with java, databases, API development</div>
            </div>
        </div>
    </>
    )
}