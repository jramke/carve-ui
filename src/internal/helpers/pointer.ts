import { pointInPolygon, Polygon } from "./polygon";

export function isPointerInGraceArea(
	e: Pick<PointerEvent, 'clientX' | 'clientY'>,
	area?: Polygon
): boolean {
	if (!area) return false;
	return pointInPolygon({ x: e.clientX, y: e.clientY }, area);
}

export function isTouch(event: PointerEvent): boolean {
	return event.pointerType === 'touch';
}