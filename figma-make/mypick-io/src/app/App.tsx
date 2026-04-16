import { useState } from 'react';
import img01Hero1 from "figma:asset/538772496cba0838f2d3aee10160149ad887fe4a.png";
import img02Context1 from "figma:asset/c53592098263eca879497e54a5ccc69b8e1443d8.png";
import img03HowItWorks1 from "figma:asset/c98b0c9ff5fcb0a1d096c0a1897cf78c64d353bd.png";
import img04UiShowcase1 from "figma:asset/ebf3ae5dc3c58fd2186c47812f405fc1e3b8bde0.png";
import img05VisualDirection1 from "figma:asset/a4d75810a16cd1c71a2c0dcbc5aa4865a7b4bc51.png";
import img06Features1 from "figma:asset/a30dc1fea4a15d32049684d07ba514b6649da8bd.png";
import img07CtaFooter1 from "figma:asset/068a38baca1445f83d9c373c5e90180172fac104.png";

function HTMLVersion() {
  return (
    <div className="bg-[#0a0f0d] w-full text-white font-sans antialiased">
      {/* Hero Section - 01 */}
      <section className="w-full min-h-[768px] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1e16] via-[#0a0f0d] to-[#0a0f0d]"></div>
        <div className="relative w-full max-w-[1440px] mx-auto h-full flex flex-col items-center justify-center px-8 md:px-6 sm:px-4 py-20">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl lg:text-[72px] font-black tracking-tight mb-4">
              <span className="bg-gradient-to-r from-[#00ff88] via-[#00dd77] to-[#00ff88] bg-clip-text text-transparent">
                MyPick.io
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-[18px] text-[#88ffc4] leading-relaxed max-w-[800px] mx-auto px-4">
              Make strategic choices and make your predictions at each moment of the competition.<br className="hidden sm:block" />
              Watch them race in real-time. Better picks equal better results.
            </p>
          </div>

          {/* Race Visualization */}
          <div className="w-full max-w-[900px] bg-[#0d1612]/60 backdrop-blur-sm border-2 border-[#00ff88]/20 rounded-3xl p-6 md:p-8 lg:p-12 mb-10">
            <div className="relative h-[180px] md:h-[220px] lg:h-[240px] bg-gradient-to-r from-[#00ff88]/5 via-transparent to-[#00ff88]/5 rounded-2xl overflow-hidden">
              {/* Race track lines */}
              <div className="absolute inset-0 flex flex-col justify-around py-6">
                <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent"></div>
                <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent"></div>
                <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent"></div>
              </div>
              {/* Center text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl md:text-8xl lg:text-[96px] font-black text-[#00ff88]/10 tracking-wider">RACE</div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 lg:gap-8 w-full max-w-[800px] justify-center">
            <div className="flex-1 bg-[#0d1612]/60 backdrop-blur-sm border border-[#00ff88]/20 rounded-2xl p-6 md:p-8 text-center">
              <div className="text-4xl md:text-5xl lg:text-[56px] font-black text-[#00ff88] leading-none mb-3">4</div>
              <div className="text-xs md:text-[13px] text-[#88ffc4] uppercase tracking-[2px] font-semibold">Racers</div>
            </div>
            <div className="flex-1 bg-[#0d1612]/60 backdrop-blur-sm border border-[#00ff88]/20 rounded-2xl p-6 md:p-8 text-center">
              <div className="text-4xl md:text-5xl lg:text-[56px] font-black text-[#00ff88] leading-none mb-3">3</div>
              <div className="text-xs md:text-[13px] text-[#88ffc4] uppercase tracking-[2px] font-semibold">Picks</div>
            </div>
            <div className="flex-1 bg-[#0d1612]/60 backdrop-blur-sm border border-[#00ff88]/20 rounded-2xl p-6 md:p-8 text-center">
              <div className="text-4xl md:text-5xl lg:text-[56px] font-black text-[#00ff88] leading-none mb-3">Live</div>
              <div className="text-xs md:text-[13px] text-[#88ffc4] uppercase tracking-[2px] font-semibold">Real-time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Context Section - 02 */}
      <section className="w-full min-h-[768px] relative overflow-hidden bg-gradient-to-b from-[#0a0f0d] to-[#0d1612]">
        <div className="w-full max-w-[1440px] mx-auto h-full flex flex-col justify-center px-8 md:px-6 sm:px-4 py-20">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-[8px] h-[8px] bg-[#00ff88] rounded-full"></div>
              <span className="text-[11px] md:text-[12px] text-[#00ff88] uppercase tracking-[3px] font-bold">The Problem</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[64px] font-black leading-[1.1] mb-6 md:mb-8 tracking-tight">
              THE PROBLEM WITH<br />RANDOMIZERS
            </h2>
            <p className="text-base md:text-lg lg:text-[20px] text-[#88ffc4] leading-[1.7] max-w-[900px]">
              Every great decision has a clear concept element from start to finish. After a<br className="hidden lg:block" />
              random person, I saw an opportunity to create a pick-and-race system that adds a<br className="hidden lg:block" />
              layer of tension. Instantly watchable. Massively addictive.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-[#0d1612]/80 border border-[#00ff88]/15 rounded-2xl p-6 md:p-8 lg:p-10 hover:border-[#00ff88]/40 hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-2xl md:text-[28px] font-bold text-[#00ff88] mb-3 md:mb-4">UX</h3>
              <p className="text-sm md:text-[16px] text-[#b0e0c8] leading-relaxed">Decision-based engagement</p>
            </div>
            <div className="bg-[#0d1612]/80 border border-[#00ff88]/15 rounded-2xl p-6 md:p-8 lg:p-10 hover:border-[#00ff88]/40 hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-2xl md:text-[28px] font-bold text-[#00ff88] mb-3 md:mb-4">Web</h3>
              <p className="text-sm md:text-[16px] text-[#b0e0c8] leading-relaxed">Client-Focused Design + Engineering</p>
            </div>
            <div className="bg-[#0d1612]/80 border border-[#00ff88]/15 rounded-2xl p-6 md:p-8 lg:p-10 hover:border-[#00ff88]/40 hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-2xl md:text-[28px] font-bold text-[#00ff88] mb-3 md:mb-4">WebSocket</h3>
              <p className="text-sm md:text-[16px] text-[#b0e0c8] leading-relaxed">Real-time: Not Ajax-Load</p>
            </div>
            <div className="bg-[#0d1612]/80 border border-[#00ff88]/15 rounded-2xl p-6 md:p-8 lg:p-10 hover:border-[#00ff88]/40 hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-2xl md:text-[28px] font-bold text-[#00ff88] mb-3 md:mb-4">Tech</h3>
              <p className="text-sm md:text-[16px] text-[#b0e0c8] leading-relaxed">HTML/CSS/JS</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - 03 */}
      <section className="w-full min-h-[768px] relative overflow-hidden bg-[#0d1612]">
        <div className="w-full max-w-[1440px] mx-auto h-full flex flex-col justify-center px-8 md:px-6 sm:px-4 py-20">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-[8px] h-[8px] bg-[#00ff88] rounded-full"></div>
              <span className="text-[11px] md:text-[12px] text-[#00ff88] uppercase tracking-[3px] font-bold">How It Works</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[64px] font-black leading-[1.1] tracking-tight">THE RACE MECHANIC</h2>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            <div className="bg-[#0a0f0d]/60 border-2 border-[#00ff88]/25 rounded-3xl p-8 md:p-10 lg:p-12 hover:border-[#00ff88]/60 hover:shadow-[0_0_40px_rgba(0,255,136,0.15)] transition-all duration-300">
              <div className="text-7xl md:text-8xl lg:text-[120px] font-black text-[#00ff88]/15 leading-none mb-6 md:mb-8">01</div>
              <h3 className="text-2xl md:text-3xl lg:text-[32px] font-bold mb-4 md:mb-5 tracking-tight">Add Your Picks</h3>
              <p className="text-base md:text-lg lg:text-[18px] text-[#b0e0c8] leading-relaxed">
                Choose your racers strategically. Each pick matters and influences the outcome.
              </p>
            </div>
            <div className="bg-[#0a0f0d]/60 border-2 border-[#00ff88]/25 rounded-3xl p-8 md:p-10 lg:p-12 hover:border-[#00ff88]/60 hover:shadow-[0_0_40px_rgba(0,255,136,0.15)] transition-all duration-300">
              <div className="text-7xl md:text-8xl lg:text-[120px] font-black text-[#00ff88]/15 leading-none mb-6 md:mb-8">02</div>
              <h3 className="text-2xl md:text-3xl lg:text-[32px] font-bold mb-4 md:mb-5 tracking-tight">Start the Race</h3>
              <p className="text-base md:text-lg lg:text-[18px] text-[#b0e0c8] leading-relaxed">
                Launch the competition and watch as your picks compete in real-time.
              </p>
            </div>
            <div className="bg-[#0a0f0d]/60 border-2 border-[#00ff88]/25 rounded-3xl p-8 md:p-10 lg:p-12 hover:border-[#00ff88]/60 hover:shadow-[0_0_40px_rgba(0,255,136,0.15)] transition-all duration-300">
              <div className="text-7xl md:text-8xl lg:text-[120px] font-black text-[#00ff88]/15 leading-none mb-6 md:mb-8">03</div>
              <h3 className="text-2xl md:text-3xl lg:text-[32px] font-bold mb-4 md:mb-5 tracking-tight">Winner Revealed</h3>
              <p className="text-base md:text-lg lg:text-[18px] text-[#b0e0c8] leading-relaxed">
                See the results unfold. Your strategic picks and careful analysis pay off.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section - 04 */}
      <section className="w-full min-h-[768px] relative overflow-hidden bg-gradient-to-b from-[#0d1612] to-[#0a0f0d]">
        <div className="w-full max-w-[1440px] mx-auto h-full flex flex-col justify-center px-8 md:px-6 sm:px-4 py-20">
          {/* Header */}
          <div className="mb-10 md:mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-[8px] h-[8px] bg-[#00ff88] rounded-full"></div>
              <span className="text-[11px] md:text-[12px] text-[#00ff88] uppercase tracking-[3px] font-bold">The Product</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[64px] font-black leading-[1.1] tracking-tight">THE PRODUCT</h2>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-[#0d1612]/60 border border-[#00ff88]/15 rounded-2xl overflow-hidden hover:border-[#00ff88]/40 hover:scale-[1.02] transition-all duration-300">
              <div className="h-[200px] md:h-[240px] lg:h-[280px] bg-gradient-to-br from-[#00ff88]/8 via-[#00ff88]/3 to-transparent relative flex items-center justify-center">
                <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-[#00ff88] text-[#0a0f0d] px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-[13px] font-black uppercase tracking-wider">
                  Desktop
                </div>
                <div className="text-3xl md:text-4xl lg:text-[48px] font-black text-[#00ff88]/10">Desktop UI</div>
              </div>
            </div>
            <div className="bg-[#0d1612]/60 border border-[#00ff88]/15 rounded-2xl overflow-hidden hover:border-[#00ff88]/40 hover:scale-[1.02] transition-all duration-300">
              <div className="h-[200px] md:h-[240px] lg:h-[280px] bg-gradient-to-br from-[#00ff88]/8 via-[#00ff88]/3 to-transparent relative flex items-center justify-center">
                <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-[#00ff88] text-[#0a0f0d] px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-[13px] font-black uppercase tracking-wider">
                  Mobile
                </div>
                <div className="text-3xl md:text-4xl lg:text-[48px] font-black text-[#00ff88]/10">Mobile UI</div>
              </div>
            </div>
            <div className="bg-[#0d1612]/60 border border-[#00ff88]/15 rounded-2xl overflow-hidden hover:border-[#00ff88]/40 hover:scale-[1.02] transition-all duration-300">
              <div className="h-[200px] md:h-[240px] lg:h-[280px] bg-gradient-to-br from-[#00ff88]/8 via-[#00ff88]/3 to-transparent relative flex items-center justify-center">
                <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-[#00ff88] text-[#0a0f0d] px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-[13px] font-black uppercase tracking-wider">
                  Interface
                </div>
                <div className="text-3xl md:text-4xl lg:text-[48px] font-black text-[#00ff88]/10">Interface</div>
              </div>
            </div>
            <div className="bg-[#0d1612]/60 border border-[#00ff88]/15 rounded-2xl overflow-hidden hover:border-[#00ff88]/40 hover:scale-[1.02] transition-all duration-300">
              <div className="h-[200px] md:h-[240px] lg:h-[280px] bg-gradient-to-br from-[#00ff88]/8 via-[#00ff88]/3 to-transparent relative flex items-center justify-center">
                <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-[#00ff88] text-[#0a0f0d] px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-[13px] font-black uppercase tracking-wider">
                  Racing
                </div>
                <div className="text-3xl md:text-4xl lg:text-[48px] font-black text-[#00ff88]/10">Racing</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Direction Section - 05 */}
      <section className="w-full min-h-[768px] relative overflow-hidden bg-[#0a0f0d]">
        <div className="w-full max-w-[1440px] mx-auto h-full flex flex-col justify-center px-8 md:px-6 sm:px-4 py-20">
          {/* Header */}
          <div className="mb-10 md:mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-[8px] h-[8px] bg-[#00ff88] rounded-full"></div>
              <span className="text-[11px] md:text-[12px] text-[#00ff88] uppercase tracking-[3px] font-bold">Visual Direction</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[64px] font-black leading-[1.1] mb-6 md:mb-8 tracking-tight">WHAT I SHIPPED</h2>
            <p className="text-base md:text-lg lg:text-[20px] text-[#88ffc4] leading-[1.7] max-w-[900px]">
              I shipped an advanced live tracking implementation that allows for dynamic, real-time interaction. Built a custom data synchronization system for seamless live updates.
            </p>
          </div>

          {/* Visual Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-[#0d1612]/60 border border-[#00ff88]/15 rounded-2xl p-6 md:p-8 lg:p-10">
              <h3 className="text-xs md:text-[14px] text-[#00ff88] uppercase tracking-[2px] font-bold mb-6 md:mb-8">Component Style</h3>
              <div className="h-[200px] md:h-[240px] lg:h-[280px] bg-gradient-to-br from-[#00ff88]/5 to-transparent border border-[#00ff88]/10 rounded-xl"></div>
            </div>
            <div className="bg-[#0d1612]/60 border border-[#00ff88]/15 rounded-2xl p-6 md:p-8 lg:p-10">
              <h3 className="text-xs md:text-[14px] text-[#00ff88] uppercase tracking-[2px] font-bold mb-6 md:mb-8">Interactive Table</h3>
              <div className="h-[200px] md:h-[240px] lg:h-[280px] bg-gradient-to-br from-[#00ff88]/5 to-transparent border border-[#00ff88]/10 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - 06 */}
      <section className="w-full min-h-[768px] relative overflow-hidden bg-gradient-to-b from-[#0a0f0d] to-[#0d1612]">
        <div className="w-full max-w-[1440px] mx-auto h-full flex flex-col justify-center px-8 md:px-6 sm:px-4 py-20">
          {/* Header */}
          <div className="mb-10 md:mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-[8px] h-[8px] bg-[#00ff88] rounded-full"></div>
              <span className="text-[11px] md:text-[12px] text-[#00ff88] uppercase tracking-[3px] font-bold">Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[64px] font-black leading-[1.1] tracking-tight">WHAT I BUILT</h2>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-[#0d1612]/60 border border-[#00ff88]/15 rounded-2xl p-6 md:p-8 lg:p-10 hover:border-[#00ff88]/40 hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 lg:w-[72px] lg:h-[72px] bg-[#00ff88]/10 rounded-2xl flex items-center justify-center mb-6 md:mb-8 text-2xl md:text-3xl lg:text-[36px]">
                🎯
              </div>
              <h3 className="text-xl md:text-2xl lg:text-[24px] font-bold mb-3 md:mb-4">21 Speed Effects</h3>
              <p className="text-sm md:text-[15px] text-[#b0e0c8] leading-relaxed">
                Multiple speed variations to create dynamic racing experiences.
              </p>
            </div>
            <div className="bg-[#0d1612]/60 border border-[#00ff88]/15 rounded-2xl p-6 md:p-8 lg:p-10 hover:border-[#00ff88]/40 hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 lg:w-[72px] lg:h-[72px] bg-[#00ff88]/10 rounded-2xl flex items-center justify-center mb-6 md:mb-8 text-2xl md:text-3xl lg:text-[36px]">
                ⚡
              </div>
              <h3 className="text-xl md:text-2xl lg:text-[24px] font-bold mb-3 md:mb-4">Zero Dependencies</h3>
              <p className="text-sm md:text-[15px] text-[#b0e0c8] leading-relaxed">
                Pure vanilla JavaScript implementation for maximum performance.
              </p>
            </div>
            <div className="bg-[#0d1612]/60 border border-[#00ff88]/15 rounded-2xl p-6 md:p-8 lg:p-10 hover:border-[#00ff88]/40 hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 lg:w-[72px] lg:h-[72px] bg-[#00ff88]/10 rounded-2xl flex items-center justify-center mb-6 md:mb-8 text-2xl md:text-3xl lg:text-[36px]">
                🎨
              </div>
              <h3 className="text-xl md:text-2xl lg:text-[24px] font-bold mb-3 md:mb-4">5 Car Styles</h3>
              <p className="text-sm md:text-[15px] text-[#b0e0c8] leading-relaxed">
                Customizable racer designs to match your brand aesthetic.
              </p>
            </div>
            <div className="bg-[#0d1612]/60 border border-[#00ff88]/15 rounded-2xl p-6 md:p-8 lg:p-10 hover:border-[#00ff88]/40 hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 md:w-16 md:h-16 lg:w-[72px] lg:h-[72px] bg-[#00ff88]/10 rounded-2xl flex items-center justify-center mb-6 md:mb-8 text-2xl md:text-3xl lg:text-[36px]">
                📊
              </div>
              <h3 className="text-xl md:text-2xl lg:text-[24px] font-bold mb-3 md:mb-4">Cryptic Scores</h3>
              <p className="text-sm md:text-[15px] text-[#b0e0c8] leading-relaxed">
                Advanced scoring system with real-time calculations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA & Footer Section - 07 */}
      <section className="w-full min-h-[768px] relative overflow-hidden bg-gradient-to-br from-[#0a1410] via-[#0d1612] to-[#1a2820]">
        <div className="w-full max-w-[1440px] mx-auto h-full flex flex-col items-center justify-center px-8 md:px-6 sm:px-4 py-20">
          <div className="text-center max-w-[900px]">
            <h2 className="text-5xl md:text-6xl lg:text-[80px] font-black mb-6 md:mb-8 tracking-tight">Try it yourself</h2>
            <p className="text-lg md:text-xl lg:text-[24px] text-[#88ffc4] mb-10 md:mb-14 leading-relaxed">
              Experience the thrill of strategic picks and start a race.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
              <button className="bg-[#00ff88] text-[#0a0f0d] px-10 py-5 md:px-12 md:py-6 lg:px-14 rounded-2xl text-lg md:text-xl lg:text-[20px] font-black hover:bg-[#00dd77] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,255,136,0.3)] transition-all duration-300">
                Start Racing
              </button>
              <button className="border-2 border-[#00ff88] text-[#00ff88] px-10 py-5 md:px-12 md:py-6 lg:px-14 rounded-2xl text-lg md:text-xl lg:text-[20px] font-black hover:bg-[#00ff88]/10 hover:-translate-y-1 transition-all duration-300">
                View on GitHub
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-8 md:bottom-12 left-0 right-0 text-center px-8 md:px-6 sm:px-4">
            <div className="w-full h-[1px] bg-[#00ff88]/15 mb-6 md:mb-8 max-w-[1200px] mx-auto"></div>
            <p className="text-xs md:text-[14px] text-[#88ffc4]/60">© 2026 MyPick.io. All rights reserved.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function OriginalDesigns() {
  return (
    <div className="bg-[#0a0f0d] w-full">
      <div className="max-w-[1376px] mx-auto">
        <section className="w-full">
          <img src={img01Hero1} alt="01 Hero" className="w-full h-auto block" />
        </section>
        <section className="w-full">
          <img src={img02Context1} alt="02 Context" className="w-full h-auto block" />
        </section>
        <section className="w-full">
          <img src={img03HowItWorks1} alt="03 How It Works" className="w-full h-auto block" />
        </section>
        <section className="w-full">
          <img src={img04UiShowcase1} alt="04 UI Showcase" className="w-full h-auto block" />
        </section>
        <section className="w-full">
          <img src={img05VisualDirection1} alt="05 Visual Direction" className="w-full h-auto block" />
        </section>
        <section className="w-full">
          <img src={img06Features1} alt="06 Features" className="w-full h-auto block" />
        </section>
        <section className="w-full">
          <img src={img07CtaFooter1} alt="07 CTA Footer" className="w-full h-auto block" />
        </section>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<'original' | 'html'>('html');

  return (
    <div className="min-h-screen bg-[#0a0f0d]">
      {/* Toggle Controls */}
      <div className="fixed top-6 right-6 z-50 flex gap-3 bg-[#1a2820] border border-[#00ff88]/30 rounded-lg p-2 shadow-xl">
        <button
          onClick={() => setView('html')}
          className={`px-6 py-3 rounded-md font-semibold transition-all ${
            view === 'html'
              ? 'bg-[#00ff88] text-[#0a0f0d]'
              : 'text-[#00ff88] hover:bg-[#00ff88]/10'
          }`}
        >
          HTML Version
        </button>
        <button
          onClick={() => setView('original')}
          className={`px-6 py-3 rounded-md font-semibold transition-all ${
            view === 'original'
              ? 'bg-[#00ff88] text-[#0a0f0d]'
              : 'text-[#00ff88] hover:bg-[#00ff88]/10'
          }`}
        >
          Original Design
        </button>
      </div>

      {/* Content */}
      {view === 'html' ? <HTMLVersion /> : <OriginalDesigns />}
    </div>
  );
}