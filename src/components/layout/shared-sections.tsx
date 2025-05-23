"use client"

import { Link } from "@/components/link"
import { useMedia } from "@/hooks/use-media"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

interface InternalLinksProps {
  className?: string
  links: { title: string; href: string; count?: number }[]
  onClick?: () => void
  onNav?: boolean
  animated?: boolean
}

const STAGER_DELAY = 0.2
const STAGER_DURATION = 0.3
const STAGER_STEPS = 0.1

const getDelay = (idx: number, length: number, instant?: boolean) =>
  (instant ? 0 : STAGER_DELAY) + (idx / length) * STAGER_STEPS

export const InternalLinks = ({
  className,
  links,
  onClick,
  onNav,
  animated = false
}: InternalLinksProps) => {
  // const handleContactButton = useHandleContactButton()
  const isDesktop = useMedia("(min-width: 1024px)")

  const filteredLinks = links.filter((link) => {
    if (isDesktop || !link.href.includes("lab")) {
      return true
    }

    return false
  })

  const animateProps = animated
    ? {
      initial: { opacity: 0, y: 15 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -15 }
    }
    : {}

  return (
    <ul
      className={cn(
        "flex flex-col lg:flex-row gap-y-2 lg:gap-x-2 lg:gap-y-0",
        onNav ? "!text-[2.75rem] tracking-[-0.02em]" : "!text-f-h1-mobile",
        "text-brand-w1 lg:!text-f-h2",
        className
      )}
    >
      {filteredLinks.map((link, idx) => (
        <motion.li
          key={`${link.title}-${idx}`}
          {...animateProps}
          animate={{
            ...animateProps.animate,
            transition: {
              duration: STAGER_DURATION,
              delay: getDelay(idx, links.length)
            }
          }}
          exit={{
            ...animateProps.exit,
            transition: {
              duration: STAGER_DURATION,
              delay: getDelay(idx, links.length, true)
            }
          }}
        >
          <Link
            className={cn("flex w-fit gap-x-0.5 text-brand-w1")}
            href={link.href}
            onClick={onClick}
          >
            <span  >{link.title}</span>
            {link.count && (
              <sup className="translate-y-1.25 text-f-p-mobile !font-medium text-brand-g1 lg:text-f-p">
                <span className="tabular-nums">({link.count})</span>
              </sup>
            )}
          </Link>
        </motion.li>
      ))}

      <motion.li
        {...animateProps}
        animate={{
          ...animateProps.animate,
          transition: {
            duration: STAGER_DURATION,
            delay: getDelay(links.length, links.length)
          }
        }}
        exit={{
          ...animateProps.exit,
          transition: {
            duration: STAGER_DURATION,
            delay: getDelay(links.length, links.length, true)
          }
        }}
      >
      </motion.li>
    </ul>
  )
}


interface SocialLinksProps {
  className?: string
  links: {
    twitter: string
    instagram: string
    github: string
    linkedIn: string
  }
}

export const SocialLinks = ({ className, links }: SocialLinksProps) => (
  <div
    className={cn(
      "flex flex-row gap-x-3 !text-f-h4-mobile text-brand-w1 lg:!text-f-p",
      className
    )}
  >
    <Link
      className="min-w-[44px] min-h-[44px] flex items-center justify-center text-brand-w1 hover:text-brand-o transition-colors duration-200"
      href={links.twitter}
      target="_blank"
      aria-label="Twitter/X profile"
    >
      <span  >X</span>
    </Link>

    <Link
      className="min-w-[44px] min-h-[44px] flex items-center justify-center text-brand-w1 hover:text-brand-o transition-colors duration-200"
      href={links.instagram}
      target="_blank"
      aria-label="Instagram profile"
    >
      <span  >Instagram</span>
    </Link> 

    <Link
      className="min-w-[44px] min-h-[44px] flex items-center justify-center text-brand-w1 hover:text-brand-o transition-colors duration-200"
      href={links.github}
      target="_blank"
      aria-label="GitHub profile"
    >
      <span  >GitHub</span>
    </Link>

    <Link
      className="min-w-[44px] min-h-[44px] flex items-center justify-center text-brand-w1 hover:text-brand-o transition-colors duration-200"
      href={links.linkedIn}
      target="_blank"
      aria-label="LinkedIn profile"
    >
      <span  >LinkedIn</span>
    </Link>
  </div>
)