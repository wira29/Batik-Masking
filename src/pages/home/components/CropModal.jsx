import { Check, Crop, RotateCcw, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Image as KonvaImage, Layer, Rect, Stage } from 'react-konva';
import useImage from 'use-image';

const CropModal = ({ isOpen, onClose, imageData, onCropComplete }) => {
    const [img] = useImage(imageData.src);
    const [cropBox, setCropBox] = useState({ x: 0, y: 0, width: 200, height: 200 });
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const stageRef = useRef();

    useEffect(() => {
        if (img && isOpen) {
            const size = Math.min(img.width, img.height, 300);
            setCropBox({
                x: (img.width - size) / 2,
                y: (img.height - size) / 2,
                width: size,
                height: size
            });
        }
    }, [img, isOpen]);

    if (!isOpen || !img) return null;

    const scale = Math.min(800 / img.width, 600 / img.height, 1);
    const displayWidth = img.width * scale;
    const displayHeight = img.height * scale;

    const handleMouseDown = (e) => {
        const stage = e.target.getStage();
        const pos = stage.getPointerPosition();
        const scaledX = pos.x / scale;
        const scaledY = pos.y / scale;
        
        const handleSize = 10;
        
        // Check all corner handles
        const handles = [
            { x: cropBox.x + cropBox.width - handleSize, y: cropBox.y + cropBox.height - handleSize, type: 'se' },
            { x: cropBox.x - handleSize, y: cropBox.y - handleSize, type: 'nw' },
            { x: cropBox.x + cropBox.width - handleSize, y: cropBox.y - handleSize, type: 'ne' },
            { x: cropBox.x - handleSize, y: cropBox.y + cropBox.height - handleSize, type: 'sw' }
        ];
        
        const clickedHandle = handles.find(handle => 
            scaledX >= handle.x && scaledX <= handle.x + 20 &&
            scaledY >= handle.y && scaledY <= handle.y + 20
        );

        const isInsideCrop = 
            scaledX >= cropBox.x && scaledX <= cropBox.x + cropBox.width &&
            scaledY >= cropBox.y && scaledY <= cropBox.y + cropBox.height;

        if (clickedHandle) {
            setIsResizing(clickedHandle.type);
            setDragStart({ x: scaledX, y: scaledY, originalCropBox: { ...cropBox } });
        } else if (isInsideCrop) {
            setIsDragging(true);
            setDragStart({ x: scaledX - cropBox.x, y: scaledY - cropBox.y });
        }
    };

    const handleMouseMove = (e) => {
        if (!isDragging && !isResizing) return;

        const stage = e.target.getStage();
        const pos = stage.getPointerPosition();
        const scaledX = pos.x / scale;
        const scaledY = pos.y / scale;

        if (isDragging) {
            const newX = Math.max(0, Math.min(img.width - cropBox.width, scaledX - dragStart.x));
            const newY = Math.max(0, Math.min(img.height - cropBox.height, scaledY - dragStart.y));
            setCropBox(prev => ({ ...prev, x: newX, y: newY }));
        } else if (isResizing) {
            const { originalCropBox } = dragStart;
            const deltaX = scaledX - dragStart.x;
            const deltaY = scaledY - dragStart.y;

            let newCropBox = { ...originalCropBox };

            switch (isResizing) {
                case 'se':
                    newCropBox.width = Math.max(50, Math.min(img.width - originalCropBox.x, originalCropBox.width + deltaX));
                    newCropBox.height = Math.max(50, Math.min(img.height - originalCropBox.y, originalCropBox.height + deltaY));
                    break;
                case 'nw':
                    const newWidth = Math.max(50, originalCropBox.width - deltaX);
                    const newHeight = Math.max(50, originalCropBox.height - deltaY);
                    newCropBox.x = Math.max(0, originalCropBox.x + originalCropBox.width - newWidth);
                    newCropBox.y = Math.max(0, originalCropBox.y + originalCropBox.height - newHeight);
                    newCropBox.width = newWidth;
                    newCropBox.height = newHeight;
                    break;
                case 'ne':
                    newCropBox.width = Math.max(50, Math.min(img.width - originalCropBox.x, originalCropBox.width + deltaX));
                    const newHeightNE = Math.max(50, originalCropBox.height - deltaY);
                    newCropBox.y = Math.max(0, originalCropBox.y + originalCropBox.height - newHeightNE);
                    newCropBox.height = newHeightNE;
                    break;
                case 'sw':
                    const newWidthSW = Math.max(50, originalCropBox.width - deltaX);
                    newCropBox.x = Math.max(0, originalCropBox.x + originalCropBox.width - newWidthSW);
                    newCropBox.width = newWidthSW;
                    newCropBox.height = Math.max(50, Math.min(img.height - originalCropBox.y, originalCropBox.height + deltaY));
                    break;
            }

            setCropBox(newCropBox);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
    };

    const handleCrop = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = cropBox.width;
        canvas.height = cropBox.height;

        ctx.drawImage(
            img,
            cropBox.x, cropBox.y, cropBox.width, cropBox.height,
            0, 0, cropBox.width, cropBox.height
        );

        onCropComplete({
            ...imageData,
            src: canvas.toDataURL('image/png', 0.95),
            width: cropBox.width,
            height: cropBox.height,
            crop: null
        });
    };

    const resetCrop = () => {
        const size = Math.min(img.width, img.height, 300);
        setCropBox({
            x: (img.width - size) / 2,
            y: (img.height - size) / 2,
            width: size,
            height: size
        });
    };

    const getCursor = () => {
        if (isDragging) return 'grabbing';
        if (isResizing === 'se' || isResizing === 'nw') return 'nw-resize';
        if (isResizing === 'ne' || isResizing === 'sw') return 'ne-resize';
        if (isResizing) return 'crosshair';
        return 'grab';
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden border border-gray-800">
                
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600 rounded-lg">
                            <Crop className="text-white" size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Crop Image</h2>
                            <p className="text-gray-400 text-sm">Adjust the crop area by dragging</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex justify-center mb-6">
                        <div 
                            className="relative rounded-lg overflow-hidden border border-gray-700 shadow-lg"
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
                                style={{ cursor: getCursor() }}
                            >
                                <Layer>
                                    <KonvaImage image={img} />
                                    
                                    <Rect
                                        x={0}
                                        y={0}
                                        width={img.width}
                                        height={img.height}
                                        fill="rgba(0,0,0,0.6)"
                                    />
                                    
                                    {/* Grid Lines */}
                                    {Array.from({ length: Math.floor(img.width / 50) }).map((_, i) => (
                                        <Rect
                                            key={`vertical-${i}`}
                                            x={i * 50}
                                            y={0}
                                            width={1}
                                            height={img.height}
                                            fill="rgba(255,255,255,0.1)"
                                        />
                                    ))}
                                    {Array.from({ length: Math.floor(img.height / 50) }).map((_, i) => (
                                        <Rect
                                            key={`horizontal-${i}`}
                                            x={0}
                                            y={i * 50}
                                            width={img.width}
                                            height={1}
                                            fill="rgba(255,255,255,0.1)"
                                        />
                                    ))}
                                    
                                    <Rect
                                        x={cropBox.x}
                                        y={cropBox.y}
                                        width={cropBox.width}
                                        height={cropBox.height}
                                        globalCompositeOperation="destination-out"
                                    />
                                    
                                    <Rect
                                        x={cropBox.x}
                                        y={cropBox.y}
                                        width={cropBox.width}
                                        height={cropBox.height}
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        fill="transparent"
                                        dash={[10, 10]}
                                    />
                                    
                                    {/* Rule of thirds grid inside crop area */}
                                    <Rect
                                        x={cropBox.x + cropBox.width / 3}
                                        y={cropBox.y}
                                        width={1}
                                        height={cropBox.height}
                                        fill="rgba(59,130,246,0.4)"
                                    />
                                    <Rect
                                        x={cropBox.x + (2 * cropBox.width) / 3}
                                        y={cropBox.y}
                                        width={1}
                                        height={cropBox.height}
                                        fill="rgba(59,130,246,0.4)"
                                    />
                                    <Rect
                                        x={cropBox.x}
                                        y={cropBox.y + cropBox.height / 3}
                                        width={cropBox.width}
                                        height={1}
                                        fill="rgba(59,130,246,0.4)"
                                    />
                                    <Rect
                                        x={cropBox.x}
                                        y={cropBox.y + (2 * cropBox.height) / 3}
                                        width={cropBox.width}
                                        height={1}
                                        fill="rgba(59,130,246,0.4)"
                                    />
                                    
                                    {/* Corner handles */}
                                    <Rect
                                        x={cropBox.x + cropBox.width - 10}
                                        y={cropBox.y + cropBox.height - 10}
                                        width={20}
                                        height={20}
                                        fill="#3b82f6"
                                        stroke="white"
                                        strokeWidth={2}
                                        cornerRadius={4}
                                    />
                                    
                                    {/* Additional corner handles */}
                                    <Rect
                                        x={cropBox.x - 10}
                                        y={cropBox.y - 10}
                                        width={20}
                                        height={20}
                                        fill="#10b981"
                                        stroke="white"
                                        strokeWidth={2}
                                        cornerRadius={4}
                                    />
                                    <Rect
                                        x={cropBox.x + cropBox.width - 10}
                                        y={cropBox.y - 10}
                                        width={20}
                                        height={20}
                                        fill="#10b981"
                                        stroke="white"
                                        strokeWidth={2}
                                        cornerRadius={4}
                                    />
                                    <Rect
                                        x={cropBox.x - 10}
                                        y={cropBox.y + cropBox.height - 10}
                                        width={20}
                                        height={20}
                                        fill="#10b981"
                                        stroke="white"
                                        strokeWidth={2}
                                        cornerRadius={4}
                                    />
                                </Layer>
                            </Stage>

                            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur text-white text-sm px-3 py-2 rounded-lg border border-blue-500/30">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                    <span className="font-medium">Drag • Resize • Rule of thirds</span>
                                </div>
                            </div>

                            <div className="absolute top-3 right-3 bg-black/80 backdrop-blur text-white text-xs px-3 py-2 rounded-lg border border-blue-500/30">
                                <div className="font-mono font-bold text-blue-300">
                                    {Math.round(cropBox.width)} × {Math.round(cropBox.height)}
                                </div>
                                <div className="text-gray-400 text-center mt-1">
                                    {((cropBox.width * cropBox.height) / (img.width * img.height) * 100).toFixed(1)}%
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <button
                            onClick={resetCrop}
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white rounded-lg transition-all duration-200 font-medium"
                        >
                            <RotateCcw size={16} />
                            Reset
                        </button>

                        <button
                            onClick={onClose}
                            className="px-4 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white rounded-lg transition-all duration-200 font-medium"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleCrop}
                            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 font-medium shadow-lg border border-blue-500/30"
                        >
                            <Check size={16} />
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CropModal;