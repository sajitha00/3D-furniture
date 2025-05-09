import React from "react";
import PropTypes from "prop-types";
import { Stage, Layer, Rect } from "react-konva";
import "./Canvas2d.css";

export default function Canvas2d({
  width, length, unit,
  furnitures, selectedId,
  onSelectFurniture,
  onFurnitureDragEnd,
  showGrid,
}) {
  const px = 30;
  const roomW = width * px;
  const roomH = length * px;
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  return (
    <div className="canvas-container">
      <Stage width={roomW} height={roomH}>
        <Layer>
          {/* room boundary */}
          <Rect
            x={0} y={0}
            width={roomW} height={roomH}
            stroke="#333" strokeWidth={2} dash={[8,4]}
          />

          {/* grid */}
          {showGrid && Array.from({length: width}).map((_, i) => (
            <Rect
              key={`v${i}`}
              x={i*px} y={0}
              width={1} height={roomH}
              fill="#eee"
            />
          ))}
          {showGrid && Array.from({length: length}).map((_, i) => (
            <Rect
              key={`h${i}`}
              x={0} y={i*px}
              width={roomW} height={1}
              fill="#eee"
            />
          ))}

          {/* furniture */}
          {furnitures.map(f => {
            const wPx = f.w * px;
            const hPx = f.h * px;
            const xPx = f.x * px;
            const yPx = f.y * px;

            return (
              <Rect
                key={f.id}
                x={xPx} y={yPx}
                width={wPx} height={hPx}
                fill="skyblue"
                stroke={f.id === selectedId ? "orange" : "#000"}
                strokeWidth={2}
                rotation={f.rotY || 0}
                offsetX={wPx/2}
                offsetY={hPx/2}
                draggable
                dragBoundFunc={pos => ({
                  x: clamp(pos.x, 0, roomW - wPx),
                  y: clamp(pos.y, 0, roomH - hPx),
                })}
                onClick={() => onSelectFurniture(f.id)}
                onDragEnd={e => {
                  const newX = (e.target.x() - f.w * px / 2) / px;
                  const newY = (e.target.y() - f.h * px / 2) / px;
                  onFurnitureDragEnd(f.id, newX, newY);
                }}                
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
}

Canvas2d.propTypes = {
  width:               PropTypes.number.isRequired,
  length:              PropTypes.number.isRequired,
  unit:                PropTypes.oneOf(["m","ft"]).isRequired,
  furnitures:          PropTypes.array.isRequired,
  selectedId:          PropTypes.any,
  onSelectFurniture:   PropTypes.func.isRequired,
  onFurnitureDragEnd:  PropTypes.func.isRequired,
  showGrid:            PropTypes.bool.isRequired,
};
