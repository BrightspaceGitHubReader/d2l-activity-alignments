/**
`d2l-select-outcomes`

@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import { Rels } from 'd2l-hypermedia-constants';
import 'd2l-alert/d2l-alert.js';
import './d2l-alignment-list.js';
import './d2l-user-alignment-list.js';
import './localize-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = /*html*/`<dom-module id="d2l-activity-alignments">
	<template strip-whitespace="">
		<style>
			:host {
				display: flex;
			}

			.d2l-activity-alignments-main {
				flex: 1;
				display: flex;
				flex-direction: column;
				height: 100%;
				z-index: 0;
			}
		</style>
		<div class="d2l-activity-alignments-main">
			<template is="dom-if" if="[[_isUserOrActorActivityUsage(entity)]]">
				<d2l-user-alignment-list href="[[_getAlignments(entity)]]" token="[[token]]" read-only$="[[readOnly]]">
					<slot name="outcomes-title" slot="outcomes-title"></slot>
					<slot name="show-select-outcomes" slot="show-select-outcomes"></slot>
					<slot name="describe-aligned-outcomes" slot="describe-aligned-outcomes"></slot>
				</d2l-alignment-list>
			</template>
			<template is="dom-if" if="[[!_isUserOrActorActivityUsage(entity)]]">
				<d2l-alignment-list href="[[_getAlignments(entity)]]" token="[[token]]" read-only$="[[readOnly]]" header-title="[[headerTitle]]">
					<slot name="outcomes-title" slot="outcomes-title"></slot>
					<slot name="show-select-outcomes" slot="show-select-outcomes"></slot>
					<slot name="describe-aligned-outcomes" slot="describe-aligned-outcomes"></slot>
				</d2l-alignment-list>
			</template>
			<template is="dom-if" if="[[_showError]]">
				<d2l-alert type="error">[[localize('error')]]</d2l-alert>
			</template>
		</div>
	</template>


</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({

	is: 'd2l-activity-alignments',

	properties: {
		readOnly: Boolean,

		_showError: {
			type: Boolean,
			value: false
		},
		headerTitle: {
			type: String,
			value: null
		}
	},

	behaviors: [
		D2L.PolymerBehaviors.Siren.EntityBehavior,
		window.D2L.PolymerBehaviors.SelectOutcomes.LocalizeBehavior,
	],

	ready: function() {
		this._boundHandleError = this._handleError.bind(this);
	},

	attached: function() {
		this._showError = false;
		this.addEventListener('d2l-siren-entity-error', this._boundHandleError);
	},

	detached: function() {
		this.removeEventListener('d2l-siren-entity-error', this._boundHandleError);
	},

	_handleError: function() {
		this._showError = true;
	},

	_getAlignments: function(entity) {
		return entity && entity.hasLinkByRel(Rels.Alignments.alignments) && entity.getLinkByRel(Rels.Alignments.alignments).href;
	},

	_isUserOrActorActivityUsage: function(entity) {
		if (!entity) return undefined;
		const selfLink = entity.getLinkByRel('self');
		if (!selfLink) return undefined;
		return selfLink.rel.some(rel => (rel === Rels.Activities.userActivityUsage ||
			rel === Rels.Activities.actorActivityUsage));
	}

});
