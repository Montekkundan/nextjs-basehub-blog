"use client"
import { usePathname } from "next/navigation"
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Link } from "@/components/link"
import { useMedia } from "@/hooks/use-media"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "motion/react"

import {  InternalLinks, SocialLinks } from "./shared-sections"
import { useRouter } from "next/navigation"

const Logo = memo(({ className }: { className?: string }) => {
  const [contextMenu, setContextMenu] = useState<{
    x: number
    y: number
  } | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setContextMenu(null)
      }
    }

    if (contextMenu) document.addEventListener("mousedown", handleClickOutside)

    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [contextMenu])

  return (
    <>
      <div >
        {/* <svg
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 107 15"
          className={cn("logo-svg", className)}
        >
          <path d="M3.54378 5.68462c.40819-1.71646 1.48431-2.19633 3.71077-2.19633 3.30255 0 4.06325.81209 4.06325 4.94636v1.60575c0 4.1158-.7792 4.9463-4.24879 4.9463-2.05947 0-3.26547-.9597-3.618-2.8792v2.6578H0V0h3.54378v5.68462Zm.01856 5.18628c.11132.7014.76071 1.0705 2.00381 1.0705 1.70696 0 2.02237-.3691 2.02237-1.97485V8.54539c0-1.64263-.31541-2.01176-2.02237-2.01176-1.26166 0-1.91104.47987-2.00381 1.47652v2.86075Zm8.94296.7014c0-2.84234.6679-3.37758 4.2488-3.37758l3.5252-.01846v-.62752c0-1.27351-.2968-1.49499-1.8553-1.49499-1.7441 0-2.0595.22148-2.0224 1.49499h-3.5252v-.44296c0-3.04534.8163-3.61749 5.1579-3.61749h.8535c4.1375 0 4.9168.59061 4.9168 3.82051v7.4565h-3.5253v-1.9564c-.4824 1.4765-1.7255 2.1594-3.4695 2.1778-3.6366.1108-4.3045-.4245-4.3045-3.4144Zm3.7108.0369c0 .7382.2783.8859 1.7255.8859h.1855c1.5585-.0369 2.1522-.3691 2.1522-1.2366v-.4799l-2.9129.0185c-.9648 0-1.1503.1292-1.1503.8121Zm8.7759-.2953v-.24h3.3397v.24c0 .849.4639 1.0889 2.1894 1.0889 1.5956 0 2.0223-.1846 2.0223-.849 0-.4429-.3896-.7383-2.0223-1.0336-.6494-.1292-2.3378-.3875-3.451-.81204-1.5215-.59061-1.9111-1.42116-1.9111-2.89769 0-2.82385.8164-3.32218 5.0281-3.32218h.8535c4.1375 0 4.9167.57215 4.9167 3.72823v.33222h-3.5253v-.33222c0-.90437-.3896-1.16277-1.8183-1.16277-1.3729 0-1.744.18457-1.744.86746 0 .46142.3339.6829 1.5399.86746 1.8183.29531 2.6718.51679 3.6366.79363 1.7626.51679 2.1894 1.5319 2.1894 3.2299 0 2.6578-.8535 3.1745-5.5291 3.1745h-.8535c-4.0818 0-4.8611-.5906-4.8611-3.6728Zm12.3198-2.06716c0-4.87253.8535-5.75845 5.3991-5.75845h.8535c4.5828 0 5.4363.81209 5.4363 5.20475V10.428h-7.9782v.0553c0 1.6058.334 1.9195 2.1337 1.9195 1.7255 0 2.041-.203 2.041-1.1443h3.7107c0 3.1376-.8349 3.7282-5.3435 3.7282h-.8535c-4.5456 0-5.3991-.9043-5.3991-5.73996Zm3.7107-1.42115h4.2674c-.0185-1.49499-.3896-1.77184-2.1337-1.77184-1.7997 0-2.1337.27685-2.1337 1.71647v.05537Zm9.5367 6.93971V3.70977h3.5252v2.10405c.3897-1.66109 1.3359-2.32553 2.9872-2.32553 2.8202 0 3.4325.44296 3.5809 2.54701.4082-1.75338 1.54-2.54701 3.4139-2.54701 3.3954 0 4.0262.64598 4.0262 4.11582l.0186 7.16119h-3.5253V8.13935c0-1.43962-.2412-1.71646-1.6513-1.71646-1.1874 0-1.7997.60906-1.8368 1.8272l.0186 6.51521h-3.5067V8.13935c0-1.43962-.2783-1.71646-1.6884-1.71646-1.2246 0-1.8369.64598-1.8369 1.93794v6.40447h-3.5252Zm18.9249-5.51856c0-4.87253.8535-5.75845 5.4178-5.75845h.8534c4.5457 0 5.3992.81209 5.3992 5.20475V10.428h-7.9781v.0553c0 1.6058.3339 1.9195 2.1708 1.9195 1.7069 0 2.0223-.203 2.0223-1.1443h3.6922c0 3.1376-.8349 3.7282-5.3064 3.7282h-.8534c-4.5643 0-5.4178-.9043-5.4178-5.73996Zm3.6923-1.42115h4.2859c-.0186-1.49499-.3896-1.77184-2.1151-1.77184-1.8369 0-2.1708.27685-2.1708 1.71647v.05537Zm9.5181 6.93971V3.70977h3.5252v2.23325c.4267-1.79029 1.5029-2.45473 3.5438-2.45473 3.2284 0 3.8406.64598 3.8406 4.11582l.0186 7.16119h-3.5252V8.43465c0-1.698-.2969-2.01176-1.9296-2.01176-1.2803 0-1.9296.57215-1.9482 1.75337v6.58904h-3.5252Zm11.8373-8.12094V3.70977h1.2802v-2.3809h3.3397v2.3809h3.1723v2.93459h-3.1723v3.87584c0 .9229.2041 1.1074 1.2993 1.1074h2.04v3.1377h-2.412c-3.7289 0-4.4525-.5907-4.4525-3.7098V6.64436h-1.0947Zm9.2952 8.12094v-3.1377H107v3.1377h-3.173Z" />
        </svg> */}
        <svg 
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 117 23"
          className={cn("logo-svg", className)} 
          >
        <path d="M0.98 22V5.92H5.03L5.18 9.79L4.76 9.61C4.98 8.75 5.31 8.02 5.75 7.42C6.21 6.82 6.76 6.36 7.4 6.04C8.04 5.72 8.74 5.56 9.5 5.56C10.84 5.56 11.92 5.95 12.74 6.73C13.58 7.51 14.12 8.56 14.36 9.88L13.79 9.91C13.97 8.97 14.28 8.18 14.72 7.54C15.18 6.88 15.74 6.39 16.4 6.07C17.06 5.73 17.8 5.56 18.62 5.56C19.74 5.56 20.7 5.79 21.5 6.25C22.3 6.71 22.92 7.4 23.36 8.32C23.8 9.22 24.02 10.33 24.02 11.65V22H19.52V12.91C19.52 11.65 19.33 10.71 18.95 10.09C18.57 9.45 17.95 9.13 17.09 9.13C16.55 9.13 16.09 9.28 15.71 9.58C15.33 9.88 15.03 10.32 14.81 10.9C14.61 11.46 14.51 12.15 14.51 12.97V22H10.46V12.97C10.46 11.73 10.28 10.78 9.92 10.12C9.56 9.46 8.94 9.13 8.06 9.13C7.52 9.13 7.05 9.28 6.65 9.58C6.27 9.88 5.98 10.32 5.78 10.9C5.58 11.48 5.48 12.17 5.48 12.97V22H0.98ZM34.9009 22.36C33.2609 22.36 31.8309 22.02 30.6109 21.34C29.3909 20.64 28.4409 19.66 27.7609 18.4C27.0809 17.14 26.7409 15.66 26.7409 13.96C26.7409 12.26 27.0809 10.79 27.7609 9.55C28.4409 8.29 29.3909 7.31 30.6109 6.61C31.8309 5.91 33.2609 5.56 34.9009 5.56C36.5409 5.56 37.9709 5.91 39.1909 6.61C40.4109 7.31 41.3609 8.29 42.0409 9.55C42.7209 10.79 43.0609 12.26 43.0609 13.96C43.0609 15.66 42.7209 17.14 42.0409 18.4C41.3609 19.66 40.4109 20.64 39.1909 21.34C37.9709 22.02 36.5409 22.36 34.9009 22.36ZM34.9009 18.91C36.0209 18.91 36.8909 18.48 37.5109 17.62C38.1309 16.74 38.4409 15.52 38.4409 13.96C38.4409 12.4 38.1309 11.19 37.5109 10.33C36.8909 9.45 36.0209 9.01 34.9009 9.01C33.7809 9.01 32.9109 9.45 32.2909 10.33C31.6709 11.19 31.3609 12.4 31.3609 13.96C31.3609 15.52 31.6709 16.74 32.2909 17.62C32.9109 18.48 33.7809 18.91 34.9009 18.91ZM45.8628 22V5.92H49.9128L50.0928 10.63L49.5228 10.48C49.6828 9.28 50.0028 8.32 50.4828 7.6C50.9828 6.88 51.6028 6.36 52.3428 6.04C53.0828 5.72 53.8928 5.56 54.7728 5.56C55.9328 5.56 56.9128 5.81 57.7128 6.31C58.5328 6.81 59.1528 7.52 59.5728 8.44C60.0128 9.34 60.2328 10.41 60.2328 11.65V22H55.7328V13.15C55.7328 12.29 55.6628 11.56 55.5228 10.96C55.3828 10.36 55.1328 9.91 54.7728 9.61C54.4128 9.29 53.9128 9.13 53.2728 9.13C52.3328 9.13 51.6128 9.48 51.1128 10.18C50.6128 10.86 50.3628 11.85 50.3628 13.15V22H45.8628ZM69.808 22C68.148 22 66.928 21.62 66.148 20.86C65.368 20.08 64.978 18.85 64.978 17.17V2.14H69.478V16.63C69.478 17.41 69.638 17.94 69.958 18.22C70.298 18.5 70.798 18.64 71.458 18.64H73.708V22H69.808ZM62.398 9.28V5.92H73.708V9.28H62.398ZM83.3272 22.36C81.6872 22.36 80.2572 22.02 79.0372 21.34C77.8372 20.64 76.8972 19.66 76.2172 18.4C75.5572 17.14 75.2272 15.66 75.2272 13.96C75.2272 12.26 75.5572 10.79 76.2172 9.55C76.8972 8.29 77.8372 7.31 79.0372 6.61C80.2372 5.91 81.6572 5.56 83.2972 5.56C84.8972 5.56 86.2872 5.91 87.4672 6.61C88.6472 7.31 89.5572 8.31 90.1972 9.61C90.8572 10.91 91.1872 12.46 91.1872 14.26V15.16H79.8772C79.9372 16.44 80.2772 17.39 80.8972 18.01C81.5372 18.63 82.3772 18.94 83.4172 18.94C84.1772 18.94 84.8072 18.78 85.3072 18.46C85.8272 18.14 86.1972 17.65 86.4172 16.99L90.9472 17.26C90.5272 18.86 89.6372 20.11 88.2772 21.01C86.9172 21.91 85.2672 22.36 83.3272 22.36ZM79.8772 12.4H86.5672C86.5072 11.22 86.1772 10.34 85.5772 9.76C84.9972 9.18 84.2372 8.89 83.2972 8.89C82.3572 8.89 81.5772 9.2 80.9572 9.82C80.3572 10.42 79.9972 11.28 79.8772 12.4ZM93.9683 22V0.699999H98.4683V12.52L104.438 5.92H109.838L103.598 12.55L110.018 22H105.098L100.688 15.1L98.4683 17.47V22H93.9683ZM111.936 22V17.41H116.826V22H111.936Z" fill="white"/>
        </svg>
      </div>
    </>
  )
})
Logo.displayName = "Logo"

interface NavbarContentProps {
  links: {
    title: string
    href: string
    count?: number
  }[]

  socialLinks: {
    twitter: string
    instagram: string
    github: string
    linkedIn: string
  }
}

export const NavbarContent = memo(
  ({ links, socialLinks }: NavbarContentProps) => {
    const router = useRouter()
    return (
      <nav
        className={cn(
          "fixed top-0 z-navbar flex w-full flex-col items-center justify-center bg-brand-k transition-transform duration-300 lg:bg-transparent",
          "[background-image:linear-gradient(#000000_1px,transparent_1px),linear-gradient(to_right,#000000_1px,rgba(0,0,0,0.7)_1px)] [background-position-y:1px] [background-size:2px_2px]",
          "after:absolute after:-bottom-px after:left-0 after:h-px after:w-full after:bg-brand-w1/10"
        )}
      >
        <div className="grid-layout h-9">
          <button
            onClick={() => router.push("/")}
            className="col-span-1 w-fit lg:col-start-1 lg:col-end-3"
          >
            <Logo className="h-[0.9375rem] text-brand-w1" />
          </button>

          <DesktopContent
            links={links}
            socialLinks={socialLinks}
          />

          <MobileContent
            links={links}
            socialLinks={socialLinks}
          />
        </div>
      </nav>
    )
  }
)
NavbarContent.displayName = "NavbarContent"

const DesktopContent = memo(({ links }: NavbarContentProps) => {
  const pathname = usePathname()

  return (
    <>
      <div className="col-start-3 col-end-11 hidden w-full justify-center gap-5 lg:flex">
        {links.map((link) => (
          <div
            key={link.href}
            className="flex items-center gap-1 text-[0.75rem] font-semibold leading-4"
          >
            <Link
              href={link.href}
              className={cn(
                "group space-x-1 text-brand-w1 transition-colors duration-300 hover:text-brand-o",
                link.href === pathname && "!text-brand-o",
                pathname.includes("/post/") &&
                  link.href === "/blog" &&
                  "!text-brand-o"
              )}
            >
              {link.title}
            </Link>
            {link.count && (
              <sup className="text-caption text-brand-g1">({link.count})</sup>
            )}
          </div>
        ))}
      </div>

      <div className="col-start-11 col-end-13 ml-auto hidden items-center gap-5 lg:flex">
      </div>
    </>
  )
})
DesktopContent.displayName = "DesktopContent"

const MobileContent = memo(({ links, socialLinks }: NavbarContentProps) => {
  const isDesktop = useMedia("(min-width: 1024px)")
  const [isOpen, setIsOpen] = useState(false)

  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuHandlerRef = useRef<HTMLButtonElement>(null)


  const handleChangeLink = () => {
    setIsOpen(false)
  }

  const memoizedMenu = useMemo(() => {
    if (isDesktop || !isOpen) return null

    return (
      <motion.div
        ref={mobileMenuRef}
        className={cn(
          "grid-layout fixed left-0 top-[35px] z-navbar h-[calc(100dvh-35px)] w-full origin-top grid-rows-2 bg-brand-k py-6"
        )}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0, transition: { delay: 0.35 } }}
        transition={{ duration: 0.4, type: "spring", bounce: 0 }}
      >
        <InternalLinks
          links={links}
          onClick={handleChangeLink}
          className="col-span-4"
          onNav={true}
          animated={true}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.4 } }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, type: "spring", bounce: 0 }}
          className="col-span-4 flex h-full flex-col justify-end gap-y-16"
        >
          <div className="flex flex-col items-start gap-y-2">
            <SocialLinks links={socialLinks} />
          </div>
        </motion.div>
      </motion.div>
    )
  }, [isOpen, mobileMenuRef, isDesktop, links, socialLinks])

  const Label = useMemo(() => {
    return function Label({ children }: { children: React.ReactNode }) {
      return (
        <motion.p
          id="menu-button"
          key={isOpen ? "close" : "menu"}
          className="w-[2.4rem] origin-bottom text-center text-f-p-mobile text-brand-w1"
          initial={{ opacity: 0, scaleY: 0.5, filter: "blur(4px)" }}
          animate={{ opacity: 1, scaleY: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scaleY: 0.5, filter: "blur(4px)" }}
          transition={{ duration: 0.9, type: "spring", bounce: 0 }}
        >
          {children}
        </motion.p>
      )
    }
  }, [isOpen])

  const handleMenuClick = () => {
    if (isOpen) {
      setIsOpen(false)
    } else {
      setIsOpen(true)
    }
  }
  return (
    <div className="col-start-3 col-end-5 flex items-center justify-end gap-5 lg:hidden">

      <button onClick={handleMenuClick} className="flex items-center">
        <AnimatePresence mode="popLayout" initial={false}>
          {isOpen ? <Label>Close</Label> : <Label>Menu</Label>}
        </AnimatePresence>

        <span
          className="relative flex w-5 flex-col items-center justify-center gap-1 overflow-visible pl-1"
          ref={menuHandlerRef}
          aria-labelledby="menu-button"
        >
          <span
            className={cn(
              "h-[1.5px] w-full origin-center transform bg-brand-w1 transition-[transform,width] duration-300 ease-in-out",
              { "w-10/12 translate-y-[3px] rotate-[45deg]": isOpen }
            )}
          />
          <span
            className={cn(
              "h-[1.5px] w-full origin-center transform bg-brand-w1 transition-[transform,width] duration-300 ease-in-out",
              { "w-10/12 -translate-y-[2.5px] -rotate-[45deg]": isOpen }
            )}
          />
        </span>
      </button>

      <AnimatePresence>{memoizedMenu}</AnimatePresence>
    </div>
  )
})
MobileContent.displayName = "MobileContent"