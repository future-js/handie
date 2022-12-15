import { RenderType, RenderTypeDescriptor, ResolvedRenderType } from './typing';

const typeMap = new Map<RenderType, ResolvedRenderType>();

function registerRenderType({ name, ...others }: RenderTypeDescriptor): void {
  typeMap.set(name, others);
}

function getRenderType(name: RenderType): ResolvedRenderType | undefined {
  return typeMap.get(name);
}

function isRenderTypeValid(name: RenderType): boolean {
  return typeMap.has(name);
}

export { registerRenderType, getRenderType, isRenderTypeValid };
