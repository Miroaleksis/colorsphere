// JavaScript Document

// Valitaan tärkeimmät HTML-elementit
const colorPicker = document.getElementById("color-box");
const hexValue = document.getElementById("hex");

const rgbValue = document.getElementById("rgb");
const redSlider = document.getElementById("red");
const greenSlider = document.getElementById("green");
const blueSlider = document.getElementById("blue");

const hslValue = document.getElementById("hsl");
const hueSlider = document.getElementById("hue");
const saturationSlider = document.getElementById("saturation");
const lightnessSlider = document.getElementById("lightness");

const cmykValue = document.getElementById("cmyk");
const cyanSlider = document.getElementById("cyan");
const magentaSlider = document.getElementById("magenta");
const yellowSlider = document.getElementById("yellow");
const blackSlider = document.getElementById("black");



// Tallennetaan värit localStorageen
function saveColorToStorage() {
	localStorage.setItem('color', JSON.stringify({hex: colorPicker.value}));
}

// Ladataan värit localStoragesta
function loadColorFromStorage() {
	const color = JSON.parse(localStorage.getItem('color'));
	if (color) {
		colorPicker.value = color.hex;
		if (typeof updateContrast === 'function') updateContrast();
	}
}



function updateColorFromColorPicker() {
	// Päivitä HEX
	saveColorToStorage();
	hexValue.value = colorPicker.value;
	// Päivitä RGB
	const { r, g, b } = hexToRgb(colorPicker.value);
	if (rgbValue) rgbValue.value = `rgb(${r}, ${g}, ${b})`;
	if (redSlider) redSlider.value = r;
	if (greenSlider) greenSlider.value = g;
	if (blueSlider) blueSlider.value = b;
	if (redSlider && greenSlider && blueSlider) updateRgbSliderBackgrounds();
	// Päivitä HSL
	const { h, s, l } = rgbToHsl(r, g, b);
	if (hslValue) hslValue.value = `hsl(${h}, ${s}%, ${l}%)`;
	if (hueSlider) hueSlider.value = h;
	if (saturationSlider) saturationSlider.value = s;
	if (lightnessSlider) lightnessSlider.value = l;
	if (hslValue && hueSlider && saturationSlider && lightnessSlider) updateHslSliderBackgrounds();
	// Päivitä CMYK
	const { c, m, y, k } = rgbToCmyk(r, g, b);
	if (cmykValue) cmykValue.value = `cmyk(${c}, ${m}, ${y}, ${k})`;
	if (cyanSlider) cyanSlider.value = c;
	if (magentaSlider) magentaSlider.value = m;
	if (yellowSlider) yellowSlider.value = y;
	if (blackSlider) blackSlider.value = k;
	if (cyanSlider && magentaSlider && yellowSlider && blackSlider) updateCmykSliderBackgrounds();
}

// Päivittää HEX → RGB, HSL, CMYK
function updateColorFromHEX() {
	// Päivitä HEX ja värilaatikko
	colorPicker.value = hexValue.value;
	saveColorToStorage();
	// Päivitä RGB
	const { r, g, b } = hexToRgb(hexValue.value);
	if (rgbValue) rgbValue.value = `rgb(${r}, ${g}, ${b})`;
	if (redSlider) redSlider.value = r;
	if (greenSlider) greenSlider.value = g;
	if (blueSlider) blueSlider.value = b;
	if (redSlider && greenSlider && blueSlider) updateRgbSliderBackgrounds();
	// Päivitä HSL
	const { h, s, l } = rgbToHsl(r, g, b);
	if (hslValue) hslValue.value = `hsl(${h}, ${s}%, ${l}%)`;
	if (hueSlider) hueSlider.value = h;
	if (saturationSlider) saturationSlider.value = s;
	if (lightnessSlider) lightnessSlider.value = l;
	if (hslValue && hueSlider && saturationSlider && lightnessSlider) updateHslSliderBackgrounds();
	// Päivitä CMYK
	const { c, m, y, k } = rgbToCmyk(r, g, b);
	if (cmykValue) cmykValue.value = `cmyk(${c}, ${m}, ${y}, ${k})`;
	if (cyanSlider) cyanSlider.value = c;
	if (magentaSlider) magentaSlider.value = m;
	if (yellowSlider) yellowSlider.value = y;
	if (blackSlider) blackSlider.value = k;
	if (cyanSlider && magentaSlider && yellowSlider && blackSlider) updateCmykSliderBackgrounds();
}

// Päivittää RGB → HEX, HSL, CMYK
function updateColorFromRGB() {
	// Päivitä RGB
	const r = parseInt(redSlider.value);
	const g = parseInt(greenSlider.value);
	const b = parseInt(blueSlider.value);   
	rgbValue.value = `rgb(${r}, ${g}, ${b})`;
	updateRgbSliderBackgrounds();
	// Päivitä HEX ja värilaatikko
	hexValue.value = colorPicker.value = rgbToHex(r, g, b);
	saveColorToStorage(); // Tallennetaan värit localStorageen
	// Päivitä HSL
	const { h, s, l } = rgbToHsl(r, g, b);
	if (hslValue) hslValue.value = `hsl(${h}, ${s}%, ${l}%)`;
	if (hueSlider) hueSlider.value = h;
	if (saturationSlider) saturationSlider.value = s;
	if (lightnessSlider) lightnessSlider.value = l;
	if (hslValue && hueSlider && saturationSlider && lightnessSlider) updateHslSliderBackgrounds();
	// Päivitä CMYK
	const { c, m, y, k } = rgbToCmyk(r, g, b);
	if (cmykValue) cmykValue.value = `cmyk(${c}, ${m}, ${y}, ${k})`;
	if (cyanSlider) cyanSlider.value = c;
	if (magentaSlider) magentaSlider.value = m;
	if (yellowSlider) yellowSlider.value = y;
	if (blackSlider) blackSlider.value = k;
	if (cyanSlider && magentaSlider && yellowSlider && blackSlider) updateCmykSliderBackgrounds();
}

// Päivittää HSL → RGB, HEX, CMYK
function updateColorFromHSL() {
	// Päivitä HSL
	const h = parseInt(hueSlider.value);
	const s = parseInt(saturationSlider.value);
	const l = parseInt(lightnessSlider.value);
	hslValue.value = `hsl(${h}, ${s}%, ${l}%)`;
	updateHslSliderBackgrounds();
	// Päivitä RGB
	const { r, g, b } = hslToRgb(h, s, l);
	if (rgbValue) rgbValue.value = `rgb(${r}, ${g}, ${b})`;
	if (redSlider) redSlider.value = r;
	if (greenSlider) greenSlider.value = g;
	if (blueSlider) blueSlider.value = b;
	if (redSlider && greenSlider && blueSlider) updateRgbSliderBackgrounds();
	// Päivitä HEX ja värilaatikko
	hexValue.value = colorPicker.value = rgbToHex(r, g, b);
	saveColorToStorage();
	// Päivitä CMYK
	const { c, m, y, k } = rgbToCmyk(r, g, b);
	if (cmykValue) cmykValue.value = `cmyk(${c}, ${m}, ${y}, ${k})`;
	if (cyanSlider) cyanSlider.value = c;
	if (magentaSlider) magentaSlider.value = m;
	if (yellowSlider) yellowSlider.value = y;
	if (blackSlider) blackSlider.value = k;
	if (cyanSlider && magentaSlider && yellowSlider && blackSlider) updateCmykSliderBackgrounds();
}

// Päivittää CMYK → RGB, HEX, HSL
function updateColorFromCMYK() {
	// Päivitä CMYK
	const c = parseInt(cyanSlider.value);
	const m = parseInt(magentaSlider.value);
	const y = parseInt(yellowSlider.value);
	const k = parseInt(blackSlider.value);
	cmykValue.value = `cmyk(${c}, ${m}, ${y}, ${k})`;
	updateCmykSliderBackgrounds();
	// Päivitä RGB
	const { r, g, b } = cmykToRgb(c, m, y, k);
	if (rgbValue) rgbValue.value = `rgb(${r}, ${g}, ${b})`;
	if (redSlider) redSlider.value = r;
	if (greenSlider) greenSlider.value = g;
	if (blueSlider) blueSlider.value = b;
	if (redSlider && greenSlider && blueSlider) updateRgbSliderBackgrounds();
	// Päivitä HEX ja värilaatikko
	hexValue.value = colorPicker.value = rgbToHex(r, g, b);
	saveColorToStorage();
	// Päivitä HSL
	const { h, s, l } = rgbToHsl(r, g, b);
	if (hslValue) hslValue.value = `hsl(${h}, ${s}%, ${l}%)`;
	if (hueSlider) hueSlider.value = h;
	if (saturationSlider) saturationSlider.value = s;
	if (lightnessSlider) lightnessSlider.value = l;
	if (hslValue && hueSlider && saturationSlider && lightnessSlider) updateHslSliderBackgrounds();
}



// Liukureiden taustavärit

// Päivittää RGB-liukureiden taustavärit
function updateRgbSliderBackgrounds() {
	const currentRed = parseInt(redSlider.value);
	const currentGreen = parseInt(greenSlider.value);
	const currentBlue = parseInt(blueSlider.value);
	redSlider.style.background = `linear-gradient(to right, rgb(0, ${currentGreen}, ${currentBlue}), rgb(255, ${currentGreen}, ${currentBlue}))`;
	greenSlider.style.background = `linear-gradient(to right, rgb(${currentRed}, 0, ${currentBlue}), rgb(${currentRed}, 255, ${currentBlue}))`;
	blueSlider.style.background = `linear-gradient(to right, rgb(${currentRed}, ${currentGreen}, 0), rgb(${currentRed}, ${currentGreen}, 255))`;
}

// Päivittää HSL-liukureiden taustavärit
function updateHslSliderBackgrounds() {
	const currentHue = parseInt(hueSlider.value);
	const currentSaturation = parseInt(saturationSlider.value);
	const currentLightness = parseInt(lightnessSlider.value);
	hueSlider.style.background = `linear-gradient(to right, 
		hsl(0, ${currentSaturation}%, ${currentLightness}%),
		hsl(60, ${currentSaturation}%, ${currentLightness}%),
		hsl(120, ${currentSaturation}%, ${currentLightness}%),
		hsl(180, ${currentSaturation}%, ${currentLightness}%),
		hsl(240, ${currentSaturation}%, ${currentLightness}%),
		hsl(300, ${currentSaturation}%, ${currentLightness}%),
		hsl(360, ${currentSaturation}%, ${currentLightness}%)
	)`;
	saturationSlider.style.background = `linear-gradient(to right, 
		hsl(${currentHue}, 0%, ${currentLightness}%),
		hsl(${currentHue}, 100%, ${currentLightness}%)
	)`;
	lightnessSlider.style.background = `linear-gradient(to right, 
		hsl(${currentHue}, ${currentSaturation}%, 0%),
		hsl(${currentHue}, ${currentSaturation}%, 50%),
		hsl(${currentHue}, ${currentSaturation}%, 100%)
	)`;
}

// Päivittää CMYK-liukureiden taustavärit
function updateCmykSliderBackgrounds() {
	const currentCyan = parseInt(cyanSlider.value);
	const currentMagenta = parseInt(magentaSlider.value);
	const currentYellow = parseInt(yellowSlider.value);
	const currentBlack = parseInt(blackSlider.value);
	// Muutetaan CMYK-arvot RGB-muotoon
	const startCyan = cmykToRgb(0, currentMagenta, currentYellow, currentBlack);
	const startMagenta = cmykToRgb(currentCyan, 0, currentYellow, currentBlack);
	const startYellow = cmykToRgb(currentCyan, currentMagenta, 0, currentBlack);
	const startBlack = cmykToRgb(currentCyan, currentMagenta, currentYellow, 0);
	const endCyan = cmykToRgb(100, currentMagenta, currentYellow, currentBlack);
	const endMagenta = cmykToRgb(currentCyan, 100, currentYellow, currentBlack);
	const endYellow = cmykToRgb(currentCyan, currentMagenta, 100, currentBlack);
	const endBlack = cmykToRgb(currentCyan, currentMagenta, currentYellow, 100);
	// Päivitetään liukusäätimien taustavärit dynaamisesti
	cyanSlider.style.background = `linear-gradient(to right, rgb(${startCyan.r},${startCyan.g},${startCyan.b}), rgb(${endCyan.r},${endCyan.g},${endCyan.b}))`;
	magentaSlider.style.background = `linear-gradient(to right, rgb(${startMagenta.r},${startMagenta.g},${startMagenta.b}), rgb(${endMagenta.r},${endMagenta.g},${endMagenta.b}))`;
	yellowSlider.style.background = `linear-gradient(to right, rgb(${startYellow.r},${startYellow.g},${startYellow.b}), rgb(${endYellow.r},${endYellow.g},${endYellow.b}))`;
	blackSlider.style.background = `linear-gradient(to right, rgb(${startBlack.r},${startBlack.g},${startBlack.b}), rgb(${endBlack.r},${endBlack.g},${endBlack.b}))`;
}



// Muunnosfunktiot

// RGB → HEX-muunnos
function rgbToHex(r, g, b) {
	return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

// HEX → RGB-muunnos
function hexToRgb(hex) {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return { r, g, b };
}

// RGB → HSL-muunnos
function rgbToHsl(r, g, b) {
	r /= 255;
	g /= 255;
	b /= 255;
	let max = Math.max(r, g, b);
	let min = Math.min(r, g, b);
	let h, s, l = (max + min) / 2;
	if (max === min) {
		h = s = 0; // Harmaa sävy
	} else {
		let d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}
		h = Math.round(h * 60);
	}
	s = Math.round(s * 100);
	l = Math.round(l * 100);
	return { h, s, l };
}

// HSL → RGB-muunnos
function hslToRgb(h, s, l) {
	s /= 100;
	l /= 100;
	let c = (1 - Math.abs(2 * l - 1)) * s;
	let x = c * (1 - Math.abs((h / 60) % 2 - 1));
	let m = l - c / 2;
	let r = 0, g = 0, b = 0;
	if (h < 60) {
		r = c; g = x; b = 0;
	} else if (h < 120) {
		r = x; g = c; b = 0;
	} else if (h < 180) {
		r = 0; g = c; b = x;
	} else if (h < 240) {
		r = 0; g = x; b = c;
	} else if (h < 300) {
		r = x; g = 0; b = c;
	} else {
		r = c; g = 0; b = x;
	}
	r = Math.round((r + m) * 255);
	g = Math.round((g + m) * 255);
	b = Math.round((b + m) * 255);
	return { r, g, b };
}

// RGB → CMYK-muunnos
function rgbToCmyk(r, g, b) {
	let rPrime = r / 255;
	let gPrime = g / 255;
	let bPrime = b / 255;
	let k = 1 - Math.max(rPrime, gPrime, bPrime);
	let c = 0, m = 0, y = 0;
	if (k < 1) {
		c = (1 - rPrime - k) / (1 - k);
		m = (1 - gPrime - k) / (1 - k);
		y = (1 - bPrime - k) / (1 - k);
	}
	return { 
		c: Math.round(c * 100),
		m: Math.round(m * 100),
		y: Math.round(y * 100),
		k: Math.round(k * 100)
	};
}

// CMYK → RGB-muunnos
function cmykToRgb(c, m, y, k) {
	const r = Math.round(255 * (1 - c / 100) * (1 - k / 100));
	const g = Math.round(255 * (1 - m / 100) * (1 - k / 100));
	const b = Math.round(255 * (1 - y / 100) * (1 - k / 100));
	return { r, g, b };
}



// Tapahtumakuuntelijat ja alustukset
loadColorFromStorage();
colorPicker.addEventListener("input", updateColorFromColorPicker);
updateColorFromColorPicker();
hexValue.addEventListener("input", () => {
	if (/^#[0-9A-Fa-f]{6}$/.test(hexValue.value)) {
		updateColorFromHEX();
	}
});
if (rgbValue) {
	rgbValue.addEventListener("input", () => {
		const match = rgbValue.value.match(/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/);
		if (match) {
			let r = parseInt(match[1]);
			let g = parseInt(match[2]);
			let b = parseInt(match[3]);
			if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
				redSlider.value = r;
				greenSlider.value = g;
				blueSlider.value = b;
				updateColorFromRGB();
			}
		}
	});
}
if (redSlider) redSlider.addEventListener("input", updateColorFromRGB);
if (greenSlider) greenSlider.addEventListener("input", updateColorFromRGB);
if (blueSlider) blueSlider.addEventListener("input", updateColorFromRGB);
if (hslValue) {
	hslValue.addEventListener("input", () => {
		const match = hslValue.value.match(/^hsl\((\d{1,3}),\s*(\d{1,3}%),\s*(\d{1,3}%)\)$/);
		if (match) {
			let h = parseInt(match[1]);
			let s = parseInt(match[2]);
			let l = parseInt(match[3]);
			if (h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100) {
				hueSlider.value = h;
				saturationSlider.value = s;
				lightnessSlider.value = l;
				updateColorFromHSL();
			}
		}
	});
}
if (hueSlider) hueSlider.addEventListener("input", updateColorFromHSL);
if (saturationSlider) saturationSlider.addEventListener("input", updateColorFromHSL);
if (lightnessSlider) lightnessSlider.addEventListener("input", updateColorFromHSL);
if (cmykValue) {
	cmykValue.addEventListener("input", () => {
		const match = cmykValue.value.match(/^cmyk\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/);
		if (match) {
			let c = parseInt(match[1]);
			let m = parseInt(match[2]);
			let y = parseInt(match[3]);
			let k = parseInt(match[4]);
			if (c >= 0 && c <= 100 && m >= 0 && m <= 100 && y >= 0 && y <= 100 && k >= 0 && k <= 100) {
				cyanSlider.value = c;
				magentaSlider.value = m;
				yellowSlider.value = y;
				blackSlider.value = k;
				updateColorFromCMYK();
			}
		}
	});
}
if (cyanSlider) cyanSlider.addEventListener("input", updateColorFromCMYK);
if (magentaSlider) magentaSlider.addEventListener("input", updateColorFromCMYK);
if (yellowSlider) yellowSlider.addEventListener("input", updateColorFromCMYK);
if (blackSlider) blackSlider.addEventListener("input", updateColorFromCMYK);