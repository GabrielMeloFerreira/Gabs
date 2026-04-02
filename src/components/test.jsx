import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ProfileOrbit({
  photoSrc,
  size = 320,
  sunSpeed = 0.7,
  moonSpeed = 1.2,
}) {
  const mountRef = useRef(null)
  const stateRef = useRef({})

  useEffect(() => {
    const mount = mountRef.current

    // ── Renderer ────────────────────────────────────────────────
    // alpha: true → fundo transparente (foto aparece atrás)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(size, size)
    renderer.setPixelRatio(window.devicePixelRatio)
    mount.appendChild(renderer.domElement)

    // ── Scene + Camera ───────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0, 9)

    // ── Luzes ────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.3))
    const sunLight = new THREE.PointLight(0xfff5cc, 3, 30)
    scene.add(sunLight)

    // ── Anel decorativo (frame dourado) ──────────────────────────
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(3.4, 0.07, 24, 120),
      new THREE.MeshStandardMaterial({ color: 0xd4a843, metalness: 0.95, roughness: 0.15 })
    )
    scene.add(ring)

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.1, 0.025, 16, 100),
      new THREE.MeshStandardMaterial({ color: 0x8a6820, metalness: 0.8, roughness: 0.3 })
    )
    scene.add(ring2)

    // ── Sol ──────────────────────────────────────────────────────
    // MeshBasicMaterial = não é afetado por luz (brilha sempre)
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(0.42, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xffdd44 })
    )
    scene.add(sun)

    const sunAura = new THREE.Mesh(
      new THREE.SphereGeometry(0.64, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xff9900, transparent: true, opacity: 0.15 })
    )
    scene.add(sunAura)

    // Raios do sol
    const raysGroup = new THREE.Group()
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2
      const ray = new THREE.Mesh(
        new THREE.CylinderGeometry(0.012, 0.002, 0.28, 6),
        new THREE.MeshBasicMaterial({ color: 0xffee88 })
      )
      ray.position.set(Math.cos(a) * 0.72, Math.sin(a) * 0.72, 0)
      ray.rotation.z = a + Math.PI / 2
      raysGroup.add(ray)
    }
    scene.add(raysGroup)

    // ── Lua ──────────────────────────────────────────────────────
    // MeshStandardMaterial = reage à luz (tem sombra/brilho)
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0xe8e4d0, roughness: 0.9 })
    )
    scene.add(moon)

    const moonGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.38, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0xbbccff, transparent: true, opacity: 0.12 })
    )
    scene.add(moonGlow)

    // ── Linhas de órbita ─────────────────────────────────────────
    function makeOrbitRing(radius, color) {
      const pts = []
      for (let i = 0; i <= 128; i++) {
        const a = (i / 128) * Math.PI * 2
        // X e Y → órbita no plano frontal (vertical)
        pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0))
      }
      return new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.2 })
      )
    }
    scene.add(makeOrbitRing(2.7, 0xffcc00))
    scene.add(makeOrbitRing(2.05, 0xaabbff))

    // ── Guarda referências para o loop ───────────────────────────
    stateRef.current = {
      renderer, scene, camera,
      sun, sunAura, raysGroup, sunLight,
      moon, moonGlow,
      sunAngle: 0,
      moonAngle: Math.PI, // começa oposto ao sol
      clock: new THREE.Clock(),
    }

    // ── Loop de animação ─────────────────────────────────────────
    // delta = tempo real entre frames → velocidade consistente
    // em qualquer monitor (60hz, 120hz, etc.)
    let animId
    function animate() {
      animId = requestAnimationFrame(animate)
      const s = stateRef.current
      const delta = s.clock.getDelta()

      s.sunAngle  += delta * s.sunSpeed
      s.moonAngle += delta * s.moonSpeed

      // Órbita VERTICAL: usa X e Y, Z fica fixo em 0
      const SR = 2.7
      s.sun.position.set(Math.cos(s.sunAngle) * SR, Math.sin(s.sunAngle) * SR, 0)
      s.sunAura.position.copy(s.sun.position)
      s.raysGroup.position.copy(s.sun.position)
      s.raysGroup.rotation.z = s.sunAngle * 1.5
      s.sunLight.position.copy(s.sun.position)

      const MR = 2.05
      s.moon.position.set(Math.cos(s.moonAngle) * MR, Math.sin(s.moonAngle) * MR, 0)
      s.moonGlow.position.copy(s.moon.position)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [size])

  // Sincroniza velocidades sem recriar a cena
  useEffect(() => {
    Object.assign(stateRef.current, { sunSpeed, moonSpeed })
  }, [sunSpeed, moonSpeed])

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',       // corta tudo fora do círculo
        position: 'relative',
        border: '3px solid #c8a040',
        boxShadow: '0 0 0 1px #7a5010, 0 8px 32px rgba(0,0,0,0.4)',
        flexShrink: 0,
      }}
    >
      {/* Camada 1: sua foto */}
      {photoSrc && (
        <img
          src={photoSrc}
          alt="profile"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',   // preenche o círculo sem distorcer
          }}
        />
      )}

      {/* Camada 2: canvas Three.js transparente por cima */}
      <div
        ref={mountRef}
        style={{ position: 'absolute', inset: 0 }}
      />
    </div>
  )
}