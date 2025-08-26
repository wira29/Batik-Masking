import React from "react";
import { Stage, Layer } from "react-konva";
import BackgroundImage from "./BackgroundImage";
import URLImage from "./URLImage";

export default function StageEditor({ stageRef, selectedModel, images, selectedId, selectShape, setImages, checkDeselect }) {
  return (
    <Stage
      width={616}
      height={610}
      style={{
        border: "1px solid grey",
        borderRadius: "10px",
        overflow: "hidden",
      }}
      ref={stageRef}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        <BackgroundImage src={selectedModel.layout} width={616} height={610} />
        {images.map((image, i) => (
          <URLImage
            key={i}
            image={image}
            shapeProps={image}
            isSelected={image.id === selectedId}
            onSelect={() => selectShape(image.id)}
            onChange={(newAttrs) => {
              const imgs = images.slice();
              imgs[i] = newAttrs;
              setImages(imgs);
            }}
          />
        ))}
      </Layer>
    </Stage>
  );
}
