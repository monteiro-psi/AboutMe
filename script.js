document.addEventListener('DOMContentLoaded', () => {
	const links = document.querySelectorAll('nav a[href^="#"]');
	const sections = document.querySelectorAll('main > section');

	function setActiveSection(id) {
		links.forEach(link => {
			const isActive = link.getAttribute('href') === `#${id}`;
			link.classList.toggle('active', isActive);
			link.toggleAttribute('aria-current', isActive);
		});
	}

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				setActiveSection(entry.target.id);
			}
		});
	}, {
		rootMargin: '-45% 0px -45% 0px'
	});

	sections.forEach(section => observer.observe(section));
	setActiveSection(window.location.hash.slice(1) || 'home');
});
