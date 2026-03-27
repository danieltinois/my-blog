export function initSearchShortcut() {
  const searchInput = document.getElementById(
    "search-input",
  ) as HTMLInputElement | null;
  const kbdIcon = document.getElementById("kbd-platform");

  if (!searchInput) return;

  if (kbdIcon) {
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    kbdIcon.textContent = isMac ? "⌘" : "Ctrl";
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLocaleLowerCase() === "k") {
      e.preventDefault();
      searchInput.focus();
    }
  };

  window.removeEventListener("keydown", handleKeyDown);
  window.addEventListener("keydown", handleKeyDown);
}
