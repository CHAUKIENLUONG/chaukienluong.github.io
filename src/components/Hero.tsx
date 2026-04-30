import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import avatarPortrait from '../assets/img/avatar.png';
import cvFile from '../assets/CV_CHAU-KIEN-LUONG_FullStack-Developer.pdf';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const { t } = useTranslation();
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const heroLeft = container.current?.querySelector('.order-2');
    const heroRight = container.current?.querySelector('.order-1');
    if (heroLeft) {
      gsap.fromTo(heroLeft, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' });
    }
    if (heroRight) {
      gsap.fromTo(heroRight, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' });
    }
  }, { scope: container });

  return (
    <div ref={container}>
      <section className="relative min-h-screen overflow-hidden px-6 pt-24 md:px-20 lg:px-32" id="home">
        <div className="pointer-events-none absolute inset-x-0 top-16 h-[32rem] bg-[radial-gradient(circle_at_72%_35%,rgba(0,242,255,0.2),transparent_24%),radial-gradient(circle_at_78%_55%,rgba(255,255,255,0.08),transparent_20%),radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.02),transparent_60%)]" />
        <div className="relative flex min-h-[calc(100vh-6rem)] items-center">
          <div className="asymmetric-grid w-full items-center gap-y-14 lg:gap-0">
            <div
              className="order-2 col-span-12 flex flex-col justify-center lg:order-1 lg:col-span-6"
            >
              <span className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                <span className="h-px w-8 bg-primary/30"></span>
                {t('hero.designEngineering') || 'Frontend Developer'}
              </span>
              <h1 className="mb-8 text-[3.5rem] font-black leading-[0.9] tracking-tighter text-tertiary md:text-[5rem] lg:text-[7rem]">
                CHAU KIEN<br /><span className="text-glow-primary text-primary uppercase">LUONG</span>
              </h1>
              <div className="max-w-xl">
                <p className="mb-10 max-w-md text-lg leading-relaxed text-on-surface-variant">
                  {t('hero.description') || 'A motivated fresher frontend developer with a strong interest in building user-friendly and accessible web applications. Currently focused on mastering modern frontend technologies, with a long-term goal of becoming a full-stack developer.'}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={cvFile}
                    download="CV_CHAU-KIEN-LUONG_FullStack-Developer.pdf"
                    className="metallic-gradient rounded-xl px-8 py-4 text-sm font-bold uppercase tracking-wider text-on-primary shadow-[0_10px_30px_rgba(0,242,255,0.2)] transition-transform hover:scale-105"
                  >
                    {t('hero.viewProjects') || 'Download CV'}
                  </a>
                  <a
                    href="#contact"
                    className="rounded-xl border border-outline-variant/10 px-8 py-4 text-sm font-bold uppercase tracking-wider text-tertiary transition-colors hover:bg-surface-container-high"
                  >
                    {t('hero.contactMe') || "Let's Talk"}
                  </a>
                </div>
              </div>
            </div>

            <div
              className="relative order-1 col-span-12 flex items-center justify-center lg:order-2 lg:col-span-6 lg:justify-end"
            >
              <div className="relative isolate flex w-full max-w-[38rem] items-end justify-center lg:justify-end">
                <div className="pointer-events-none absolute inset-x-[12%] top-[7%] bottom-[15%] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.26),rgba(0,242,255,0.08)_42%,transparent_72%)] blur-3xl" />
                <div className="pointer-events-none absolute left-[8%] top-[10%] h-20 w-20 rounded-full border border-primary/25 bg-primary/5 md:h-24 md:w-24" />
                <div className="pointer-events-none absolute right-[12%] top-[18%] h-10 w-10 rounded-full bg-white/10 blur-sm" />
                <div className="pointer-events-none absolute bottom-[12%] left-[8%] h-16 w-16 rounded-full border border-outline-variant/30" />
                <div className="pointer-events-none absolute bottom-[6%] left-1/2 h-10 w-[62%] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
                <div className="pointer-events-none absolute inset-x-[4%] bottom-[2%] top-[12%] rounded-[2.5rem] border border-outline-variant/15 bg-gradient-to-b from-white/[0.03] via-transparent to-transparent" />
                <img
                  alt="Chau Kien Luong portrait"
                  className="relative z-10 h-auto w-full max-w-[30rem] object-contain drop-shadow-[0_28px_70px_rgba(0,0,0,0.55)] transition-transform duration-700 md:max-w-[34rem] lg:max-w-[38rem] lg:translate-x-4 lg:scale-110"
                  src={avatarPortrait}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
