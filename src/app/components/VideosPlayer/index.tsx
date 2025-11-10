'use client'

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer = ({ src }: VideoPlayerProps) => {
  return (
    <div className="my-8">
      <video
        controls
        width="100%"
        className="rounded-lg shadow-lg"
      >
        <source src={src} type="video/mp4" />
        Browser kamu tidak mendukung video tag.
      </video>
    </div>
  )
}

export default VideoPlayer