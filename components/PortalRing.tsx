import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface PortalRingProps {
  size?: number;
}

export const PortalRing: React.FC<PortalRingProps> = ({ size = 480 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number>(0);

  useEffect(() => {
    if (!mountRef.current) return;

    const W = size;
    const H = size;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 10;

    // ── Swirling Interactive Confetti Particles ────────────────────────────────────────
    const particleCount = 1200; // Reduced density for a cleaner look
    const posArray = new Float32Array(particleCount * 3);
    const basePosArray = new Float32Array(particleCount * 3);
    const velArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);

    // Patriotic Color Palette
    const colors = [
      new THREE.Color(0xB22234), // Patriot Red
      new THREE.Color(0xFFFFFF), // White
      new THREE.Color(0x3C3B6E), // Patriot Blue
      new THREE.Color(0xD4A359), // Gold (accent)
    ];

    const baseRadius = 2.6;

    for (let i = 0; i < particleCount; i++) {
      // Create a thick circular ring
      const angle = Math.random() * Math.PI * 2;
      
      // Distribution: concentrated in the center, tapering off
      const radiusOffset = (Math.random() - 0.5) * (Math.random() * 1.2);
      const radius = baseRadius + radiusOffset;
      
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = (Math.random() - 0.5) * 0.5;

      basePosArray[i * 3] = x;
      basePosArray[i * 3 + 1] = y;
      basePosArray[i * 3 + 2] = z;

      posArray[i * 3] = x;
      posArray[i * 3 + 1] = y;
      posArray[i * 3 + 2] = z;

      velArray[i * 3] = 0;
      velArray[i * 3 + 1] = 0;
      velArray[i * 3 + 2] = 0;

      const col = colors[Math.floor(Math.random() * colors.length)];
      colorArray[i * 3] = col.r;
      colorArray[i * 3 + 1] = col.g;
      colorArray[i * 3 + 2] = col.b;
    }

    const partGeo = new THREE.BufferGeometry();
    partGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    partGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    // Custom circle texture for particles
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
        ctx.arc(32, 32, 28, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }
      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    const partMat = new THREE.PointsMaterial({
      size: 0.35, // Much larger and chunkier confetti pieces
      map: createCircleTexture(),
      transparent: true,
      opacity: 0.95,
      alphaTest: 0.1,
      vertexColors: true,
      depthWrite: false
    });

    const particles = new THREE.Points(partGeo, partMat);
    scene.add(particles);

    // ── Mouse Interaction Logic ────────────────────────────────────────────────────
    const mouse = new THREE.Vector2(-9999, -9999);
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    const onMouseMove = (event: MouseEvent) => {
      const rect = mountRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouse.x = ((event.clientX - rect.left) / W) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / H) * 2 + 1;
    };
    
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const domElement = mountRef.current;
    domElement.addEventListener('mousemove', onMouseMove);
    domElement.addEventListener('mouseleave', onMouseLeave);

    // ── Animation Loop ────────────────────────────────────────────────────
    let time = 0;
    const rotSpeed = 0.4;

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      time += 0.016;

      raycaster.setFromCamera(mouse, camera);
      const target = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, target);
      
      const mouseX = target.x;
      const mouseY = target.y;

      const positions = particles.geometry.attributes.position.array as Float32Array;

      // Update particle physics
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Base position with slow rotation and subtle global breathing (expansion/contraction)
        const bx = basePosArray[i3];
        const by = basePosArray[i3 + 1];
        
        const breathScale = 1.0 + Math.sin(time * 1.5 + (bx * 0.5)) * 0.08; // Organic undulating breath
        const currentBaseX = (bx * Math.cos(time * rotSpeed) - by * Math.sin(time * rotSpeed)) * breathScale;
        const currentBaseY = (bx * Math.sin(time * rotSpeed) + by * Math.cos(time * rotSpeed)) * breathScale;
        const currentBaseZ = basePosArray[i3 + 2] + Math.sin(time * 2.5 + i) * 0.2; // Pronounced breathing in Z

        let px = positions[i3];
        let py = positions[i3 + 1];
        let pz = positions[i3 + 2];
        
        let vx = velArray[i3];
        let vy = velArray[i3 + 1];
        let vz = velArray[i3 + 2];

        // 1. Spring force pulling back to rotating base ring (slightly stronger to keep formation)
        vx += (currentBaseX - px) * 0.06;
        vy += (currentBaseY - py) * 0.06;
        vz += (currentBaseZ - pz) * 0.06;

        // 1.5 Very subtle constant turbulent swarming
        vx += Math.sin(time * 3.1 + i) * 0.005;
        vy += Math.cos(time * 2.7 + i) * 0.005;
        vz += Math.sin(time * 4.3 + i) * 0.005;

        // 2. Repel force from mouse (much softer and smaller radius)
        if (mouse.x !== -9999) {
          const dx = px - mouseX;
          const dy = py - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 1.2) {
            // Repel softly when close to mouse
            const force = (1.2 - dist) * 0.04;
            vx += (dx / dist) * force;
            vy += (dy / dist) * force;
            vz += (Math.random() - 0.5) * (force * 0.5);
          }
        }

        // 3. Friction
        vx *= 0.88;
        vy *= 0.88;
        vz *= 0.88;

        velArray[i3] = vx;
        velArray[i3 + 1] = vy;
        velArray[i3 + 2] = vz;

        positions[i3] += vx;
        positions[i3 + 1] += vy;
        positions[i3 + 2] += vz;
      }
      
      particles.geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      domElement.removeEventListener('mousemove', onMouseMove);
      domElement.removeEventListener('mouseleave', onMouseLeave);
      renderer.dispose();
      partGeo.dispose();
      partMat.dispose();
      if (mountRef.current) mountRef.current.innerHTML = '';
    };
  }, [size]);

  // Use pointer-events-auto so we can actually receive mousemove events on the canvas
  return (
    <div
      ref={mountRef}
      className="flex items-center justify-center cursor-crosshair pointer-events-auto"
      style={{ width: size, height: size }}
    />
  );
};
