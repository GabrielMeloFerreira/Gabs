'use client'

import { ExperienceCard } from './ExperienceCard';

export default function Experience () {

    return (
        <>
            <div id='experience' className='flex flex-col max-w-400 md:flex-row justify-center gap-8 min-h-screen px-4 scroll-mt-20'>
                <div className='flex flex-col gap-20 max-w-200 text-center md:text-left'>
                    <h1 className='text-5xl font-bold text-boldText'>Experience</h1>
                    <div className='flex flex-col gap-3 text-base/6'>
                        <ExperienceCard
                            company='Patriani'
                            role='Software Engineer'
                            period='JUN 2024 - Present'
                            description='blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabblablablablablalablablabla'
                        />
                        <ExperienceCard
                            company='Patriani'
                            role='Operations & Automation Analyst'
                            period='SEP 2021 - JUN 2024'
                            description='blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabblablablablablalablablabla'
                        />
                    </div>

                </div>
            </div>
        </> 
    )
}