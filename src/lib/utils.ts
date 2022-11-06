import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import GithubSlugger from 'github-slugger';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const slugger = new GithubSlugger();

export function slugify(str: string) {
  return slugger.slug(str);
}

export function getDateString(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}
