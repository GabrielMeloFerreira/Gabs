'use client'

import { ExperienceCard } from './ExperienceCard';

export default function Experience () {

    return (
        <>
            <div id='experience' className='flex flex-col max-w md:flex-row justify-center gap-8 min-h-screen px-4 scroll-mt-10'>
                <div className='flex flex-col gap-20 max-w-200 text-center md:text-left'>
                    <h1 className='text-5xl font-bold text-boldText'>Experience</h1>
                    <div className='flex flex-col gap-3 text-base/6'>
                        <ExperienceCard
                            company='MultiDadosTI'
                            role='Software Engineer'
                            period='MAY 2026 - Present'
                        />
                        <ExperienceCard
                            company='Patriani'
                            role='Software Engineer'
                            period='JUN 2024 - MAY 2026'
                        />
                    </div>

                </div>
            </div>
        </> 
    )
}