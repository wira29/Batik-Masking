import React from "react";
import { Image as KonvaImage } from "react-konva";
import useImage from "use-image";

export default function BackgroundImage({ src, width, height }) {
  const [image] = useImage(src, "Anonymous");
  return <KonvaImage image={image} width={width} height={height} />;
}
