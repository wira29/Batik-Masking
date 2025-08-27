import { useEffect, useRef } from "react";
import { Image as KonvaImage, Transformer } from "react-konva";
import useImage from "use-image";

export default function URLImage({
  image,
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onDoubleClick // New prop for handling double-click to crop
}) {
  const [img] = useImage(image.src);
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      <KonvaImage
        onClick={onSelect}
        onTap={onSelect}
        onDblClick={() => onDoubleClick?.(image)} // Handle double-click for cropping
        onDblTap={() => onDoubleClick?.(image)}   // Handle double-tap for cropping on mobile
        ref={shapeRef}
        {...shapeProps}
        image={img}
        x={image.x}
        y={image.y}
        width={image.width || (img ? img.width : 100)}
        height={image.height || (img ? img.height : 100)}
        // Crop support - if crop data exists, apply it
        crop={
          image.crop
            ? {
              x: image.crop.x,
              y: image.crop.y,
              width: image.crop.width,
              height: image.crop.height,
            }
            : undefined
        }
        offsetX={img ? img.width / 2 : 0}
        offsetY={img ? img.height / 2 : 0}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...image,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          onChange({
            ...image,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
          });

          node.scaleX(1);
          node.scaleY(1);
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) =>
            Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5
              ? oldBox
              : newBox
          }
        />
      )}
    </>
  );
}