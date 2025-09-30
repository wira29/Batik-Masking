import { Check, Crop, RotateCcw, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Circle, Image as KonvaImage, Layer, Rect, Stage } from 'react-konva';
import useImage from 'use-image';

const CropModal = ({ isOpen, onClose, imageData, onCropComplete }) => {
    const [img] = useImage(imageData.src, 'anonymous');
    const [cropBox, setCropBox] = useState({
        x: 0,
        y: 0,
        width: 200,
        height: 200
    });
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeHandle, setResizeHandle] = useState(null);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [originalCropBox, setOriginalCropBox] = useState(null);
    const [hoveredHandle, setHoveredHandle] = useState(null);
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

    const handleSize = 20; // Ukuran handle lingkaran
    const handleRadius = handleSize / 2;

    const getHandlePositions = () => {
        return {
            'nw': { // top-left
                x: cropBox.x,
                y: cropBox.y
            },
            'ne': { // top-right
                x: cropBox.x + cropBox.width,
                y: cropBox.y
            },
            'sw': { // bottom-left
                x: cropBox.x,
                y: cropBox.y + cropBox.height
            },
            'se': { // bottom-right
                x: cropBox.x + cropBox.width,
                y: cropBox.y + cropBox.height
            },
            'n': { // top
                x: cropBox.x + cropBox.width / 2,
                y: cropBox.y
            },
            's': { // bottom
                x: cropBox.x + cropBox.width / 2,
                y: cropBox.y + cropBox.height
            },
            'w': { // left
                x: cropBox.x,
                y: cropBox.y + cropBox.height / 2
            },
            'e': { // right
                x: cropBox.x + cropBox.width,
                y: cropBox.y + cropBox.height / 2
            }
        };
    };

    const isPointInCircle = (point, center, radius) => {
        const dx = point.x - center.x;
        const dy = point.y - center.y;
        return Math.sqrt(dx * dx + dy * dy) <= radius;
    };

    const handleMouseDown = (e) => {
        const pos = e.target.getStage().getPointerPosition();
        const scale = Math.min(600 / img.width, 500 / img.height, 1);

        // Konversi posisi mouse ke koordinat image
        const imagePos = {
            x: pos.x / scale,
            y: pos.y / scale
        };

        const handlePositions = getHandlePositions();
        let selectedHandle = null;

        // Cek handle mana yang diklik (dengan deteksi lingkaran)
        for (const [handle, center] of Object.entries(handlePositions)) {
            if (isPointInCircle(imagePos, center, handleRadius + 5)) { // Tambahan 5px untuk toleransi
                selectedHandle = handle;
                console.log('Selected handle:', handle);
                break;
            }
        }

        // Check if clicking inside crop box
        const isInsideCrop =
            imagePos.x >= cropBox.x &&
            imagePos.x <= cropBox.x + cropBox.width &&
            imagePos.y >= cropBox.y &&
            imagePos.y <= cropBox.y + cropBox.height;

        if (selectedHandle) {
            setIsResizing(true);
            setResizeHandle(selectedHandle);
            setDragStart(imagePos);
            setOriginalCropBox({ ...cropBox });
        } else if (isInsideCrop) {
            setIsDragging(true);
            setDragStart({ x: imagePos.x - cropBox.x, y: imagePos.y - cropBox.y });
        }
    };

    const handleMouseMove = (e) => {
        const pos = e.target.getStage().getPointerPosition();
        const scale = Math.min(600 / img.width, 500 / img.height, 1);
        const imagePos = {
            x: pos.x / scale,
            y: pos.y / scale
        };

        // Update hovered handle untuk visual feedback
        if (!isDragging && !isResizing) {
            const handlePositions = getHandlePositions();
            let hoveredHandle = null;

            for (const [handle, center] of Object.entries(handlePositions)) {
                if (isPointInCircle(imagePos, center, handleRadius + 5)) {
                    hoveredHandle = handle;
                    break;
                }
            }
            setHoveredHandle(hoveredHandle);
        }

        if (isDragging) {
            setCropBox({
                ...cropBox,
                x: Math.max(0, Math.min(img.width - cropBox.width, imagePos.x - dragStart.x)),
                y: Math.max(0, Math.min(img.height - cropBox.height, imagePos.y - dragStart.y))
            });
        } else if (isResizing && originalCropBox && resizeHandle) {
            const deltaX = imagePos.x - dragStart.x;
            const deltaY = imagePos.y - dragStart.y;

            let newCropBox = { ...originalCropBox };
            const minSize = 50;

            switch (resizeHandle) {
                case 'se': // bottom-right
                    newCropBox.width = Math.max(minSize, Math.min(img.width - originalCropBox.x, originalCropBox.width + deltaX));
                    newCropBox.height = Math.max(minSize, Math.min(img.height - originalCropBox.y, originalCropBox.height + deltaY));
                    break;
                case 'sw': // bottom-left
                    const newX = Math.max(0, Math.min(originalCropBox.x + originalCropBox.width - minSize, originalCropBox.x + deltaX));
                    newCropBox.x = newX;
                    newCropBox.width = originalCropBox.width - (newX - originalCropBox.x);
                    newCropBox.height = Math.max(minSize, Math.min(img.height - originalCropBox.y, originalCropBox.height + deltaY));
                    break;
                case 'ne': // top-right
                    const newY = Math.max(0, Math.min(originalCropBox.y + originalCropBox.height - minSize, originalCropBox.y + deltaY));
                    newCropBox.y = newY;
                    newCropBox.height = originalCropBox.height - (newY - originalCropBox.y);
                    newCropBox.width = Math.max(minSize, Math.min(img.width - originalCropBox.x, originalCropBox.width + deltaX));
                    break;
                case 'nw': // top-left
                    const newNwX = Math.max(0, Math.min(originalCropBox.x + originalCropBox.width - minSize, originalCropBox.x + deltaX));
                    const newNwY = Math.max(0, Math.min(originalCropBox.y + originalCropBox.height - minSize, originalCropBox.y + deltaY));
                    newCropBox.x = newNwX;
                    newCropBox.y = newNwY;
                    newCropBox.width = originalCropBox.width - (newNwX - originalCropBox.x);
                    newCropBox.height = originalCropBox.height - (newNwY - originalCropBox.y);
                    break;
                case 'n': // top
                    const newTopY = Math.max(0, Math.min(originalCropBox.y + originalCropBox.height - minSize, originalCropBox.y + deltaY));
                    newCropBox.y = newTopY;
                    newCropBox.height = originalCropBox.height - (newTopY - originalCropBox.y);
                    break;
                case 's': // bottom
                    newCropBox.height = Math.max(minSize, Math.min(img.height - originalCropBox.y, originalCropBox.height + deltaY));
                    break;
                case 'e': // right
                    newCropBox.width = Math.max(minSize, Math.min(img.width - originalCropBox.x, originalCropBox.width + deltaX));
                    break;
                case 'w': // left
                    const newLeftX = Math.max(0, Math.min(originalCropBox.x + originalCropBox.width - minSize, originalCropBox.x + deltaX));
                    newCropBox.x = newLeftX;
                    newCropBox.width = originalCropBox.width - (newLeftX - originalCropBox.x);
                    break;
            }

            setCropBox(newCropBox);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
        setResizeHandle(null);
        setOriginalCropBox(null);
        setHoveredHandle(null);
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
            crop: null
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

    const getCursor = () => {
        if (isDragging) return 'grabbing';
        if (isResizing) {
            switch (resizeHandle) {
                case 'nw':
                case 'se':
                    return 'nw-resize';
                case 'ne':
                case 'sw':
                    return 'ne-resize';
                case 'n':
                case 's':
                    return 'ns-resize';
                case 'e':
                case 'w':
                    return 'ew-resize';
                default:
                    return 'default';
            }
        }
        if (hoveredHandle) {
            switch (hoveredHandle) {
                case 'nw':
                case 'se':
                    return 'nw-resize';
                case 'ne':
                case 'sw':
                    return 'ne-resize';
                case 'n':
                case 's':
                    return 'ns-resize';
                case 'e':
                case 'w':
                    return 'ew-resize';
                default:
                    return 'default';
            }
        }
        return 'default';
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
    const handlePositions = getHandlePositions();

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
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            style={{ cursor: getCursor() }}
                        >
                            <Layer>
                                {/* Original Image */}
                                <KonvaImage image={img} />

                                {/* Dark Overlay - Split into 4 rectangles */}
                                {/* Top */}
                                <Rect
                                    x={0}
                                    y={0}
                                    width={img.width}
                                    height={cropBox.y}
                                    fill="black"
                                    opacity={0.6}
                                />
                                {/* Bottom */}
                                <Rect
                                    x={0}
                                    y={cropBox.y + cropBox.height}
                                    width={img.width}
                                    height={img.height - (cropBox.y + cropBox.height)}
                                    fill="black"
                                    opacity={0.6}
                                />
                                {/* Left */}
                                <Rect
                                    x={0}
                                    y={cropBox.y}
                                    width={cropBox.x}
                                    height={cropBox.height}
                                    fill="black"
                                    opacity={0.6}
                                />
                                {/* Right */}
                                <Rect
                                    x={cropBox.x + cropBox.width}
                                    y={cropBox.y}
                                    width={img.width - (cropBox.x + cropBox.width)}
                                    height={cropBox.height}
                                    fill="black"
                                    opacity={0.6}
                                />

                                {/* Crop Box Border */}
                                <Rect
                                    x={cropBox.x}
                                    y={cropBox.y}
                                    width={cropBox.width}
                                    height={cropBox.height}
                                    stroke="white"
                                    strokeWidth={3}
                                    fill="transparent"
                                />

                                {/* Grid lines inside crop box (Rule of thirds) */}
                                <Rect
                                    x={cropBox.x + cropBox.width / 3}
                                    y={cropBox.y}
                                    width={1}
                                    height={cropBox.height}
                                    fill="white"
                                    opacity={0.4}
                                />
                                <Rect
                                    x={cropBox.x + (cropBox.width * 2) / 3}
                                    y={cropBox.y}
                                    width={1}
                                    height={cropBox.height}
                                    fill="white"
                                    opacity={0.4}
                                />
                                <Rect
                                    x={cropBox.x}
                                    y={cropBox.y + cropBox.height / 3}
                                    width={cropBox.width}
                                    height={1}
                                    fill="white"
                                    opacity={0.4}
                                />
                                <Rect
                                    x={cropBox.x}
                                    y={cropBox.y + (cropBox.height * 2) / 3}
                                    width={cropBox.width}
                                    height={1}
                                    fill="white"
                                    opacity={0.4}
                                />

                                {/* Circle Resize Handles */}
                                {Object.entries(handlePositions).map(([handleKey, position]) => {
                                    const isHovered = hoveredHandle === handleKey;
                                    const isActive = resizeHandle === handleKey;
                                    const radius = isHovered || isActive ? handleRadius + 2 : handleRadius;

                                    return (
                                        <Circle
                                            key={handleKey}
                                            x={position.x}
                                            y={position.y}
                                            radius={radius}
                                            fill={isActive ? "#3b82f6" : isHovered ? "#60a5fa" : "white"}
                                            stroke={isActive ? "#1d4ed8" : isHovered ? "#3b82f6" : "#374151"}
                                            strokeWidth={2}
                                            shadowColor="black"
                                            shadowOffset={{ x: 1, y: 1 }}
                                            shadowOpacity={0.3}
                                            shadowBlur={3}
                                        />
                                    );
                                })}

                                {/* Corner Handle Indicators (Small dots inside corner handles) */}
                                {['nw', 'ne', 'sw', 'se'].map(handleKey => {
                                    const position = handlePositions[handleKey];
                                    return (
                                        <Circle
                                            key={`${handleKey}-indicator`}
                                            x={position.x}
                                            y={position.y}
                                            radius={3}
                                            fill="#374151"
                                            opacity={0.7}
                                        />
                                    );
                                })}

                                {/* Side Handle Indicators (Small lines) */}
                                {['n', 's'].map(handleKey => {
                                    const position = handlePositions[handleKey];
                                    return (
                                        <Rect
                                            key={`${handleKey}-indicator`}
                                            x={position.x - 6}
                                            y={position.y - 1}
                                            width={12}
                                            height={2}
                                            fill="#374151"
                                            opacity={0.7}
                                        />
                                    );
                                })}

                                {['w', 'e'].map(handleKey => {
                                    const position = handlePositions[handleKey];
                                    return (
                                        <Rect
                                            key={`${handleKey}-indicator`}
                                            x={position.x - 1}
                                            y={position.y - 6}
                                            width={2}
                                            height={12}
                                            fill="#374151"
                                            opacity={0.7}
                                        />
                                    );
                                })}
                            </Layer>
                        </Stage>
                    </div>
                </div>

                {/* Instructions */}
                <div className="mb-4 text-center">
                    <p className="text-gray-400 text-sm">
                        Drag the circles to resize • Click and drag inside the crop area to move • Use grid lines for better composition
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                    <button
                        onClick={resetCrop}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                        <RotateCcw size={16} />
                        Reset
                    </button>

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCrop}
                            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg"
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