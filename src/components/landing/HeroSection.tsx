// ============================================================
// CrimeNet AI — Hero Section
// ============================================================
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Play } from 'lucide-react';
import { animateValue } from '@/lib/utils';

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [casesCount, setCasesCount] = useState(0);
  const [networksCount, setNetworksCount] = useState(0);
  const [entitiesCount, setEntitiesCount] = useState(0);

  useEffect(() => {
    animateValue(0, 15847, 2500, setCasesCount);
    animateValue(0, 2341, 2500, setNetworksCount);
    animateValue(0, 89420, 2500, setEntitiesCount);
  }, []);

  // Network animation on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const nodes: { x: number; y: number; vx: number; vy: number; r: number; color: string }[] = [];
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const colors = ['#38bdf8', '#a78bfa', '#22d3ee', '#ec4899', '#f59e0b'];

    for (let i = 0; i < 60; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // Update positions
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
      });

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = 0.6;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r + 3, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.globalAlpha = 0.1;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated network background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/40 to-navy-900" />
      <div className="absolute inset-0 bg-mesh" />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyber-blue/20 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-sm text-slate-300">Powered by Advanced AI &amp; Graph Analytics</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
        >
          <span className="text-white">AI-Powered</span>
          <br />
          <span className="gradient-text">Criminal Intelligence</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
        >
          Transform raw intelligence into actionable insights with interactive knowledge graphs,
          AI entity extraction, network analysis, and real-time investigation tools.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/auth/login"
            className="group flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyber-blue-dim to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyber-blue/30 transition-all duration-300 hover:scale-105"
          >
            <Shield size={18} />
            Access Platform
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="flex items-center gap-2 px-8 py-3.5 glass text-slate-200 font-medium rounded-xl hover:bg-white/10 transition-all border border-white/10 hover:border-white/20">
            <Play size={16} className="text-cyber-blue" />
            Watch Demo
          </button>
        </motion.div>

        {/* Floating Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-3 gap-6 max-w-2xl mx-auto"
        >
          {[
            { label: 'Cases Analyzed', value: casesCount },
            { label: 'Networks Mapped', value: networksCount },
            { label: 'Entities Tracked', value: entitiesCount },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-white tabular-nums">
                {stat.value.toLocaleString()}
              </p>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-cyber-blue"
          />
        </div>
      </motion.div>
    </section>
  );
}
