/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Stars, Environment, Torus, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const NetworkNodes = () => {
    const count = 2000;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
        }
        return pos;
    }, [count]);

    const ref = useRef<THREE.Points>(null);
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <Points ref={ref} positions={positions} stride={3}>
            <PointMaterial
                transparent
                color="#F7931A"
                size={0.04}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={0.4}
            />
        </Points>
    );
};

const BlockchainRing = ({ radius, speed, color }: { radius: number, speed: number, color: string }) => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x = state.clock.getElapsedTime() * speed;
            ref.current.rotation.z = state.clock.getElapsedTime() * speed * 1.5;
        }
    });

    return (
        <Torus ref={ref} args={[radius, 0.01, 16, 100]}>
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.2} />
        </Torus>
    );
};

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#0A0A0A']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#F7931A" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sphere args={[2, 64, 64]}>
                <meshStandardMaterial 
                    color="#111" 
                    roughness={0.1} 
                    metalness={1} 
                    emissive="#F7931A" 
                    emissiveIntensity={0.1}
                />
            </Sphere>
            <BlockchainRing radius={2.5} speed={0.1} color="#F7931A" />
            <BlockchainRing radius={2.8} speed={-0.08} color="#ffffff" />
        </Float>

        <NetworkNodes />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export const NetworkScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <spotLight position={[5, 5, 5]} angle={0.15} penumbra={1} intensity={1} color="#F7931A" />
        
        <Float rotationIntensity={1} floatIntensity={1} speed={2}>
            <group>
                {/* Visualizing "Nodes" as spheres connected by lines */}
                {Array.from({ length: 8 }).map((_, i) => (
                    <mesh key={i} position={[
                        Math.sin(i * Math.PI * 2 / 8) * 1.5,
                        Math.cos(i * Math.PI * 2 / 8) * 1.5,
                        0
                    ]}>
                        <sphereGeometry args={[0.1, 16, 16]} />
                        <meshStandardMaterial color="#F7931A" emissive="#F7931A" emissiveIntensity={0.5} />
                    </mesh>
                ))}
                
                {/* Central "Truth" Ledger */}
                <mesh>
                    <boxGeometry args={[0.8, 0.8, 0.8]} />
                    <meshStandardMaterial color="#333" roughness={0} metalness={1} />
                    <Torus args={[0.6, 0.02, 16, 64]} rotation={[Math.PI/2, 0, 0]}>
                        <meshStandardMaterial color="#F7931A" />
                    </Torus>
                </mesh>
            </group>
        </Float>
        
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}