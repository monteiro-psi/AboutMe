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



const url = "https://api.github.com/users/kernelxyz/repos?per_page=100&sort=pushed";
const cName = document.querySelector('.projects-grid');

fetch(url)
	.then(response => {
		if (!response.ok) throw new Error(`GitHub API respondeu ${response.status}`);
		return response.json();
	})
	.then(data => {
		cName.innerHTML = data.map(repo => `
			<a class="project-card" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
				<h3>${repo.name}</h3>
				<p>${repo.description ?? 'Sem descrição.'}</p>
				<span>Ver no GitHub &#8594;</span>
			</a>
		`).join('');
	})
	.catch(error => {
		console.error('Erro na requisição:', error);
});
