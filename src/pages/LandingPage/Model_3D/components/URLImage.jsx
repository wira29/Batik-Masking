import { useEffect, useRef } from "react";
import { Image as KonvaImage, Transformer } from "react-konva";
import useImage from "use-image";

export default function URLImage({
  image,
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onDoubleClick,
}) {
  const [img] = useImage(image.src, "Anonymous");
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const getDefaultSize = () => {
    if (image.width && image.height) {
      return { width: image.width, height: image.height };
    }

    if (img) {
      const maxSize = 200;
      const aspectRatio = img.width / img.height;

      if (img.width > img.height) {
        return { width: maxSize, height: maxSize / aspectRatio };
      } else {
        return { width: maxSize * aspectRatio, height: maxSize };
      }
    }

    return { width: 100, height: 100 };
  };

  const defaultSize = getDefaultSize();

  return (
    <>
      <KonvaImage
        ref={shapeRef}
        id={String(image.id)}
        image={img}
        x={image.x || 0}
        y={image.y || 0}
        width={image.width || defaultSize.width}
        height={image.height || defaultSize.height}
        rotation={image.rotation || 0}
        scaleX={image.scaleX || 1}
        scaleY={image.scaleY || 1}
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
        offsetX={
          image.crop
            ? image.crop.width / 2
            : (image.width || defaultSize.width) / 2
        }
        offsetY={
          image.crop
            ? image.crop.height / 2
            : (image.height || defaultSize.height) / 2
        }
        draggable
        onClick={(e) => {
          e.cancelBubble = true;
          onSelect();
        }}
        onTap={(e) => {
          e.cancelBubble = true;
          onSelect();
        }}
        onDblClick={(e) => {
          e.cancelBubble = true;
          onDoubleClick?.(image);
        }}
        onDblTap={(e) => {
          e.cancelBubble = true;
          onDoubleClick?.(image);
        }}
        onDragEnd={(e) => {
          const node = e.target;
          onChange({
            ...image,
            x: node.x(),
            y: node.y(),
          });
          setTimeout(() => {
            if (trRef.current && shapeRef.current) {
              trRef.current.nodes([shapeRef.current]);
              trRef.current.getLayer()?.batchDraw();
            }
          }, 0);
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          if (!node) return;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);

          const newWidth = Math.max(10, node.width() * scaleX);
          const newHeight = Math.max(10, node.height() * scaleY);

          onChange({
            ...image,
            x: node.x(),
            y: node.y(),
            rotation: node.rotation(),
            width: newWidth,
            height: newHeight,
            scaleX: 1,
            scaleY: 1,
          });
          setTimeout(() => {
            if (trRef.current && shapeRef.current) {
              trRef.current.nodes([shapeRef.current]);
              trRef.current.getLayer()?.batchDraw();
            }
          }, 0);
        }}
      />

      {isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled={true}
          flipEnabled={false}
          keepRatio={false}
          enabledAnchors={[
            "top-left",
            "top-center",
            "top-right",
            "middle-right",
            "middle-left",
            "bottom-left",
            "bottom-center",
            "bottom-right",
          ]}
          boundBoxFunc={(oldBox, newBox) => {
            const minWidth = 50;
            const minHeight = 50;

            if (
              Math.abs(newBox.width) < minWidth ||
              Math.abs(newBox.height) < minHeight
            ) {
              return oldBox;
            }
            return newBox;
          }}
          anchorStroke="#4285f4"
          anchorFill="#4285f4"
          anchorSize={8}
          borderStroke="#4285f4"
          borderStrokeWidth={2}
        />
      )}
    </>
  );
}
