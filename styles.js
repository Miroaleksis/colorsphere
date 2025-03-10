//Javascript

//Current page
document.querySelectorAll('a').forEach(function(link) {
	if (link.href === window.location.href) {
		link.classList.add('current-page');
	}
});



// Copying color value
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

// Alustetaan teema (tarkistetaan, onko tallennettu teema)
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.body.setAttribute('data-theme', savedTheme);

// Vaihda teema napin painalluksella ja tallenna se localStorageen
document.getElementById('theme-toggle').addEventListener('click', () => {
    const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Tallennetaan uusi teema
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const systemTheme = e.matches ? 'dark' : 'light';
    document.body.setAttribute('data-theme', systemTheme); // Vaihda data-theme riippumatta localStoragen arvosta
});