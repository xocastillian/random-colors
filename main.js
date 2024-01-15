const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', event => {
	event.preventDefault()
	if (event.code.toLowerCase() === 'space') {
		setRandomColors()
	}
})

document.addEventListener('click', event => {
	const type = event.target.dataset.type

	if (type === 'lock') {
		const node =
			event.target.tagName.toLowerCase() === 'i'
				? event.target
				: event.target.children[0]

		node.classList.toggle('fa-lock-open')
		node.classList.toggle('fa-lock')
	} else if (type === 'copy') {
		copyToClipboard(event.target.textContent)
	}
})

const copyToClipboard = text => {
	return navigator.clipboard.writeText(text)
}

const setRandomColors = isInitial => {
	const colors = isInitial ? getColorsFromHash() : []

	cols.forEach((col, index) => {
		const isLocked = col.querySelector('i').classList.contains('fa-lock')

		const text = col.querySelector('h2')
		const button = col.querySelector('button')

		if (isLocked) {
			colors.push(text.textContent)
			return
		}

		const color = isInitial
			? colors[index]
				? colors[index]
				: chroma.random()
			: chroma.random()

		if (!isInitial) {
			colors.push(color)
		}

		col.style.background = color
		text.textContent = color
		text.style.color = chroma(color).darken().hex()
		button.style.color = chroma(color).darken().hex()
	})

	updatecolorsHash(colors)
}

const updatecolorsHash = (colors = []) => {
	document.location.hash = colors
		.map(col => col.toString().substring(1))
		.join('-')
}

const getColorsFromHash = () => {
	if (document.location.hash.length > 1) {
		return document.location.hash
			.substring(1)
			.split('-')
			.map(color => '#' + color)
	}
	return []
}

setRandomColors(true)
