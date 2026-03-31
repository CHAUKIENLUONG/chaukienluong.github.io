const Footer = () => {
  return (
    <footer className="py-12 px-6 md:px-20 lg:px-32 border-t border-outline-variant/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest">
        © 2026 CKL.ARCHITECT / All Systems Operational
      </div>
      <div className="flex gap-8 text-[10px] uppercase font-bold tracking-widest text-on-surface-variant">
        <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
        <a className="hover:text-primary transition-colors" href="#">Status: Stable</a>
      </div>
    </footer>
  )
}

export default Footer
