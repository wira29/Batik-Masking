import { Check, Crop, RotateCcw, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Image as KonvaImage, Layer, Rect, Stage } from 'react-konva';
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
        const scale = Math.min(600 / img.width, 500 / img.height, 1);
        const handleSize = 16; // Perbesar area hit detection

        console.log('Mouse down at:', pos); // Debug log

        // Konversi posisi mouse ke koordinat image
        const imagePos = {
            x: pos.x / scale,
            y: pos.y / scale
        };

        // Hitung posisi handles dengan toleransi yang lebih besar
        const handles = {
            'nw': { // top-left
                x: cropBox.x - handleSize / 2,
                y: cropBox.y - handleSize / 2,
                width: handleSize,
                height: handleSize
            },
            'ne': { // top-right
                x: cropBox.x + cropBox.width - handleSize / 2,
                y: cropBox.y - handleSize / 2,
                width: handleSize,
                height: handleSize
            },
            'sw': { // bottom-left
                x: cropBox.x - handleSize / 2,
                y: cropBox.y + cropBox.height - handleSize / 2,
                width: handleSize,
                height: handleSize
            },
            'se': { // bottom-right
                x: cropBox.x + cropBox.width - handleSize / 2,
                y: cropBox.y + cropBox.height - handleSize / 2,
                width: handleSize,
                height: handleSize
            },
            'n': { // top
                x: cropBox.x + cropBox.width / 2 - handleSize / 2,
                y: cropBox.y - handleSize / 2,
                width: handleSize,
                height: handleSize
            },
            's': { // bottom
                x: cropBox.x + cropBox.width / 2 - handleSize / 2,
                y: cropBox.y + cropBox.height - handleSize / 2,
                width: handleSize,
                height: handleSize
            },
            'w': { // left
                x: cropBox.x - handleSize / 2,
                y: cropBox.y + cropBox.height / 2 - handleSize / 2,
                width: handleSize,
                height: handleSize
            },
            'e': { // right
                x: cropBox.x + cropBox.width - handleSize / 2,
                y: cropBox.y + cropBox.height / 2 - handleSize / 2,
                width: handleSize,
                height: handleSize
            }
        };

        // Cek handle mana yang diklik (langsung dengan imagePos)
        let selectedHandle = null;

        for (const [handle, bounds] of Object.entries(handles)) {
            if (imagePos.x >= bounds.x && imagePos.x <= bounds.x + bounds.width &&
                imagePos.y >= bounds.y && imagePos.y <= bounds.y + bounds.height) {
                selectedHandle = handle;
                console.log('Selected handle:', handle); // Debug log
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
        if (!isDragging && !isResizing) return;

        const pos = e.target.getStage().getPointerPosition();
        const scale = Math.min(600 / img.width, 500 / img.height, 1);
        const imagePos = {
            x: pos.x / scale,
            y: pos.y / scale
        };

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
    const handleSize = 12; // Perbesar handle agar lebih mudah terlihat

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

                                {/* Dark Overlay - Split into 4 rectangles to avoid globalCompositeOperation */}
                                {/* Top */}
                                <Rect
                                    x={0}
                                    y={0}
                                    width={img.width}
                                    height={cropBox.y}
                                    fill="black"
                                    opacity={0.5}
                                />
                                {/* Bottom */}
                                <Rect
                                    x={0}
                                    y={cropBox.y + cropBox.height}
                                    width={img.width}
                                    height={img.height - (cropBox.y + cropBox.height)}
                                    fill="black"
                                    opacity={0.5}
                                />
                                {/* Left */}
                                <Rect
                                    x={0}
                                    y={cropBox.y}
                                    width={cropBox.x}
                                    height={cropBox.height}
                                    fill="black"
                                    opacity={0.5}
                                />
                                {/* Right */}
                                <Rect
                                    x={cropBox.x + cropBox.width}
                                    y={cropBox.y}
                                    width={img.width - (cropBox.x + cropBox.width)}
                                    height={cropBox.height}
                                    fill="black"
                                    opacity={0.5}
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

                                {/* Grid lines inside crop box */}
                                <Rect
                                    x={cropBox.x + cropBox.width / 3}
                                    y={cropBox.y}
                                    width={1}
                                    height={cropBox.height}
                                    fill="white"
                                    opacity={0.5}
                                />
                                <Rect
                                    x={cropBox.x + (cropBox.width * 2) / 3}
                                    y={cropBox.y}
                                    width={1}
                                    height={cropBox.height}
                                    fill="white"
                                    opacity={0.5}
                                />
                                <Rect
                                    x={cropBox.x}
                                    y={cropBox.y + cropBox.height / 3}
                                    width={cropBox.width}
                                    height={1}
                                    fill="white"
                                    opacity={0.5}
                                />
                                <Rect
                                    x={cropBox.x}
                                    y={cropBox.y + (cropBox.height * 2) / 3}
                                    width={cropBox.width}
                                    height={1}
                                    fill="white"
                                    opacity={0.5}
                                />

                                {/* Resize Handles */}
                                {/* Corner handles */}
                                <Rect
                                    x={cropBox.x - handleSize / 2}
                                    y={cropBox.y - handleSize / 2}
                                    width={handleSize}
                                    height={handleSize}
                                    fill="white"
                                    stroke="black"
                                    strokeWidth={1}
                                />
                                <Rect
                                    x={cropBox.x + cropBox.width - handleSize / 2}
                                    y={cropBox.y - handleSize / 2}
                                    width={handleSize}
                                    height={handleSize}
                                    fill="white"
                                    stroke="black"
                                    strokeWidth={1}
                                />
                                <Rect
                                    x={cropBox.x - handleSize / 2}
                                    y={cropBox.y + cropBox.height - handleSize / 2}
                                    width={handleSize}
                                    height={handleSize}
                                    fill="white"
                                    stroke="black"
                                    strokeWidth={1}
                                />
                                <Rect
                                    x={cropBox.x + cropBox.width - handleSize / 2}
                                    y={cropBox.y + cropBox.height - handleSize / 2}
                                    width={handleSize}
                                    height={handleSize}
                                    fill="white"
                                    stroke="black"
                                    strokeWidth={1}
                                />

                                {/* Side handles */}
                                <Rect
                                    x={cropBox.x + cropBox.width / 2 - handleSize / 2}
                                    y={cropBox.y - handleSize / 2}
                                    width={handleSize}
                                    height={handleSize}
                                    fill="white"
                                    stroke="black"
                                    strokeWidth={1}
                                />
                                <Rect
                                    x={cropBox.x + cropBox.width / 2 - handleSize / 2}
                                    y={cropBox.y + cropBox.height - handleSize / 2}
                                    width={handleSize}
                                    height={handleSize}
                                    fill="white"
                                    stroke="black"
                                    strokeWidth={1}
                                />
                                <Rect
                                    x={cropBox.x - handleSize / 2}
                                    y={cropBox.y + cropBox.height / 2 - handleSize / 2}
                                    width={handleSize}
                                    height={handleSize}
                                    fill="white"
                                    stroke="black"
                                    strokeWidth={1}
                                />
                                <Rect
                                    x={cropBox.x + cropBox.width - handleSize / 2}
                                    y={cropBox.y + cropBox.height / 2 - handleSize / 2}
                                    width={handleSize}
                                    height={handleSize}
                                    fill="white"
                                    stroke="black"
                                    strokeWidth={1}
                                />
                            </Layer>
                        </Stage>
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