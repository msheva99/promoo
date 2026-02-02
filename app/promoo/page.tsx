'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Promo1001Bites() {
  const [status, setStatus] = useState<'loading' | 'success' | 'already' | 'soldout'>('loading');
  const [remaining, setRemaining] = useState<number>(20);

  useEffect(() => {
    const checkPromo = async () => {
      try {
        const res = await fetch('/api/promo');
        const data = await res.json();
        
        setRemaining(data.remaining ?? 0);

        if (data.success) {
          setStatus('success');
        } else if (data.already) {
          setStatus('already');
        } else {
          setStatus('soldout');
        }
      } catch (e) {
        setStatus('soldout');
      }
    };
    checkPromo();
  }, []);

  const BackgroundWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center p-4 font-sans text-[#1a1a1a] overflow-hidden">
      <div className="fixed inset-0 -z-10 w-full h-full">
        <Image 
          src="/images/tampilan_diskon.png" 
          alt="Background" 
          fill 
          priority 
          className="object-cover object-center" 
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="relative z-10 w-full flex justify-center scale-[0.85] xs:scale-90 sm:scale-100 transition-transform">
        {children}
      </div>
    </div>
  );

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-gray-400 font-bold text-sm">
        Memuat...
      </div>
    );
  }

  if (status === 'success' || status === 'already') {
    return (
      <BackgroundWrapper>
        <div className="w-full max-w-[310px] bg-[#FDF9F3] rounded-[2.5rem] shadow-2xl text-center p-6 border border-white/50 animate-in fade-in zoom-in duration-500">
          
          <div className="relative w-12 h-12 mx-auto mb-4">
            <Image 
              src="/images/logo_hitam.png" 
              alt="1001 Bites" 
              fill 
              className="object-contain" 
            />
          </div>

          <div className="space-y-0.5">
            <h2 className="text-[11px] font-black text-gray-900 tracking-tighter uppercase leading-none">
              SELAMAT!
            </h2>
            <h2 className="text-[11px] font-black text-gray-900 tracking-tighter uppercase">
              KAMU MENDAPATKAN
            </h2>
          </div>

          {/* SEKSI HADIAH: Teks Diperbesar & Warna Selaras Background */}
          <div className="my-3">
            <h1 className="text-2xl font-black text-[#1a2e44] leading-tight px-2 uppercase italic">
              GRATIS 1 POTONG
            </h1>
            <p className="text-[10px] font-black text-gray-900 tracking-widest uppercase">
              ARABIAN FRIED CHICKEN
            </p>
          </div>

          <p className="text-[9px] font-medium text-gray-500 italic mb-4">
            *untuk pembelian 2 paket Aladdin*
          </p>

          <div className="mb-4 text-center">
            <p className="text-[7px] font-bold text-gray-400 uppercase italic mb-1.5 tracking-wide">
              Klik tag lokasi untuk menemukan outlet
            </p>
            <a 
              href="https://maps.app.goo.gl/HhWsS3Kwwvbn5dib7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-orange-100 bg-white rounded-xl px-3 py-2 w-full shadow-sm hover:bg-orange-50 active:scale-95 transition-all text-left"
            >
              <span className="text-orange-500 text-base">📍</span>
              <div>
                <p className="text-[10px] font-black text-gray-800 leading-none">Jl. Dr. Ramelan, Kudus</p>
                <p className="text-[8px] text-gray-400 font-medium">Kec. Kota Kudus, Kab. Kudus (CFD - Belakang BCA)</p>
              </div>
            </a>
          </div>

          {/* SISA KUOTA: Background & Warna Sejurusan dengan Tema Biru Tua */}
          <div className="bg-[#f0f4f8] rounded-[1.5rem] py-3 mb-4 border border-[#1a2e44]/10 shadow-inner">
            <div className="flex justify-center items-baseline gap-1.5">
              <span className="text-4xl font-black text-[#1a2e44] tracking-tighter tabular-nums">
                {String(remaining).padStart(2, '0')}
              </span>
              <span className="text-xs font-black text-[#1a2e44]">ORANG LAGI</span>
            </div>
            <p className="text-[8px] font-bold text-[#1a2e44]/60 uppercase tracking-[0.1em] mt-0.5">
              Sisa Promo
            </p>
          </div>

          {/* TOMBOL KASIR: Gradasi Biru Tua Gelap Mengikuti Background Halaman */}
          <div className="bg-gradient-to-r from-[#1a2e44] to-[#0f1a27] rounded-[1.2rem] p-4 text-white shadow-lg active:scale-95 transition-transform">
            <p className="font-bold text-[11px] leading-tight">
              Tunjukkan halaman ini ke kasir dan nikmati promonya sekarang!
            </p>
            <div className="mt-2 flex items-center justify-center gap-1.5 opacity-90 border-t border-white/20 pt-1.5 text-[8px] font-black uppercase tracking-widest animate-pulse">
              <span>📸</span> JANGAN LUPA SCREENSHOT
            </div>
          </div>

          <p className="mt-4 text-[8px] text-gray-400 font-medium italic">
            *Hanya untuk 20 orang pertama
          </p>
          
          {status === 'already' && (
             <div className="mt-2 inline-block px-3 py-0.5 bg-green-50 text-green-600 text-[8px] font-bold rounded-full border border-green-100">
               ✓ Sudah Kamu Klaim
             </div>
          )}
        </div>
      </BackgroundWrapper>
    );
  }

  return (
    <BackgroundWrapper>
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl max-w-[280px] w-full text-center border border-gray-100 animate-in fade-in">
        <div className="relative w-10 h-10 mx-auto mb-3 grayscale opacity-40">
           <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
        </div>
        <h1 className="text-base font-black text-gray-900 uppercase">Yah, Habis!</h1>
        <p className="text-gray-500 text-[10px] mt-1.5 leading-relaxed px-2">
          Kuota sudah penuh. Pantau terus Instagram kami untuk promo selanjutnya!
        </p>
      </div>
    </BackgroundWrapper>
  );
}