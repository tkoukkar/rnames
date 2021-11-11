const urlIsValid = url => {
	let parsedUrl
	try {
		parsedUrl = new URL(url)
	} catch (err) {
		return false
	}

	return ['https:', 'http:'].includes(parsedUrl.protocol)
}

export const referenceFormIsValid = (firstAuthor, year, title, doi, link) => {
	let valid = true

	if (firstAuthor !== '') {
		if (firstAuthor.length > 50) {
			console.log(
				`Ensure the author name is at most 50 characters (name has ${firstAuthor.length} characters)`
			)
			valid = false
		}
	}

	if (year !== '') {
		if (year) {
			// 1800 - 2099
			const yearRegex = /^(18|19|20)\d{2}$/

			if (!yearRegex.test(year)) {
				console.log('Please provide correct year value')
				valid = false
			}
		}
	}

	if (title === '') {
		console.log('Please provide the title of the reference')
		valid = false
	} else {
		if (title.length > 250) {
			console.log(
				`Ensure the title is at most 250 characters (title has ${title.length} characters)`
			)
			valid = false
		}
	}

	if (doi !== '') {
		if (doi.substring(0, 3) !== '10.') {
			console.log(
				'Enter the DOI number that begins with 10 followed by a period'
			)
			valid = false
		}
	}

	if (link !== '') {
		urlValidation: {
			if (!urlIsValid(link)) {
				console.log('Please enter correct url')
				valid = false
				break urlValidation
			}
			if (link.length > 200) {
				console.log(
					`Ensure the url is at most 200 characters (url has ${link.length} characters)`
				)
				valid = false
			}
		}
	}

	return valid
}

/* All fields except the title can be null.*/
export const updateRefForSubmission = reference => {
	const updatedReference = { ...reference }
	Object.keys(updatedReference).forEach(k => {
		if (updatedReference[k] === '') {
			updatedReference[k] = null
		}
	})
	updatedReference.year = Number.parseInt(updatedReference.year, 10)
	return updatedReference
}

export const doiFormIsValid = doi => {
	if (doi === '') {
		console.log('Please provide the doi number')
		return false
	} else {
		if (doi.substring(0, 3) !== '10.') {
			console.log(
				'Enter the DOI number that begins with 10 followed by a period'
			)
			return false
		}
	}
	return true
}
