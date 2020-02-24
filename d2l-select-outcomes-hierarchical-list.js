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
import 'd2l-inputs/d2l-input-search.js';
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

			.center {
				text-align: center;
			}
		</style>
		<d2l-input-search
			label="Search"
			placeholder="Search..."
			on-d2l-input-search-searched="_onSearch"
		>
		</d2l-input-search>
		<template is="dom-if" if="[[_isEmptySearchResult]]">
			<div class="center">
				<h3>No results found for '[[_searchText]]'</h3>
			</div>
		</template>
		<siren-entity-loading href="[[href]]" token="[[token]]">
			<div class="d2l-alignment-update-content">
				<ul class="d2l-hierarchy-tree" tabindex="0">
					<template is="dom-repeat" items="[[_displayedHierarchyItems]]">
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

		_displayedHierarchyItems: {
			type: Array,
			computed: '_getDisplayedHierarchyItems(_hierarchyItems, _searchText)'
		},

		_hierarchyItems: {
			type: Array,
			computed: '_getHierarchyItems(entity)'
		},

		_searchText: {
			type: String
		},

		_isEmptySearchResult: {
			type: Boolean,
			value: false,
			computed: '_getIsEmptySearchResult(_displayedHierarchyItems)'
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

	_getHierarchyItems: function(entity) {
		if (!entity || !entity.hasSubEntityByClass('hierarchical-outcome')) return [];
		return entity.getSubEntitiesByClass('hierarchical-outcome');
	},

	_isLeafOutcome: function(entity) {
		return entity && entity.class.includes('leaf-outcome');
	},

	_filterHierachy: function(item, searchText) {
		if (Array.isArray(item)) {
			// Top level tree
			const topLevels = [];
			for (const i of item) {
				const filtered = this._filterHierachy(i, searchText);
				if (filtered) {
					topLevels.push(filtered);
				}
			}
			return topLevels;
		} else if (this._isLeafOutcome(item)) {
			const search = (item, searchText = '') => {
				const searchTarget = (item && item.properties && item.properties.description)
					? item.properties.description.toLowerCase().normalize()
					: '';
				const searchTextLower = searchText.trim().toLowerCase().normalize();
				return searchTarget.indexOf(searchTextLower) > -1;
			};
			return search(item, searchText) ? item : null;
		} else {
			// subtrees
			const filteredSublevels = [];
			for (const i of item.entities) {
				if (this._filterHierachy(i, searchText)) {
					filteredSublevels.push(i);
				}
			}
			item.entities = filteredSublevels;
			return filteredSublevels.length !== 0 ? item : null;
		}
	},

	_getDisplayedHierarchyItems: function(items, searchText) {
		if (!items) return [];
		if (!searchText) return items;

		const copy = JSON.parse(JSON.stringify(items)); // we don't want to contaminate the source data
		return this._filterHierachy(copy, searchText);
	},

	_getIsEmptySearchResult: function(items) {
		return items && items.length === 0;
	},

	_onSearch: function(e) {
		this._searchText = e.detail.value;
	}
});
