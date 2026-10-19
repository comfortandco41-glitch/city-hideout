import React, { useRef, useState } from 'react';
import { ContextualActionPrompt } from '../game/rules';

interface MobileControlsProps {
  visible: boolean;
  role: 'hider' | 'seeker';
  sensitivity: number;
  contextualActions: ContextualActionPrompt[];
  isHoldingObjective: boolean;
  onJoystickMove: (x: number, y: number) => void;
  onTriggerAction: (action: ContextualActionPrompt) => void;
  onHoldObjectiveChange: (holding: boolean) => void;
}

export const MobileControls: React.FC<MobileControlsProps> = ({
  visible,
  role,
  sensitivity,
  contextualActions,
  isHoldingObjective,
  onJoystickMove,
  onTriggerAction,
  onHoldObjectiveChange,
}) => {
  const baseRef = useRef<HTMLDivElement | null>(null);
  const [knobOffset, setKnobOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  if (!visible) return null;

  const maxRadius = 44;

  const updateVectorFromClientXY = (clientX: number, clientY: number) => {
    if (!baseRef.current) return;
    const rect = baseRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (clientX - centerX) * sensitivity;
    const dy = (clientY - centerY) * sensitivity;
    const dist = Math.hypot(dx, dy);
    const clampedDist = Math.min(dist, maxRadius);
    const angle = Math.atan2(dy, dx);
    const kx = dist > 2 ? Math.cos(angle) * clampedDist : 0;
    const ky = dist > 2 ? Math.sin(angle) * clampedDist : 0;
    setKnobOffset({ x: kx, y: ky });
    onJoystickMove(kx / maxRadius, ky / maxRadius);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    updateVectorFromClientXY(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    e.stopPropagation();
    updateVectorFromClientXY(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setDragging(false);
    setKnobOffset({ x: 0, y: 0 });
    onJoystickMove(0, 0);
  };

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 flex items-end justify-between px-7 pb-7 sm:px-10 sm:pb-9"
      aria-label="Mobile touch controls"
    >
      {/* Left Side: Virtual Thumb Joystick */}
      <div
        ref={baseRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        role="slider"
        aria-label="Virtual movement joystick"
        aria-valuetext={`${Math.round((knobOffset.x / maxRadius) * 100)}% X, ${Math.round(
          (knobOffset.y / maxRadius) * 100
        )}% Y`}
        tabIndex={-1}
        className="pointer-events-auto relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#090D16]/85 border-2 border-slate-600/80 shadow-[0_8px_24px_rgba(0,0,0,0.65)] flex items-center justify-center touch-none select-none"
      >
        {/* Crosshair directional ticks */}
        <div className="w-20 h-0.5 bg-slate-700/50 absolute pointer-events-none" />
        <div className="h-20 w-0.5 bg-slate-700/50 absolute pointer-events-none" />
        {/* Thumb Knob */}
        <div
          style={{
            transform: `translate3d(${knobOffset.x}px, ${knobOffset.y}px, 0)`,
          }}
          className={`w-12 h-12 rounded-full border-2 shadow-md transition-transform duration-75 pointer-events-none ${
            role === 'seeker'
              ? 'bg-red-600/90 border-red-300'
              : 'bg-emerald-600/90 border-emerald-300'
          }`}
        />
      </div>

      {/* Right Side: Contextual Role Action Buttons (Only shown when an action is currently available!) */}
      <div className="pointer-events-auto flex flex-col items-end gap-3">
        {contextualActions.map((act) => {
          const isObj = act.action === 'objective';
          const isElim = act.action === 'eliminate';
          const isInspect = act.action === 'inspect';

          if (isObj) {
            return (
              <button
                key={act.action}
                type="button"
                aria-label={act.label}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  onHoldObjectiveChange(true);
                }}
                onPointerUp={(e) => {
                  e.stopPropagation();
                  onHoldObjectiveChange(false);
                }}
                onPointerLeave={() => {
                  if (isHoldingObjective) onHoldObjectiveChange(false);
                }}
                onClick={() => onHoldObjectiveChange(!isHoldingObjective)}
                className={`min-h-[56px] min-w-[168px] px-5 py-3 rounded-2xl font-display font-bold text-sm tracking-wide border-2 shadow-xl active:scale-95 transition-transform flex flex-col items-center justify-center ${
                  isHoldingObjective
                    ? 'bg-emerald-500 text-slate-950 border-emerald-200'
                    : 'bg-amber-500 text-slate-950 border-amber-200'
                }`}
              >
                <span>{isHoldingObjective ? 'HOLDING BEACON...' : 'HOLD BEACON'}</span>
                <span className="text-[11px] font-mono opacity-90">{act.sublabel}</span>
              </button>
            );
          }

          return (
            <button
              key={`${act.action}_${act.targetId || ''}`}
              type="button"
              aria-label={act.label}
              onClick={(e) => {
                e.stopPropagation();
                onTriggerAction(act);
              }}
              className={`min-h-[56px] min-w-[164px] px-5 py-3 rounded-2xl font-display font-bold text-sm tracking-wide border-2 shadow-xl active:scale-95 transition-transform flex flex-col items-center justify-center ${
                isElim
                  ? 'bg-red-600 text-white border-red-300'
                  : isInspect
                  ? 'bg-amber-500 text-slate-950 border-amber-200'
                  : 'bg-emerald-600 text-white border-emerald-300'
              }`}
            >
              <span>
                {act.action === 'hide'
                  ? 'HIDE INSIDE'
                  : act.action === 'exit_hide'
                  ? 'EXIT HIDING'
                  : act.action === 'eliminate'
                  ? 'ELIMINATE HIDER'
                  : 'INSPECT OBJECT'}
              </span>
              <span className="text-[11px] font-sans font-medium opacity-90 truncate max-w-[180px]">
                {act.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
