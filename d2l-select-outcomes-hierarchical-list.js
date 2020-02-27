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
				height: 100%;
			}

			.d2l-alignment-update-content {
				width: 100%;
				display: flex;
				flex-direction: column;
				margin-top: -2px;
			}

			.d2l-hierarchy-tree {
				width: 100%;
				list-style-type: none;
				padding-inline-start: 0px;
				z-index:2;
			}

			d2l-alert {
				margin-top: 0.5rem;
			}
		</style>
		<siren-entity-loading href="[[href]]" token="[[token]]">
			<div class="d2l-alignment-update-content">
				<d2l-outcome-hierarchy-item 
					item="[[_getHierarchyStart(entity)]]" 
					alignments="[[alignments]]" 
					current-level="[[level]]"
				</d2l-outcome-hierarchy-item>
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
		level: {
			type: Number,
			value: 0,
		}
	},

	_getHierarchyStart: function(entity) {
		if (!entity || !entity.hasSubEntityByClass('hierarchical-outcome')) {
			return undefined;
		}

		var hierarchyRoot = {
			entities: entity.getSubEntitiesByClass('hierarchical-outcome'),
			class: ['hierarchical-outcome', 'outcomes-root']
		};

		return hierarchyRoot;
	}
});
