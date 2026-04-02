import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface ProfileOrbitProps {
    photoSrc?: string
    size?: number
    sunSpeed?: number
    moonSpeed?: number
}

// ─────────────────────────────────────────────────────────────────────────────
// TIPAGEM DO STATE INTERNO (objetos do Three.js)
//
// Criamos uma interface separada para descrever o objeto que ficará
// guardado dentro da stateRef. Isso é importante porque o TypeScript
// precisa saber exatamente quais propriedades existem ali e de que tipo
// cada uma é — assim ele consegue te avisar se você errar um nome, por ex.
//
// THREE.WebGLRenderer, THREE.Scene, etc. são tipos que vêm da própria
// biblioteca three.js. Quando você instala "@types/three" (ou quando
// o three já inclui seus próprios tipos), esses tipos ficam disponíveis.
// ─────────────────────────────────────────────────────────────────────────────
interface SceneState {
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    sun: THREE.Mesh
    sunAura: THREE.Mesh
    raysGroup: THREE.Group
    sunLight: THREE.PointLight
    moon: THREE.Mesh
    moonGlow: THREE.Mesh
    sunAngle: number
    moonAngle: number
    sunSpeed: number
    moonSpeed: number
    clock: THREE.Clock
}

export default function ProfileOrbit({
    photoSrc,
    size = 320,
    sunSpeed = 0.7,
    moonSpeed = 1.2,
}: ProfileOrbitProps) {

    const mountRef = useRef<HTMLDivElement>(null);
    const stateRef = useRef<Partial<SceneState>>({});

    useEffect(() => {

        // O "!" após mountRef.current é o "non-null assertion operator".
        // Ele diz ao TypeScript: "eu sei que isso não é null aqui, pode confiar".
        // Sem ele, TypeScript reclamaria: "mountRef.current pode ser null!"
        // Usamos porque sabemos que o useEffect só roda depois que o <div>
        // já está montado no DOM — então a ref com certeza tem um valor.
        const mount = mountRef.current!

        // ── Renderer ──────────────────────────────────────────────────────────
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setSize(size, size)
        renderer.setPixelRatio(window.devicePixelRatio)
        mount.appendChild(renderer.domElement)

        // ── Scene + Camera ─────────────────────────────────────────────────────
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
        camera.position.set(0, 0, 9)

        // ── Luzes ──────────────────────────────────────────────────────────────
        scene.add(new THREE.AmbientLight(0xffffff, 0.3))
        const sunLight = new THREE.PointLight(0xfff5cc, 3, 30)
        scene.add(sunLight)

        // ── Anel decorativo ────────────────────────────────────────────────────
        scene.add(new THREE.Mesh(
            new THREE.TorusGeometry(3.4, 0.07, 24, 120),
            new THREE.MeshStandardMaterial({ color: 0xd4a843, metalness: 0.95, roughness: 0.15 })
        ))
        scene.add(new THREE.Mesh(
            new THREE.TorusGeometry(3.1, 0.025, 16, 100),
            new THREE.MeshStandardMaterial({ color: 0x8a6820, metalness: 0.8, roughness: 0.3 })
        ))

        // ── Sol ────────────────────────────────────────────────────────────────
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

        // Raios do sol — Group agrupa objetos para mover/rotacionar juntos
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

        // ── Lua ────────────────────────────────────────────────────────────────
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

        // ── Linhas de órbita ───────────────────────────────────────────────────
        // Tipamos o parâmetro "radius" como number e "color" como number
        // (cor hexadecimal no Three.js é sempre um número)
        function makeOrbitRing(radius: number, color: number): THREE.Line {
            const pts: THREE.Vector3[] = []
            // "THREE.Vector3[]" significa: array de Vector3
            // É equivalente a "Array<THREE.Vector3>"
            for (let i = 0; i <= 128; i++) {
                const a = (i / 128) * Math.PI * 2
                pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0))
            }
            return new THREE.Line(
                new THREE.BufferGeometry().setFromPoints(pts),
                new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.2 })
            )
        }
        scene.add(makeOrbitRing(2.7, 0xffcc00))
        scene.add(makeOrbitRing(2.05, 0xaabbff))

        // ── Salva tudo na ref ──────────────────────────────────────────────────
        // "Object.assign" tem sua tipagem inferida automaticamente pelo TS.
        // O resultado é que stateRef.current passa a ter todas essas props.
        stateRef.current = {
            renderer, scene, camera,
            sun, sunAura, raysGroup, sunLight,
            moon, moonGlow,
            sunAngle: 0,
            moonAngle: Math.PI,
            sunSpeed,
            moonSpeed,
            clock: new THREE.Clock(),
        }

        // ── Loop de animação ───────────────────────────────────────────────────
        // "number" porque requestAnimationFrame retorna um ID numérico
        let animId: number

        function animate(): void {
            // ": void" significa que a função não retorna nada
            animId = requestAnimationFrame(animate)

            // Desestruturamos com tipos implícitos — o TS já sabe os tipos
            // porque inferiu de SceneState quando populamos a ref acima.
            const s = stateRef.current

            // Verificação de nulidade (null check)
            // Como stateRef é Partial<SceneState>, cada propriedade pode ser
            // undefined. O "if (!s.clock)" protege contra isso.
            // Sem essa verificação, o TypeScript daria erro em "s.clock.getDelta()"
            // dizendo: "clock pode ser undefined"
            if (!s.clock) return

            const delta: number = s.clock.getDelta()

            s.sunAngle = (s.sunAngle ?? 0) + delta * (s.sunSpeed ?? sunSpeed)
            s.moonAngle = (s.moonAngle ?? 0) + delta * (s.moonSpeed ?? moonSpeed)
            // "?? 0" é o "nullish coalescing operator" — retorna o valor da
            // esquerda se não for null/undefined, senão retorna o da direita.
            // É diferente de "||" porque "|| 0" também substitui o número 0
            // (falsy), enquanto "?? 0" só substitui null e undefined.

            const SR = 2.7
            s.sun?.position.set(
                Math.cos(s.sunAngle) * SR,
                Math.sin(s.sunAngle) * SR,
                0
            )
            // O "?." é o "optional chaining operator".
            // "s.sun?.position.set(...)" significa:
            // "se s.sun existir, acesse .position.set(...); senão, não faça nada"
            // Sem ele, TypeScript reclamaria que s.sun pode ser undefined.

            s.sunAura?.position.copy(s.sun!.position)
            s.raysGroup?.position.copy(s.sun!.position)
            if (s.raysGroup) s.raysGroup.rotation.z = s.sunAngle * 1.5
            s.sunLight?.position.copy(s.sun!.position)

            const MR = 2.05
            s.moon?.position.set(
                Math.cos(s.moonAngle) * MR,
                Math.sin(s.moonAngle) * MR,
                0
            )
            s.moonGlow?.position.copy(s.moon!.position)

            s.renderer?.render(s.scene!, s.camera!)
            // "s.scene!" → o "!" diz ao TS: "garanto que não é undefined aqui"
        }

        animate()

        // ── Cleanup ────────────────────────────────────────────────────────────
        return () => {
            cancelAnimationFrame(animId)
            renderer.dispose()
            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement)
            }
        }

    }, [size]) // roda de novo se "size" mudar

    // ─────────────────────────────────────────────────────────────────────────
    // Segundo useEffect — sincroniza velocidades sem recriar a cena
    //
    // "Object.assign" é tipado automaticamente pelo TS como:
    // Object.assign<Partial<SceneState>, { sunSpeed: number, moonSpeed: number }>
    // ─────────────────────────────────────────────────────────────────────────
    useEffect(() => {
        Object.assign(stateRef.current, { sunSpeed, moonSpeed })
    }, [sunSpeed, moonSpeed])

    // ─────────────────────────────────────────────────────────────────────────
    // JSX — aqui não muda quase nada entre JS e TS.
    //
    // A diferença é que propriedades como "style" já são tipadas pelo React.
    // Se você passar uma propriedade CSS que não existe, o TS avisa.
    // Ex: style={{ colour: 'red' }} → erro! (é "color", não "colour")
    //
    // O tipo de "style" em um <div> é: React.CSSProperties
    // ─────────────────────────────────────────────────────────────────────────
    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: '50%',
                overflow: 'hidden',
                position: 'relative',
                border: '3px solid #c8a040',
                boxShadow: '0 0 0 1px #7a5010, 0 8px 32px rgba(0,0,0,0.4)',
                flexShrink: 0,
            }}
        >
            {/* Renderiza a foto só se photoSrc foi passado */}
            {photoSrc && (
                <img
                    src={photoSrc}
                    alt="profile"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            )}

            {/* O canvas do Three.js vai ser injetado aqui */}
            <div
                ref={mountRef}
                style={{ position: 'absolute', inset: 0 }}
            />
        </div>
    )
}
