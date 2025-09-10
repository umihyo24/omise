export function setupInput(state, getMenuOptions, onSelect) {
  window.addEventListener('keydown', e => {
    const opts = getMenuOptions();
    if (e.key === 'ArrowUp') {
      state.menuIndex = (state.menuIndex - 1 + opts.length) % opts.length;
    } else if (e.key === 'ArrowDown') {
      state.menuIndex = (state.menuIndex + 1) % opts.length;
    } else if (e.key === 'Enter') {
      onSelect();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      state.tabIndex = (state.tabIndex + 1) % state.tabs.length;
      state.menuIndex = 0;
    }
  });
}
