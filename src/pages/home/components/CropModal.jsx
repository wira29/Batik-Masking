import { Check, Crop, RotateCcw, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Image as KonvaImage, Layer, Rect, Stage } from 'react-konva';
import useImage from 'use-image';

const CropModal = ({ isOpen, onClose, imageData, onCropComplete }) => {
    const [img] = useImage(imageData.src);
    const [cropBox, setCropBox] = useState({
        x: 0,
        y: 0,
        width: 200,
        height: 200
    });
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [originalCropBox, setOriginalCropBox] = useState(null);
    const stageRef = useRef();

    // Initialize crop box when image loads
    useEffect(() => {
        if (img && isOpen) {
            const initialSize = Math.min(img.width, img.height) * 0.6;
            setCropBox({
                x: (img.width - initialSize) / 2,
                y: (img.height - initialSize) / 2,
                width: initialSize,
                height: initialSize
            });
        }
    }, [img, isOpen]);

    if (!isOpen) return null;

    const handleMouseDown = (e) => {
        const pos = e.target.getStage().getPointerPosition();
        const rect = e.target.getClientRect();

        // Check if clicking on resize handle (bottom-right corner)
        const handleSize = 10;
        const isOnHandle =
            pos.x >= cropBox.x + cropBox.width - handleSize &&
            pos.x <= cropBox.x + cropBox.width + handleSize &&
            pos.y >= cropBox.y + cropBox.height - handleSize &&
            pos.y <= cropBox.y + cropBox.height + handleSize;

        // Check if clicking inside crop box
        const isInsideCrop =
            pos.x >= cropBox.x &&
            pos.x <= cropBox.x + cropBox.width &&
            pos.y >= cropBox.y &&
            pos.y <= cropBox.y + cropBox.height;

        if (isOnHandle) {
            setIsResizing(true);
            setDragStart(pos);
            setOriginalCropBox({ ...cropBox });
        } else if (isInsideCrop) {
            setIsDragging(true);
            setDragStart({ x: pos.x - cropBox.x, y: pos.y - cropBox.y });
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging && !isResizing) return;

        const pos = e.target.getStage().getPointerPosition();

        if (isDragging) {
            setCropBox({
                ...cropBox,
                x: Math.max(0, Math.min(img.width - cropBox.width, pos.x - dragStart.x)),
                y: Math.max(0, Math.min(img.height - cropBox.height, pos.y - dragStart.y))
            });
        } else if (isResizing && originalCropBox) {
            const deltaX = pos.x - dragStart.x;
            const deltaY = pos.y - dragStart.y;
            const delta = Math.max(deltaX, deltaY); // Keep square aspect ratio

            setCropBox({
                ...originalCropBox,
                width: Math.max(50, Math.min(img.width - originalCropBox.x, originalCropBox.width + delta)),
                height: Math.max(50, Math.min(img.height - originalCropBox.y, originalCropBox.height + delta))
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
        setOriginalCropBox(null);
    };

    const handleCrop = () => {
        if (!img) return;

        // Create a temporary canvas to crop the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = cropBox.width;
        canvas.height = cropBox.height;

        ctx.drawImage(
            img,
            cropBox.x, cropBox.y, cropBox.width, cropBox.height,
            0, 0, cropBox.width, cropBox.height
        );

        const croppedImageSrc = canvas.toDataURL();

        onCropComplete({
            ...imageData,
            src: croppedImageSrc,
            width: cropBox.width,
            height: cropBox.height,
            crop: null // Reset crop data since we've applied it
        });

        onClose();
    };

    const resetCrop = () => {
        if (img) {
            const initialSize = Math.min(img.width, img.height) * 0.6;
            setCropBox({
                x: (img.width - initialSize) / 2,
                y: (img.height - initialSize) / 2,
                width: initialSize,
                height: initialSize
            });
        }
    };

    if (!img) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-gray-900 p-6 rounded-lg">
                    <div className="text-white">Loading image...</div>
                </div>
            </div>
        );
    }

    const scale = Math.min(600 / img.width, 500 / img.height, 1);
    const displayWidth = img.width * scale;
    const displayHeight = img.height * scale;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded-lg max-w-4xl max-h-screen overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <Crop className="text-white" size={20} />
                        <h2 className="text-xl font-semibold text-white">Crop Image</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Canvas Container */}
                <div className="mb-4 flex justify-center">
                    <div
                        className="relative border border-gray-600 rounded"
                        style={{ width: displayWidth, height: displayHeight }}
                    >
                        <Stage
                            width={displayWidth}
                            height={displayHeight}
                            scaleX={scale}
                            scaleY={scale}
                            ref={stageRef}
                            onMouseDown={handleMouseDown}
                            onMousemove={handleMouseMove}
                            onMouseup={handleMouseUp}
                            style={{ cursor: isDragging ? 'grabbing' : isResizing ? 'se-resize' : 'default' }}
                        >
                            <Layer>
                                {/* Original Image */}
                                <KonvaImage image={img} />

                                {/* Dark Overlay */}
                                <Rect
                                    x={0}
                                    y={0}
                                    width={img.width}
                                    height={img.height}
                                    fill="black"
                                    opacity={0.5}
                                />

                                {/* Crop Area (transparent) */}
                                <Rect
                                    x={cropBox.x}
                                    y={cropBox.y}
                                    width={cropBox.width}
                                    height={cropBox.height}
                                    fill="transparent"
                                    stroke="white"
                                    strokeWidth={2}
                                    dash={[5, 5]}
                                    globalCompositeOperation="destination-out"
                                />

                                {/* Crop Box Border */}
                                <Rect
                                    x={cropBox.x}
                                    y={cropBox.y}
                                    width={cropBox.width}
                                    height={cropBox.height}
                                    stroke="white"
                                    strokeWidth={2}
                                    fill="transparent"
                                />

                                {/* Resize Handle */}
                                <Rect
                                    x={cropBox.x + cropBox.width - 5}
                                    y={cropBox.y + cropBox.height - 5}
                                    width={10}
                                    height={10}
                                    fill="white"
                                    stroke="black"
                                    strokeWidth={1}
                                />
                            </Layer>
                        </Stage>

                        {/* Instructions */}
                        <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white text-sm p-2 rounded">
                            Drag to move • Drag corner to resize
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={resetCrop}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                    >
                        <RotateCcw size={16} />
                        Reset
                    </button>

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCrop}
                            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                        >
                            <Check size={16} />
                            Apply Crop
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CropModal;