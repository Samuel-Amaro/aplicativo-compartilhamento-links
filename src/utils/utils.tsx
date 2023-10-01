"use client";

export type PropsIcon = { className?: string };

export const patternsUrlsPlatforms: {
  platform: string;
  urlPlaceholder: string;
  urlPattern: string;
}[] = [
  {
    platform: "Frontend Mentor",
    urlPlaceholder: "https://www.frontendmentor.io/profile/:username",
    urlPattern: "https://www.frontendmentor.io/profile/.*",
  },
  {
    platform: "GitHub",
    urlPlaceholder: "https://www.github.com/:username",
    urlPattern: "https://www.github.com/.*",
  },
  {
    platform: "YouTube",
    urlPlaceholder: "https://www.youtube.com/@username",
    urlPattern: "https://www.youtube.com/.*",
  },
  {
    platform: "Twitter",
    urlPlaceholder: "https://twitter.com/:username",
    urlPattern: "https://twitter.com/.*",
  },
  {
    platform: "Linkedln",
    urlPlaceholder: "https://www.linkedin.com/in/:username",
    urlPattern: "https://www.linkedin.com/in/.*",
  },
  {
    platform: "Facebook",
    urlPlaceholder: "https://www.facebook.com/:username",
    urlPattern: "https://www.facebook.com/.*",
  },
  {
    platform: "Twitch",
    urlPlaceholder: "https://www.twitch.tv/:username",
    urlPattern: "https://www.twitch.tv/.*",
  },
  {
    platform: "Dev.to",
    urlPlaceholder: "https://dev.to/:username",
    urlPattern: "https://dev.to/.*",
  },
  {
    platform: "Codewars",
    urlPlaceholder: "https://www.codewars.com/",
    urlPattern: "https://www.codewars.com/.*",
  },
  {
    platform: "Codepen",
    urlPlaceholder: "https://codepen.io/:username",
    urlPattern: "https://codepen.io/.*",
  },
  {
    platform: "FreeCodeCamp",
    urlPlaceholder: "https://www.freecodecamp.org/",
    urlPattern: "https://www.freecodecamp.org/.*",
  },
  {
    platform: "GitLab",
    urlPlaceholder: "https://gitlab.com/:username",
    urlPattern: "https://gitlab.com/.*",
  },
  {
    platform: "Hashnode",
    urlPlaceholder: "https://hashnode.com/@username",
    urlPattern: "https://hashnode.com/.*",
  },
  {
    platform: "Stack Overflow",
    urlPlaceholder: "https://stackoverflow.com/users/:number/:username",
    urlPattern: "https://stackoverflow.com/users/[0-9]*/.*",
  },
];

export const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
];

export function isValidDimensionsImage(file: File) {
  return new Promise<boolean>((resolve) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => {
      console.log(image.width);
      console.log(image.height);
      if (image.width <= 1024 && image.height <= 1024) {
        resolve(true);
      } else {
        resolve(false);
      }
    };
  });
}

export function validFileType(file: File) {
  return fileTypes.includes(file.type);
}

/**
 * esta function encontrar elementos que podem receber foco dentro de um elemento pai certificando-se de excluir qualquer coisa com tabindex=-1. Também classificamos os elementos para seguir a ordem
 *
 * https://zellwk.com/blog/keyboard-focusable-elements/
 *
 * @param parent
 * @returns
 */
export function getFocusableElements(
  parent?: HTMLElement | null,
): HTMLElement[] {
  if (!parent) return [];

  return (
    Array.from(
      parent.querySelectorAll(
        "a[href], button, input, textarea, select, details,[tabindex]",
      ),
    )
      .filter(
        (el) =>
          el.getAttribute("tabindex") !== "-1" &&
          !el.hasAttribute("disabled") &&
          !el.getAttribute("aria-hidden"),
      )
      // sort tabindexes as follows: 1, 2, 3, 4, ..., 0, 0, 0
      .sort((a, b) => {
        const aIndex = Number(a.getAttribute("tabindex")) ?? 0;
        const bIndex = Number(b.getAttribute("tabindex")) ?? 0;
        if (aIndex === bIndex) return 0;
        if (aIndex === 0) return 1;
        if (bIndex === 0) return -1;
        return aIndex < bIndex ? -1 : 1;
      }) as HTMLElement[]
  );
}

/**
 * esta function percorre um determinado array de elementos que podem receber focus
 *
 * https://blog.bitsrc.io/simple-accessible-modal-in-react-typescript-and-tailwind-3296704a985a
 *
 * @param elements
 * @param forward
 */
export function nextFocusable(elements: HTMLElement[], forward = true) {
  const currentIndex = elements.findIndex((e) => e === document.activeElement);
  let nextIndex = 0;

  if (currentIndex > -1) {
    if (forward) {
      nextIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : 0;
    } else {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : elements.length - 1;
    }
  }

  elements[nextIndex]?.focus();
}

export function getRefs<T extends HTMLElement>(
  refs: React.MutableRefObject<T[] | null>,
) {
  if (!refs.current) {
    refs.current = [];
  }
  return refs.current;
}

export function setToFocus<T extends HTMLElement>(
  itemId: number,
  refs: React.MutableRefObject<T[] | null>,
) {
  const refsItems = getRefs(refs);
  const refItem = refsItems[itemId];
  refItem?.focus();
}

export function setToFocusPreviousItem<T extends HTMLElement>(
  itemCurrent: T,
  refs: React.MutableRefObject<T[] | null>,
) {
  const refItems = getRefs(refs);
  let itemSelected = null;
  if (itemCurrent === refItems[0]) {
    itemSelected = itemCurrent;
  } else {
    const index = refItems.indexOf(itemCurrent);
    itemSelected = refItems[index - 1];
  }
  itemSelected.focus();
}

export function setFocusNextItem<T extends HTMLElement>(
  itemCurrent: T,
  refs: React.MutableRefObject<T[] | null>,
) {
  const refItems = getRefs(refs);
  let itemSelected = null;
  if (itemCurrent === refItems[refItems.length - 1]) {
    itemSelected = itemCurrent;
  } else {
    const index = refItems.indexOf(itemCurrent);
    itemSelected = refItems[index + 1];
  }
  itemSelected.focus();
}

export function getLocalStorage<Type>(
  key: string,
  initialValue: Type | (() => Type),
) {
  if (typeof window !== "undefined") {
    const data = window.localStorage.getItem(key);
    if (!data) {
      if (typeof initialValue === "function") {
        return (initialValue as () => Type)();
      } else {
        return initialValue;
      }
    }
    return JSON.parse(data) as Type;
  } else {
    if (typeof initialValue === "function") {
      return (initialValue as () => Type)();
    } else {
      return initialValue;
    }
  }
}

export function setLocalStorage(key: string, value: unknown) {
  if (typeof window !== "undefined") {
    const data = JSON.stringify(value);
    window.localStorage.setItem(key, data);
  }
}
