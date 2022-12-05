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

export function getDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
}

export function getDateByString(dateText: string) {
  const date = new Date(dateText);

  return getDate(date);
}

export function getUTCDate(date: Date) {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60 * 1000).toISOString().split('T')[0];
}

export function getUTCDateByString(dateText: string) {
  const date = new Date(dateText);

  return getUTCDate(date);
}

export function hasSearchInUrl(url: string) {
  const urlObject = new URL(url);

  return urlObject.search.length > 0;
}

export function delimiterSearchParam(url: string) {
  if (hasSearchInUrl(url)) {
    return '&';
  }

  return '?';
}
