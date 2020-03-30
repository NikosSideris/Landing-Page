/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
const sections = document.getElementsByTagName("section");
let navBar = document.querySelector("#navbar__list");
const on = true,
	off = false;

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

function addLiToNavBar(sectionId, navItemName) {
	// const liAdded = `<li><a href="#${sectionId}" class="menu__link">${navItemName}</a></li>`;
	navBar.insertAdjacentHTML("beforeend", `<li><a href="#${sectionId}" class="menu__link">${navItemName}</a></li>`);
}

function getElementOffset(el) {
	//from https://muffinman.io/javascript-get-element-offset/
	const rect = el.getBoundingClientRect();

	return {
		top: rect.top + window.pageYOffset,
		left: rect.left + window.pageXOffset,
	};
}

function isNearTopOfViewport(el) {
	// get the coordinates of the element box from the viewport
	const rect = el.getBoundingClientRect();
	// return true if the element top is near the top of the viewport, false otherwise
	return (
		rect.top >= 0 && rect.top <= 0.4 * window.innerHeight
	);
}

function getId(str) {
	// console.log(str);
	str = "#" + str.toLowerCase().replace(/\s/g, '');
	// console.log(str);
	return str;
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav
function buildNavBar() {
	// console.log("buildNavBar");
	for (let i = 0; i < sections.length; i++) {
		/*add lis */
		addLiToNavBar(sections[i].getAttribute("id"), sections[i].getAttribute("data-nav"))
	}
}

// Add class 'active' to section when near top of viewport
function setSectionActiveWhenNearTop(sections) {
	for (const section of sections) {
		// detect the navigation link that matches the current section
		const activeLink = document.querySelector(
			`a[href="#${section.getAttribute("id")}"]`
		);
		// checks if the current section is near top of viewport
		if (isNearTopOfViewport(section)) {
			// if it is, highlight menu link and section with active styles
			section.classList.add("active");
			activeLink.classList.add("menu__link--active");
		} else {
			// if it is not, remove active styles
			section.classList.remove("active");
			activeLink.classList.remove("menu__link--active");
		}
	}
}


function setSectionClassActive(sectionClicked) {
	//handle section & menu activation when menu item clicked
	for (const section of sections) {
		//   // detect the menu link that matches the sectionClicked
		const activeLink = document.querySelector(`a[href="#${section.getAttribute("id")}"]`);
		if (sectionClicked === section) {
			setSection(section, activeLink, on);
		} else {
			setSection(section, activeLink, off);
		}
	}
}

function setSection(section, link, on) {
	//helper to setSectionClassActive()
	if (on) {
		section.classList.add("active");
		// console.log(section, "active", link);
		link.classList.add("menu__link--active");
	} else {
		section.classList.remove("active");
		// console.log(section, "not active", link);
		link.classList.remove("menu__link--active");
	}
}

// Scroll to anchor ID using scrollTO event
function scrollToSectionSelected(section) {
	window.scrollTo({
		//scroll to element and account for sticky header offset
		top: getElementOffset(section).top - navBar.offsetHeight,
		left: getElementOffset(section).left,
		behavior: "smooth"
	});
}

/**
 * End Main Functions
 * Begin Events
 * 
 */


document.addEventListener("DOMContentLoaded", function () {
	// Build menu 
	buildNavBar();

	//add event listener when clicking menu items
	navBar.addEventListener("click", function (event) {
		event.preventDefault();
		// getting the clicked link
		//   console.log(event);
		const sectionClicked = document.querySelector(getId(event.target.text));
		// Scroll to section on link click
		scrollToSectionSelected(sectionClicked);
		setSectionClassActive(sectionClicked);
		// }
	});
})

window.addEventListener("scroll", function () {
	// Set sections as active
	setSectionActiveWhenNearTop(sections);
})