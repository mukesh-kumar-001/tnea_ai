import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles, ContactShadows } from "@react-three/drei";
import { motion, AnimatePresence } from "motion/react";
import * as THREE from "three";

function Gear({ 
  radius = 2, 
  teeth = 12, 
  speed = 0.5, 
  color = "#a0aec0",
  metalness = 0.9,
  ...props 
}: {
  radius?: number;
  teeth?: number;
  speed?: number;
  color?: string;
  metalness?: number;
  [key: string]: any;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * speed;
    }
  });

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const innerRadius = radius * 0.75; 
    const depth = radius * 0.25;
    const holeRadius = radius * 0.3;
    const step = (Math.PI * 2) / teeth;

    for (let i = 0; i < teeth; i++) {
      const angle = i * step;
      
      const gapEnd = angle + step * 0.2;
      const toothStart = angle + step * 0.3;
      const toothEnd = angle + step * 0.7;
      const gapStart = angle + step * 0.8;

      if (i === 0) {
        shape.moveTo(Math.cos(angle) * innerRadius, Math.sin(angle) * innerRadius);
      } else {
        shape.lineTo(Math.cos(angle) * innerRadius, Math.sin(angle) * innerRadius);
      }
      
      shape.lineTo(Math.cos(gapEnd) * innerRadius, Math.sin(gapEnd) * innerRadius);
      shape.lineTo(Math.cos(toothStart) * radius, Math.sin(toothStart) * radius);
      shape.lineTo(Math.cos(toothEnd) * radius, Math.sin(toothEnd) * radius);
      shape.lineTo(Math.cos(gapStart) * innerRadius, Math.sin(gapStart) * innerRadius);
    }
    shape.closePath();

    const holePath = new THREE.Path();
    holePath.absarc(0, 0, holeRadius, 0, Math.PI * 2, false);
    shape.holes.push(holePath);

    const extrudeSettings = {
      depth: depth,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: radius * 0.05,
      bevelThickness: radius * 0.05,
    };
    
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.center(); // Center geometry
    return geo;
  }, [radius, teeth]);

  return (
    <mesh ref={meshRef} geometry={geometry} {...props}>
      <meshStandardMaterial
        color={color}
        metalness={metalness}
        roughness={0.2}
        envMapIntensity={2}
      />
    </mesh>
  );
}

function GearAssembly() {
  const assemblyRef = useRef<THREE.Group>(null);
  
  // Slowly rotate the entire assembly sideways to show depth
  useFrame((state, delta) => {
    if (assemblyRef.current) {
      assemblyRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
      assemblyRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.15) * 0.3 + 0.3; // slightly offset sideways
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
      <group ref={assemblyRef}>
        {/* Center Primary Gear */}
        <Gear 
          radius={2} 
          teeth={16} 
          speed={0.5} 
          color="#cbd5e1" 
          position={[0, 0, 0]} 
        />
        
        {/* Right Secondary Gear (meshing) */}
        <Gear 
          radius={1.2} 
          teeth={10} 
          speed={-0.8} // rotates opposite direction, faster due to smaller size
          color="#94a3b8" 
          position={[3.05, -0.2, 0]} 
          rotation={[0, 0, 0.2]} // slight offset to mesh teeth
        />
        
        {/* Top Left Secondary Gear */}
        <Gear 
          radius={1.5} 
          teeth={12} 
          speed={-0.66} 
          color="#64748b" 
          position={[-2.4, 2.3, -0.2]} 
          rotation={[0, 0, -0.1]}
        />
        
        {/* Small Bottom Left Gear */}
        <Gear 
          radius={0.8} 
          teeth={6} 
          speed={1.33} 
          color="#475569" 
          position={[-2.2, -1.8, 0.2]} 
          rotation={[0, 0, 0.5]}
        />
        
        {/* Background Large Slow Gear */}
        <Gear 
          radius={3.5} 
          teeth={28} 
          speed={0.2} 
          color="#334155"
          metalness={0.7} 
          position={[1, -2, -1.5]} 
          rotation={[0, 0, 0]}
        />
      </group>
    </Float>
  );
}

export default function EasterEgg({ onClose }: { onClose: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handler);
    
    // Auto-close after 4 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 4000);

    return () => {
      window.removeEventListener("keydown", handler);
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 1000);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 cursor-pointer" onClick={handleClose} />
          
          <div className="absolute inset-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1.5} color="#4f46e5" />
              <directionalLight position={[-10, -10, -5]} intensity={1} color="#38bdf8" />
              
              <GearAssembly />
              
              <Sparkles count={150} scale={15} size={2} speed={0.4} opacity={0.3} color="#818cf8" />
              <ContactShadows position={[0, -4, 0]} opacity={0.5} scale={15} blur={2} far={5} />
              
              <Environment preset="city" />
            </Canvas>
          </div>

          <motion.div 
            className="absolute bottom-16 text-center pointer-events-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground drop-shadow-xl font-mono">
              You are a <span className="text-primary">Mechanical Engineer</span>.
            </h2>
            <p className="mt-4 text-xl text-muted-foreground font-mono tracking-widest uppercase">
              Keep building. Keep innovating.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
