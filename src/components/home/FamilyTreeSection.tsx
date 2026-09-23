'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import XtremeLogo from '@/components/ui/XtremeLogo';

interface EcosystemNode {
  id: string;
  name: string;
  category: string;
  type: 'hub' | 'tier1' | 'tier2';
  color: string;
  cx: number;
  cy: number;
  r: number;
  slug?: string;
  description: string;
}

export default function FamilyTreeSection() {
  const { t } = useLanguage();
  const [selectedNode, setSelectedNode] = useState<string>('xtreme');

  // Network Nodes for Desktop/Tablet Visualization (Coordinates in 1000 x 600 canvas)
  const nodes: EcosystemNode[] = [
    // Central Hub
    {
      id: 'xtreme',
      name: 'XTREME',
      category: 'Spanish Technology Core',
      type: 'hub',
      color: '#C62828',
      cx: 500,
      cy: 300,
      r: 64,
      description: 'Advanced European construction chemical core formulating adhesives, grouts, and technical mortars.'
    },

    // Tier 1 Primary Divisions
    {
      id: 'fibergel',
      name: 'FiberGel',
      category: 'Gel Technology',
      type: 'tier1',
      color: '#050A5C',
      cx: 260,
      cy: 160,
      r: 46,
      slug: 'fibergel-s2',
      description: 'Structural microfiber-reinforced gel adhesives for zero-slump and high transfer wetting.'
    },
    {
      id: 'xtracol',
      name: 'XtraCol',
      category: 'Adhesive Series',
      type: 'tier1',
      color: '#C62828',
      cx: 740,
      cy: 160,
      r: 46,
      slug: 'xtracol-c1te',
      description: 'Standard and improved polymer adhesives for ceramic and porcelain installations.'
    },
    {
      id: 'supercol',
      name: 'SuperCol',
      category: 'Heavy Duty Range',
      type: 'tier1',
      color: '#F4511E',
      cx: 500,
      cy: 100,
      r: 46,
      slug: 'supercol-c2tes2',
      description: 'High-deformability Class S1 & S2 adhesives for swimming pools and facades.'
    },
    {
      id: 'cemair',
      name: 'CemAir',
      category: 'Thermal Masonry',
      type: 'tier1',
      color: '#374151',
      cx: 240,
      cy: 420,
      r: 44,
      slug: 'cemair',
      description: 'Micro-air entraining lightweight mortars for aerated concrete blocks and masonry.'
    },
    {
      id: 'grout',
      name: 'FlexiGrout',
      category: 'Waterproof Joints',
      type: 'tier1',
      color: '#B71C1C',
      cx: 760,
      cy: 420,
      r: 44,
      slug: 'flexigrout',
      description: 'Hydro-Shield mold-resistant cementitious jointing material from 1mm to 15mm.'
    },
    {
      id: 'repairs',
      name: 'R4 Repairs',
      category: 'Structural Restoration',
      type: 'tier1',
      color: '#050A5C',
      cx: 500,
      cy: 500,
      r: 44,
      slug: 'repairs',
      description: 'Fiber-reinforced thixotropic mortar for structural concrete restoration.'
    },

    // Tier 2 Child Nodes
    {
      id: 's2',
      name: 'S2 Extra White',
      category: 'FiberGel Sub-Line',
      type: 'tier2',
      color: '#050A5C',
      cx: 120,
      cy: 110,
      r: 32,
      slug: 'fibergel-s2',
      description: 'Class S2 super-deformable gel adhesive for XXL format porcelain panels.'
    },
    {
      id: 's1',
      name: 'S1 White',
      category: 'FiberGel Sub-Line',
      type: 'tier2',
      color: '#C62828',
      cx: 140,
      cy: 240,
      r: 30,
      slug: 'fibergel-s1',
      description: 'Class S1 microfiber geopolymer gel adhesive for walls and floors.'
    },
    {
      id: 'c2te',
      name: 'C2TE Improved',
      category: 'XtraCol Sub-Line',
      type: 'tier2',
      color: '#050A5C',
      cx: 870,
      cy: 110,
      r: 32,
      slug: 'xtracol-c2te',
      description: 'Improved cementitious adhesive with slip resistance and extended open time.'
    },
    {
      id: 'c1te',
      name: 'C1TE Standard',
      category: 'XtraCol Sub-Line',
      type: 'tier2',
      color: '#C62828',
      cx: 860,
      cy: 240,
      r: 30,
      slug: 'xtracol-c1te',
      description: 'Standard ceramic adhesive with reduced slip and extended open time.'
    },
    {
      id: 'piscinas',
      name: 'Piscinas',
      category: 'SuperCol Sub-Line',
      type: 'tier2',
      color: '#F4511E',
      cx: 640,
      cy: 60,
      r: 30,
      slug: 'supercol-piscinas',
      description: 'Specialized waterproof adhesive for continuous underwater immersion.'
    },
    {
      id: 'c2tes2',
      name: 'C2TES2 Deformable',
      category: 'SuperCol Sub-Line',
      type: 'tier2',
      color: '#080B63',
      cx: 360,
      cy: 60,
      r: 30,
      slug: 'supercol-c2tes2',
      description: 'Highly deformable elastic adhesive for extreme dynamic movements.'
    }
  ];

  // Connecting Lines
  const connections = [
    { from: 'xtreme', to: 'fibergel' },
    { from: 'xtreme', to: 'xtracol' },
    { from: 'xtreme', to: 'supercol' },
    { from: 'xtreme', to: 'cemair' },
    { from: 'xtreme', to: 'grout' },
    { from: 'xtreme', to: 'repairs' },
    { from: 'fibergel', to: 's1' },
    { from: 'fibergel', to: 's2' },
    { from: 'xtracol', to: 'c1te' },
    { from: 'xtracol', to: 'c2te' },
    { from: 'supercol', to: 'piscinas' },
    { from: 'supercol', to: 'c2tes2' }
  ];

  const activeNodeData = nodes.find((n) => n.id === selectedNode) || nodes[0];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="corporate-container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[#C62828] text-xs sm:text-sm font-extrabold uppercase tracking-widest block mb-2">
            Integrated Product Ecosystem
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#050A5C] tracking-tight mb-4">
            {t('familyTitle')}
          </h2>
          <div className="w-16 h-1 bg-[#C62828] mx-auto mb-4" />
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {t('familySubtitle')}
          </p>
        </div>

        {/* Selected Node Details Bar */}
        <div className="max-w-xl mx-auto mb-8 bg-gray-50 border-2 border-red-100 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm transition-all">
          <div className="text-center sm:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C62828] block">
              {activeNodeData.category}
            </span>
            <h4 className="text-lg sm:text-xl font-extrabold text-[#050A5C]">
              {activeNodeData.name}
            </h4>
            <p className="text-xs text-gray-600 mt-1 max-w-md">
              {activeNodeData.description}
            </p>
          </div>
          {activeNodeData.slug && (
            <Link
              href={`/products/${activeNodeData.slug}`}
              className="flex-shrink-0 bg-[#050A5C] hover:bg-[#C62828] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors uppercase tracking-wider"
            >
              View Product
            </Link>
          )}
        </div>

        {/* Desktop / Tablet: Interactive SVG Network Diagram */}
        <div className="hidden md:block relative w-full h-[540px] bg-gradient-to-b from-gray-50/70 to-white rounded-2xl border border-gray-200 shadow-inner overflow-hidden select-none">
          {/* Subtle Grid Lines */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #050A5C 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
          />

          <svg
            viewBox="0 0 1000 600"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Connecting Lines */}
            {connections.map((conn, index) => {
              const fromNode = nodes.find((n) => n.id === conn.from);
              const toNode = nodes.find((n) => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              const isConnectedToSelected =
                conn.from === selectedNode || conn.to === selectedNode;

              return (
                <line
                  key={`line-${index}`}
                  x1={fromNode.cx}
                  y1={fromNode.cy}
                  x2={toNode.cx}
                  y2={toNode.cy}
                  stroke={isConnectedToSelected ? '#C62828' : '#CBD5E1'}
                  strokeWidth={isConnectedToSelected ? '3.5' : '1.8'}
                  strokeDasharray={isConnectedToSelected ? 'none' : '4,4'}
                  className="transition-all duration-300"
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const isSelected = selectedNode === node.id;
              const isHub = node.type === 'hub';

              return (
                <g
                  key={node.id}
                  onClick={() => setSelectedNode(node.id)}
                  className="cursor-pointer group"
                >
                  {/* Outer Pulsing Aura for Hub or Selected */}
                  {(isHub || isSelected) && (
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r={node.r + (isSelected ? 10 : 6)}
                      fill={node.color}
                      opacity={isSelected ? '0.25' : '0.15'}
                      className="animate-pulse"
                    />
                  )}

                  {/* Main Node Circle */}
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r={node.r}
                    fill={node.color}
                    stroke="#FFFFFF"
                    strokeWidth={isSelected ? '4' : '3'}
                    className="transition-transform duration-300 shadow-xl filter drop-shadow-md"
                  />

                  {/* Node Label */}
                  {isHub ? (
                    <text
                      x={node.cx}
                      y={node.cy + 6}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="18"
                      fontWeight="900"
                      letterSpacing="0.05em"
                    >
                      XTREME
                    </text>
                  ) : (
                    <>
                      <text
                        x={node.cx}
                        y={node.cy + (node.type === 'tier1' ? 4 : 3)}
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize={node.type === 'tier1' ? '12' : '9'}
                        fontWeight="800"
                      >
                        {node.name.split(' ')[0]}
                      </text>
                      {node.name.split(' ').length > 1 && (
                        <text
                          x={node.cx}
                          y={node.cy + 15}
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="8"
                          fontWeight="600"
                          opacity="0.9"
                        >
                          {node.name.split(' ').slice(1).join(' ')}
                        </text>
                      )}
                    </>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Mobile: Structured Hierarchical Network Cards */}
        <div className="md:hidden space-y-4">
          <div className="p-4 bg-[#C62828] text-white rounded-xl text-center shadow-lg">
            <XtremeLogo variant="white" size="md" />
            <p className="text-xs text-red-100 mt-2">
              Central Spanish Formulation Ecosystem
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {nodes.filter(n => n.type !== 'hub').map((node) => {
              const isSelected = selectedNode === node.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedNode(node.id)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'bg-[#050A5C] text-white border-[#050A5C] shadow-md'
                      : 'bg-white text-gray-800 border-gray-200 hover:border-red-300'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block mr-1.5"
                    style={{ backgroundColor: node.color }}
                  />
                  <div className="font-extrabold text-sm">{node.name}</div>
                  <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                    {node.category}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
