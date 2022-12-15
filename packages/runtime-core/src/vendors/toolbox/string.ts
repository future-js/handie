import { capitalize } from '@ntks/toolbox';

function toPascalCase(string: string): string {
  return string
    .split('-')
    .map(part => capitalize(part))
    .join('');
}

function toKebabCase(string: string): string {
  const resolved = string.replace(/([A-Z])/g, '-$1').toLowerCase();

  return resolved.charAt(0) === '-' ? resolved.slice(1) : resolved;
}

export { toPascalCase, toKebabCase };
