/**
 * Tema claro/escuro — única fonte de verdade para JS.
 * O script inline em `base.astro` deve espelhar a lógica de `getEffectiveThemeSync`
 * (evita flash antes do CSS; não dá para importar módulos ali).
 */

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(THEME_STORAGE_KEY);
  if (v === "light" || v === "dark") return v;
  return null;
}

export function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/** Preferência final: escolha salva ou sistema. */
export function getEffectiveTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme();
}

export function isDarkTheme(theme: Theme): boolean {
  return theme === "dark";
}

export function rootIsDark(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

/** Só altera a classe em `<html>` (e dispara evento). */
export function applyRootClass(theme: Theme): void {
  document.documentElement.classList.toggle("dark", theme === "dark");
  window.dispatchEvent(
    new CustomEvent("themechange", { detail: { theme } }),
  );
}

/** Persiste e aplica (uso no toggle manual). */
export function setTheme(theme: Theme): void {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  applyRootClass(theme);
}

/** Alterna e persiste a nova escolha. */
export function toggleTheme(): Theme {
  const next: Theme = getEffectiveTheme() === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}

/** Após navegação (View Transitions): re-sincroniza com preferência salva/sistema. */
export function syncRootFromPreferences(): void {
  applyRootClass(getEffectiveTheme());
}
