import { Footer } from "@/components/layout/footer"


const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <main className="relative flex scroll-m-9 flex-col bg-brand-k pb-12 pt-14 after:absolute after:-top-px after:z-10 after:h-px after:w-full after:bg-brand-w1/10 lg:pb-24">
      {children}
    </main>
    <Footer />
  </>
)

export default Layout