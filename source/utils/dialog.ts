export function openDialog(id: string) {
  const element = document.getElementById(id) as HTMLDialogElement | null;
  if (element && typeof element.showModal === 'function') {
    if (!element.open) element.showModal();
  }
}

export function closeDialog(id: string) {
  const element = document.getElementById(id) as HTMLDialogElement | null;
  if (element && typeof element.close === 'function' && element.open) {
    element.close();
  }
}

export function toggleDialog(id: string) {
  const element = document.getElementById(id) as HTMLDialogElement | null;
  if (!element) return;
  if (element.open) element.close();
  else element.showModal();
}
