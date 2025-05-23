"use client"

import Image from "next/image"
import Link from "next/link"

interface ShowcaseImageProps {
  project: any
}

export const ShowcaseImage = ({ project }: ShowcaseImageProps) => {
  if (!project.cover) return null

  const transformedImage = {
    ...project.cover,
    url: project.cover.url || "",
    width: typeof project.cover.width === 'string' ? parseInt(project.cover.width) : (project.cover.width || 800),
    height: typeof project.cover.height === 'string' ? parseInt(project.cover.height) : (project.cover.height || 450),
    alt: project.cover.alt || "",
    blurDataURL: typeof project.cover.blurDataURL === 'string'
      ? project.cover.blurDataURL
      : ""
  }
  return (
    <Link href={`${project.project?.contentSlug}`}>
      <div className="with-dots relative h-full">
        <Image
          src={transformedImage.url}
          alt={transformedImage.alt}
          width={transformedImage.width}
          height={transformedImage.height}
        //   blurDataURL={transformedImage.blurDataURL}
          className="aspect-video h-full w-full object-cover"
          priority
        />
      </div>
    </Link>
  )
}