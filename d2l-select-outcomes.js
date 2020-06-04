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
import './d2l-alignment-update.js';
import './localize-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = /*html*/`<dom-module id="d2l-select-outcomes">
	<template strip-whitespace="">
		<style>
			:host {
				display: flex;
				overflow: auto;
			}

			.d2l-select-outcomes-main {
				display: block;
				position: relative;
			}
		</style>
		<div class="d2l-select-outcomes-main">
			<d2l-alignment-update deferred-save="[[deferredSave]]" empty="{{_alignmentsIsEmpty}}" href="[[_getAlignments(entity)]]" token="[[token]]"></d2l-alignment-update>
			<template is="dom-if" if="[[_showError]]">
				<d2l-alert type="error">[[localize('error')]]</d2l-alert>
			</template>
		</div>
	</template>


</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({

	is: 'd2l-select-outcomes',

	properties: {
		_showError: {
			type: Boolean,
			value: false
		},
		_alignmentsIsEmpty: {
			type: Boolean
		},
		empty: {
			type: Boolean,
			notify: true,
			readOnly: true,
			computed: '_isAlignmentsEmpty(_alignmentsIsEmpty)'
		},
		deferredSave: {
			type: Boolean,
			value: false
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

	_isAlignmentsEmpty: function(_alignmentsIsEmpty) {
		return _alignmentsIsEmpty;
	}

});
