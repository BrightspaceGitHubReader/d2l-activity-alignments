const _trim = function( str ) {
	return str ? str.trim() : str;
};

const OutcomeParserBehavior = {

	_fromTrustedSource: function(outcomeEntity) {
		return outcomeEntity && outcomeEntity.properties.source === 'asn';
	},

	_flattenList: function(doc, listElement) {
		var flattenedList = doc.createElement('span');
		flattenedList.appendChild(doc.createTextNode(' '));
		for (var i = 0; i < listElement.childNodes.length; i++) {
			var child = listElement.childNodes[i];
			if (!child.tagName || child.tagName.toLowerCase() !== 'li') {
				continue;
			}

			while (child.firstChild) {
				flattenedList.appendChild(child.firstChild);
			}
			flattenedList.appendChild(doc.createTextNode(', '));
		}

		flattenedList.replaceChild(doc.createTextNode(' '), flattenedList.lastChild);
		flattenedList.normalize();
		return flattenedList;
	},

	getOutcomeIdentifier: function(outcomeEntity) {
		if (!outcomeEntity) {
			return;
		}

		const properties = outcomeEntity.properties;
		const notation = _trim(properties.notation) || _trim(properties.altNotation)

		let primarySubject = null;
		if (properties.subjects && properties.subjects.length) {
			for (let i = 0; i < properties.subjects.length; i++) {
				if (_trim(properties.subjects[i])) {
					primarySubject = properties.subjects[i];
					break;
				}
			}
		}

		const outcomeInfo = [
			primarySubject,
			_trim(properties.label),
			_trim(properties.listId)
		].filter( id => id ).join(' ');

		if (outcomeInfo) {
			return notation ? (notation + ' - ' + outcomeInfo) : outcomeInfo;
		}

		return notation || '';
	},

	outcomeHasNotation: function(outcomeEntity) {
		return outcomeEntity && !!(
			_trim(outcomeEntity.properties.notation) ||
			_trim(outcomeEntity.properties.altNotation)
		);
	},

	outcomeHasNotationOrLabel: function(outcomeEntity) {
		return outcomeEntity && !!(
			_trim(outcomeEntity.properties.notation) ||
			_trim(outcomeEntity.properties.altNotation) ||
			_trim(outcomeEntity.properties.label) ||
			_trim(outcomeEntity.properties.listId)
		);
	},

	getOutcomeDescriptionHtml: function(outcomeEntity) {
		if (!outcomeEntity || !this._fromTrustedSource(outcomeEntity) || !outcomeEntity.properties.description) {
			return '';
		}

		const parsedHtml = new DOMParser().parseFromString(outcomeEntity.properties.description, 'text/html');
		const listElements = parsedHtml.body.querySelectorAll('ul, ol, dl');

		for (let i = 0; i < listElements.length; i++) {
			const list = listElements[i];
			list.parentElement.replaceChild(this._flattenList(parsedHtml, list), list);
		}

		return parsedHtml.body.innerHTML;
	},

	getOutcomeDescriptionPlainText: function(outcomeEntity) {
		if (!outcomeEntity) {
			return '';
		}

		let descriptionHtml = this.getOutcomeDescriptionHtml(outcomeEntity);
		if (descriptionHtml) {
			const virtualElement = document.createElement( 'div' );
			virtualElement.innerHTML = descriptionHtml;
			return virtualElement.innerText;
		}
		return outcomeEntity.properties.description;
	}

};

export default OutcomeParserBehavior;
