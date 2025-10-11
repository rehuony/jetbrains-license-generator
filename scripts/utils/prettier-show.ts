// Define control variables
export const csi_cpl = '\x1B[1F';
export const csi_el = '\x1B[0K';
// Define cursor variables
export const sgr_reset = '\x1B[0m';
export const sgr_bold = '\x1B[1m';
export const sgr_faint = '\x1B[2m';
export const sgr_italic = '\x1B[3m';
export const sgr_underline = '\x1B[4m';
export const sgr_invert = '\x1B[7m';
export const sgr_strike = '\x1B[9m';
// Define foreground color variables
export const foreground_color_black = '\x1B[38;2;0;0;0m';
export const foreground_color_blue = '\x1B[38;2;0;135;215m';
export const foreground_color_green = '\x1B[38;2;0;175;0m';
export const foreground_color_grey = '\x1B[38;2;128;128;128m';
export const foreground_color_purple = '\x1B[38;2;175;175;255m';
export const foreground_color_red = '\x1B[38;2;215;0;0m';
export const foreground_color_yellow = '\x1B[38;2;215;215;95m';
// Define background color variables
export const background_color_balck = '\x1B[48;2;0;0;0m';
export const background_color_blue = '\x1B[48;2;0;120;200m';
export const background_color_green = '\x1B[48;2;0;160;0m';
export const background_color_grey = '\x1B[48;2;120;120;120m';
export const background_color_purple = '\x1B[48;2;160;160;220m';
export const background_color_red = '\x1B[48;2;200;0;0m';
export const background_color_yellow = '\x1B[48;2;200;200;90m';

export function showInfoText(text: string | number) {
  console.log(`${foreground_color_blue}[INFO] ${sgr_faint}${text}${sgr_reset}`);
}

export function showWarnText(text: string | number) {
  console.log(`${foreground_color_yellow}[WARN] ${sgr_faint}${text}${sgr_reset}`);
}

export function showErrorText(text: string | number) {
  console.log(`${foreground_color_red}[ERROR] ${sgr_faint}${text}${sgr_reset}`);
}

export function showSuccessText(text: string | number) {
  console.log(`${foreground_color_green}[SUCCESS] ${sgr_faint}${text}${sgr_reset}`);
}

export function showProcessText(text: string | number) {
  console.log(`${csi_cpl}${csi_el}${
    foreground_color_grey
  }[PROCESS] ${sgr_faint}${text}${sgr_reset}`);
}
