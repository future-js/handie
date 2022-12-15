import { isFunction } from '@ntks/toolbox';

function createCreator<Creator>(
  defaultCreator: Creator,
): [() => Creator, (creator: Creator) => void] {
  let creator = defaultCreator;

  return [
    () => creator,
    newCreator => {
      if (isFunction(newCreator)) {
        creator = newCreator;
      }
    },
  ];
}

export { createCreator };
