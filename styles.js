//Javascript

//COMPONENTS

//Header
class MyHeader extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
		<header>
			<div class="wrap">
				<div class="logo">Colorsphere</div>
				<button id="theme-toggle" aria-live="polite"></button>
			</div>
		</header>
		`
	}
}
customElements.define('my-header', MyHeader);

//Subnavigation
class MySubnav extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `
		<nav class="subnav">
			<div class="wrap">
				<ul>
					<li><a href="index.html">Color converter</a></li>
					<li><a href="contrast.html">Contrast checker</a></li>
					<li><a href="palette.html">Palette creator</a></li>
				</ul>
			</div>
		</nav>
		`
	}
}
customElements.define('my-subnav', MySubnav);


//Current page
document.querySelectorAll('a').forEach(function (link) {
    // Poistetaan mahdollinen index.html URL:sta vertailua varten
    const normalizeUrl = (url) => url.replace(/index\.html$/, '').replace(/\/$/, '');
    
    if (normalizeUrl(link.href) === normalizeUrl(window.location.href)) {
        link.setAttribute('aria-current', 'page');
    }
});



//BASIC FUNCTIONS

//Copying color value
document.querySelectorAll('.copy').forEach(button => {
	button.setAttribute('aria-label', 'Copy');
	button.addEventListener('click', function() {
		navigator.clipboard.writeText(this.closest('div').querySelector('input').value).then(() => {
			this.setAttribute('aria-live', 'polite');
			this.classList.add('copied');
			setTimeout(() => {
				button.setAttribute('aria-live', 'off');
				this.classList.remove('copied');
			}, 500);
		});
	});
});


// Color theme
const themeToggleButton = document.getElementById('theme-toggle');

// Alustetaan teema (tarkistetaan, onko tallennettu teema)
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.body.setAttribute('data-theme', savedTheme);

// Päivitetään napin teksti
function updateButtonText() {
    if (document.body.getAttribute('data-theme') === 'dark') {
        themeToggleButton.textContent = 'Switch to light';
    } else {
        themeToggleButton.textContent = 'Switch to dark';
    }
}

// Vaihda teema napin painalluksella ja tallenna se localStorageen
themeToggleButton.addEventListener('click', () => {
    const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Tallennetaan uusi teema
    updateButtonText(); // Päivitetään napin teksti
});

// Päivitetään napin teksti heti alussa
updateButtonText();

// Kuuntele järjestelmän väriteeman muutoksia ja päivitä data-theme
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const systemTheme = e.matches ? 'dark' : 'light';
    document.body.setAttribute('data-theme', systemTheme); // Vaihda data-theme riippumatta localStoragen arvosta
    updateButtonText(); // Päivitetään napin teksti
});