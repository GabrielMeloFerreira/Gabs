'use client'

import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export function NavHeader () {
    return (
        <>
            <nav>
                <div className='flex  mr-20 ml-20 mt-3 gap-5'>
                    <div className='flex mr-auto gap-10'>
                        <h1 className='cursor-pointer'>Gabriel de Melo Ferreira</h1>
                        <ul className='flex gap-2'>
                            <li className='hover:text-importantText cursor-pointer'>Home</li>
                            <li className='hover:text-importantText cursor-pointer'>About</li>
                            <li className='hover:text-importantText cursor-pointer'>Experience</li>
                            <li className='hover:text-importantText cursor-pointer'>Projects</li>
                        </ul>
                    </div>
                    <div className='flex gap-2 ml-auto'>
                        <a  className='hover:text-importantText' href="https://www.linkedin.com/in/gabriel-melo-dev" target='_blank'><LinkedInIcon></LinkedInIcon></a>
                        <a className='hover:text-importantText' href="https://github.com/GabrielMeloFerreira" target='_blank'><GitHubIcon></GitHubIcon></a>
                        <a className='hover:text-importantText' href="mailto:melogabrielbiel@gmail.com" target='_blank'><EmailIcon></EmailIcon></a>
                    </div>
                </div>
            </nav>
        </>
    )
}