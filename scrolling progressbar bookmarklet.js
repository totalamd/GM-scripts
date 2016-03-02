// add this code to new bookmark with javascript: protocol prefaced
// activate this bookmarklet to obtain semitransparent scroll progressbar at the top of the page

const divContainer = document.createElement('div');
const divBar = document.createElement('div');
divContainer.appendChild(divBar);
divContainer.style.position = 'fixed';
divContainer.style.opacity = '0.5';
divContainer.style.height = '10px';
divContainer.style.width = '100%';
divContainer.style.top = '0';
divContainer.style.left = '0';
divContainer.style.backgroundColor = 'blue';
divContainer.style.zIndex = '2147483647';
divBar.style.height = '100%';
divBar.style.width = Math.min(window.scrollY / (document.body.scrollHeight - window.innerHeight), 1) * 100 + '%';
divBar.style.backgroundColor = 'hotpink';
document.body.appendChild(divContainer);

window.addEventListener('scroll', function() {
  divBar.style.width = Math.min(window.scrollY / (document.body.scrollHeight - window.innerHeight), 1) * 100 + '%';
	divContainer.title = parseFloat(divBar.style.width).toFixed();
})
