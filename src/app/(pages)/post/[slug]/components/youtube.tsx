interface YoutubeProps {
  youtubeId: string;
}

export const Youtube = ({ youtubeId }: YoutubeProps) => {
  return (
    <div className="mx-auto w-full max-w-[800px] aspect-video">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg"
      ></iframe>
    </div>
  );
};