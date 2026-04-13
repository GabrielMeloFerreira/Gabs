'use client'

import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'

export default function Background() {
  return (
    <div className='fixed inset-0 -z-10'>
      <Canvas style={{ background: 'black', width: '100%', height: '100%' }}>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  )
}