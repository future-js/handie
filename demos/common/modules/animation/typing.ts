interface AnimationEntity {
  id: string;
  title: string;
  description: string;
  date: {
    start: string;
    end: string;
  };
  episodes: string[];
}

export type { AnimationEntity };
