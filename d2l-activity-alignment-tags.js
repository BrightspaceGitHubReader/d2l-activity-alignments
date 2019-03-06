import { PolymerElement, html } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-alert/d2l-alert.js';
import './d2l-activity-alignment-tag-list.js';
import './localize-behavior.js';

class ActivityAlignmentTags extends mixinBehaviors([
	D2L.PolymerBehaviors.Siren.EntityBehavior,
	D2L.Hypermedia.HMConstantsBehavior,
	D2L.PolymerBehaviors.SelectOutcomes.LocalizeBehavior
], PolymerElement) {

	static get is() {
		return 'd2l-activity-alignment-tags';
	}

	static get properties() {
		return {
			readOnly: Boolean,
			_showError: {
				type: Boolean,
				value: false
			}
		};
	}

	static get template() {
		return html`
			<style>
				:host {
					display: flex;
					flex-direction: column;
					align-items: stretch;
				}
			</style>
			<template is="dom-if" if="[[_getAlignments(entity)]]" restamp>
				<d2l-activity-alignment-tag-list
					href="[[_getAlignments(entity)]]"
					token="[[token]]"
					read-only="[[readOnly]]"
				></d2l-activity-alignment-tag-list>
			</template>
			<template is="dom-if" if="[[_showError]]">
				<d2l-alert type="error">[[localize('error')]]</d2l-alert>
			</template>
		`;
	}

	ready() {
		this._boundHandleError = this._handleError.bind(this);
		super.ready();
	}

	connectedCallback() {
		this._showError = false;
		this.addEventListener('d2l-siren-entity-error', this._boundHandleError);
		super.connectedCallback();
	}

	disconnectedCallback() {
		this.removeEventListener('d2l-siren-entity-error', this._boundHandleError);
		this.detached();
		super.disconnectedCallback();
	}

	_handleError() {
		this._showError = true;
	}

	_getAlignments(entity) {
		return entity
			&& entity.hasLinkByRel(this.HypermediaRels.Alignments.alignments)
			&& entity.getLinkByRel(this.HypermediaRels.Alignments.alignments).href;
	}

}

customElements.define(ActivityAlignmentTags.is, ActivityAlignmentTags);
