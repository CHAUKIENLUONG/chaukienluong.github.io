import { useResponsiveQuery } from '../hooks/mediaQuery'

const Footer = () => {
  const { isMobile, isTablet, isLaptop } = useResponsiveQuery()
  const isStacked = isMobile || isTablet
  const horizontalPadding = isLaptop ? 'px-12' : 'px-32'

  return (
    <footer className={`flex items-center justify-between gap-6 border-t border-primary/15 bg-background py-12 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] ${isStacked ? 'flex-col px-6 text-center' : `flex-row ${horizontalPadding} text-left`}`}>
      <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
        Copyright 2026 CKL.ARCHITECT / All Systems Operational
      </div>
      <div className={`flex text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ${isMobile ? 'flex-col gap-4' : 'gap-8'}`}>
        <a className="transition-colors hover:text-primary" href="#">Privacy Policy</a>
        <a className="transition-colors hover:text-primary" href="#">Status: Stable</a>
      </div>
    </footer>
  )
}

export default Footer
