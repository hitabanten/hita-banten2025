"use client"

import React from "react"

interface VideoPlayerProps {
  src: string
  width?: string | number
  height?: string | number
}

export default function VideoPlayer({
  src,
  width = "100%",
  height = "auto",
}: VideoPlayerProps) {
  return (
    <div className="w-full flex justify-center my-6">
      <video
        controls
        className="rounded-xl shadow-md w-full max-w-3xl"
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
        }}
      >
        <source src={src} type="video/mp4" />
        Browser kamu tidak mendukung pemutar video.
      </video>
    </div>
  )
}
