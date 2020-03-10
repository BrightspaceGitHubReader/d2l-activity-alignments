import { PolymerElement, html } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-alert/d2l-alert.js';
import './d2l-activity-alignment-tag-list.js';
import './localize-behavior.js';

class BoldTextWrapper extends mixinBehaviors([], PolymerElement) {

	static get is() {
		return 'd2l-bold-text-wrapper';
	}

	static get properties() {
		return {
			content: {
				type: String,
			},
			parsedContent: {
				type: Array,
				value: [],
				computed: '_computeParsedContent(content)'
			}
		};
	}

	static get template() {
		return html`
            <style>
                :host {
                    display: inline;
                }
			</style>
			<template is="dom-repeat" items="[[parsedContent]]"
				><template is="dom-if" if="[[!item.bold]]">[[item.data]]</template
				><template is="dom-if" if="[[item.bold]]"><b>[[item.data]]</b></template
			></template>
        `;
	}

	_computeParsedContent(content) {
		if (!content) return undefined;

		const findTag = (str, val) => {
			var indexes = [], i = -1;
			while ((i = str.indexOf(val, i + 1)) !== -1) {
				indexes.push(parseInt(i));
			}
			return indexes;
		};
		const boldStart = findTag(content, '<b>');
		const boldEnd = findTag(content, '</b>').map(i => i + '</b>'.length);
		const parsedContent = [];

		if (boldStart.length === 0 || !boldEnd.length === 0 || boldStart.length !== boldEnd.length) {
			parsedContent.push({ data: content, bold: false });
			return parsedContent;
		}

		let nonBoldStart = 0;
		return boldStart.reduce((acc, item, index) => {
			const start = item;
			const end = boldEnd[index];
			acc.push({
				data: content.substring(nonBoldStart, start),
				bold: false
			});
			acc.push({
				data: content.substring(start + '<b>'.length, end - '</b>'.length),
				bold: true
			});
			nonBoldStart = end;

			if (boldStart.length - 1 === index) {
				acc.push({
					data: content.substring(end),
					bold: false
				});
			}
			return acc;
		}, []);
	}
}

customElements.define(BoldTextWrapper.is, BoldTextWrapper);
