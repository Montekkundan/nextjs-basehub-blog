import Image from "next/image"
import { Tweet } from "react-tweet"


interface CustomTweetProps {
  id: string
}

export const CustomTweet = async ({ id }: CustomTweetProps) => {
  return (
    <div className="dark mx-auto grid w-full max-w-[500px] place-items-center">
      <Tweet id={id}/>
    </div>
  )
}