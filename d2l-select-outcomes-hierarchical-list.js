/**
`d2l-select-outcomes-hierchical-list`
*/

import '@polymer/polymer/polymer-legacy.js';

import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import { Actions, Classes, Rels } from 'd2l-hypermedia-constants';
import 'd2l-colors/d2l-colors.js';
import 'd2l-button/d2l-button.js';
import 'd2l-inputs/d2l-input-checkbox.js';
import 'd2l-alert/d2l-alert.js';
import 'd2l-loading-spinner/d2l-loading-spinner.js';
import 'd2l-polymer-siren-behaviors/siren-entity-loading.js';
import './d2l-alignment-intent.js';
import './d2l-outcome-hierarchy-item.js';
import './localize-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import {dom} from '@polymer/polymer/lib/legacy/polymer.dom.js';

const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = /*html*/`<dom-module id="d2l-select-outcomes-hierarchical-list">
	<template strip-whitespace="">
		<style>
			:host {
				display: block;
				overflow: hidden;
				width: 100%;
				height: 100%;
			}

			.d2l-alignment-update-content {
				display: flex;
				flex-direction: column;
				flex: 1;
			}

			.d2l-hierarchy-tree{
				list-style-type: none;
				padding-inline-start: 0px;
			}

			d2l-alert {
				margin-top: 0.5rem;
			}

			ul {
				padding: 0;
				flex: 1;
				overflow: auto;
				word-break: break-word;
				border: 1px solid transparent;
				border-top-color: var(--d2l-color-gypsum);
				margin-bottom: 0px;
				margin-block-start: 0em;
			}

			li {
				position: relative;
				list-style-type: none;
				margin-top: -1px;
				border: 1px solid transparent;
				border-top-color: var(--d2l-color-gypsum);
				color: var(--d2l-color-ferrite);
				padding: 1.5rem 1.25rem 0rem;
			}

			d2l-input-checkbox {
				margin: 0;
			}

			d2l-input-checkbox:hover {
				z-index: 1;
				background-color: var(--d2l-color-celestine-plus-2);
				color: var(--d2l-color-celestine);
			}
		</style>
		<siren-entity-loading href="[[href]]" token="[[token]]">
			<div class="d2l-alignment-update-content">
				<ul class="d2l-hierarchy-tree" tabindex="0">
					<template is="dom-repeat" items="[[_subHierarchyItems]]">
						<li tabindex="-1" role="option" aria-selected$="[[_getAriaChecked(item)]]" aria-checked$="[[_getAriaChecked(item)]]">
							<d2l-outcome-hierarchy-item id$="[[id]]" item="[[item]]" alignments="[[alignments]]"></d2l-outcome-hierarchy-item>
						</li>
					</template>
				</ul>
			</div>
		</siren-entity-loading>
	</template>


</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({

	is: 'd2l-select-outcomes-hierarchical-list',

	behaviors: [
		D2L.PolymerBehaviors.Siren.EntityBehavior,
		D2L.PolymerBehaviors.Siren.SirenActionBehavior,
		window.D2L.PolymerBehaviors.SelectOutcomes.LocalizeBehavior
	],

	properties: {
		alignments: {
			type: Set
		},
		_subHierarchyItems: {
			type: Array,
			computed: '_getHierarchy(entity)'
		}
	},

	_getAriaChecked: function(candidate) {
		if (this._getChecked(candidate)) {
			return 'true';
		}
		return 'false';
	},
	
	_getChecked: function(candidate) {
		return true;
	},

	_getHierarchy: function(entity) {
		if (!entity || !entity.hasSubEntityByClass('hierarchical-outcome')) return [];
		return entity.getSubEntitiesByClass('hierarchical-outcome');
	}
});
