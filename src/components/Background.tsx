'use client'

import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Trail } from '@react-three/drei'
import { useRef, useState } from 'react'

export default function Background() {

  
  function StarRain() {
    const sphereRef = useRef<THREE.Mesh>(null);
    const speed = 4;
    const [resetKey, setResetKey] = useState(0);
    const startPos = useRef({
      x: Math.random() * 20 - 10,
      y: Math.random() * 10 + 5,
    });

    useFrame((_, delta) => {
      if (sphereRef.current) {
        sphereRef.current.position.y -= delta * speed;
        sphereRef.current.position.x -= delta * speed;

        if (sphereRef.current.position.y < -10) {
          startPos.current = {
            x: Math.random() * 20 - 10,
            y: Math.random() * 10 + 5,
          };
          setResetKey((k) => k + 1);
        }
      }
    });

    return (
      <Trail
        key={resetKey}
        width={0.4}
        length={3}
        color={new THREE.Color(2, 1, 10)}
        attenuation={(t) => t * t}
      >
        <mesh
          ref={sphereRef}
          position={[startPos.current.x, startPos.current.y, 0]}
        >
          <sphereGeometry args={[0.0001]} />
          <meshBasicMaterial color={[10, 1, 10]} toneMapped={false} />
        </mesh>
      </Trail>
    );
  }

  return (
    <div className='fixed inset-0 -z-10'>
      <Canvas style={{ background: 'black', width: '100%', height: '100%' }}>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <StarRain/>
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  )
}