type RenderType = string;

interface RenderTypeDescriptor {
  name: RenderType;
}

type ResolvedRenderType = Omit<RenderTypeDescriptor, 'name'>;

export type { RenderType, RenderTypeDescriptor, ResolvedRenderType };
