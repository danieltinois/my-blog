let shortcutInitialized = false;

const getSearchInput = (): HTMLInputElement | null => {
  const inputs = Array.from(
    document.querySelectorAll('[data-search-input="true"]'),
  ) as HTMLInputElement[];

  return (
    inputs.find((input) => input.offsetParent !== null && !input.disabled) ??
    inputs[0] ??
    null
  );
};

const handleKeyDown = (e: KeyboardEvent) => {
  if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== "k") {
    return;
  }

  const searchInput = getSearchInput();

  if (!searchInput) return;

  e.preventDefault();
  searchInput.focus();
};

export function initSearchShortcut() {
  document.querySelectorAll("[data-kbd-platform]").forEach((icon) => {
    const isMac = navigator.platform.toUpperCase().includes("MAC");
    icon.textContent = isMac ? "⌘" : "Ctrl";
  });

  if (!shortcutInitialized) {
    window.addEventListener("keydown", handleKeyDown);
    shortcutInitialized = true;
  }
}
