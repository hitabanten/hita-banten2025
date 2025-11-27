type VideoPlayerProps = {
  src: string;
  type?: string;
};

export default function VideoPlayer({ src, type = "video/mp4" }: VideoPlayerProps) {
  return (
    <video controls width="100%">
      <source src={src} type={type} />
      Browser kamu tidak mendukung video tag.
    </video>
  );
}
