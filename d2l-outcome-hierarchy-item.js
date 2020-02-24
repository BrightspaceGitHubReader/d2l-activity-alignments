/**
`d2l-outcome-hierarchy-item`

@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';
import 'd2l-inputs/d2l-input-checkbox.js';
import 'd2l-icons/tier1-icons.js';
import 'd2l-loading-spinner/d2l-loading-spinner.js';
import 'd2l-polymer-siren-behaviors/siren-entity-loading.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-button/d2l-button.js';
import 's-html/s-html.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import OutcomeParserBehavior from './d2l-outcome-parser-behavior.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-outcome-hierarchy-item">
	<template strip-whitespace="">
		<style>
			:host {
				display: block;
				width: 100%;
			}

			d2l-button-icon {
				padding-right: 0.25rem;
				height: 100%;
			}

			.d2l-outcome-wrap {
				display: flex;
				flex-direction: column-reverse;
			}

			.d2l-collapsible-node {
				display: flex;
				padding-bottom: 1rem;
			}

			.d2l-outcome-identifier {
				@apply --d2l-body-small-text;

				margin: 0.3rem 0 0 0;
			}

			.d2l-outcome-text {
				@apply --d2l-body-compact-text;
			}

			siren-entity-loading {
				--siren-entity-loading-min-height: 1.2rem;
			}

			d2l-loading-spinner {
				--d2l-loading-spinner-size: 1.2rem;
			}

			.d2l-outcome-wrap, .d2l-outcome-text {
				width: 100%;
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
				border-bottom: none;
				border-top-color: var(--d2l-color-gypsum);
				color: var(--d2l-color-ferrite);
				padding: 0.75rem 1.25rem;
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

		<div class="d2l-outcome-wrap">
		<template is="dom-if" if="[[_isLeafNode(item)]]">
			<d2l-input-checkbox tabindex="-1"  not-tabbable="true" checked="[[_getChecked(item)]]" on-change="_onOutcomeSelectChange" data-index$="[[index]]" >
				<div class="d2l-outcome-wrap">
					<template is="dom-if" if="[[_hasOutcomeIdentifier(item)]]">
						<div class="d2l-outcome-identifier">[[getOutcomeIdentifier(item)]]</div>
					</template>
					<div class="d2l-outcome-text">
						<s-html hidden="[[!_fromTrustedSource(item)]]" html="[[getOutcomeDescriptionHtml(item)]]"></s-html>
						<span hidden="[[_fromTrustedSource(item)]]">[[getOutcomeDescriptionPlainText(item)]]</span>
					</div>
				</div>
			</d2l-input-checkbox>
		</template>
		<template is="dom-if" if="[[!_isLeafNode(item)]]">
			<div>
				<div class="d2l-collapsible-node">
					<d2l-button-icon
						icon="[[_collapseIcon]]"
						aria-label$="[[browseOutcomesText]]"
						style$="[[_iconStyle]]"
						on-click="_expandCollapse"
						id="browse-outcome-button"
					></d2l-button-icon>
					<div class="d2l-outcome-wrap">
						<template is="dom-if" if="[[_hasOutcomeIdentifier(item)]]">
							<div class="d2l-outcome-identifier">[[getOutcomeIdentifier(item)]]</div>
						</template>
						<div class="d2l-outcome-text">
							<s-html hidden="[[!_fromTrustedSource(item)]]" html="[[getOutcomeDescriptionHtml(item)]]"></s-html>
							<span hidden="[[_fromTrustedSource(item)]]">[[getOutcomeDescriptionPlainText(item)]]</span>
						</div>
					</div>
				</div>
				<template is="dom-if" if="[[!_collapsed]]">
					<ul tabindex="0" on-focus="_handleListFocus" style="list-style-type:none">
						<template is="dom-repeat" items="[[_subHierarchyItems]]">
							<li tabindex="-1">
								<d2l-outcome-hierarchy-item id$="[[id]]" item="[[item]]" alignments="[[alignments]]"></d2l-outcome-hierarchy-item>
							</li>
						</template>
					</ul>
				</template>
			</div>
		</template>
        </div>
	</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({

	is: 'd2l-outcome-hierarchy-item',

	behaviors: [
		OutcomeParserBehavior
	],

	properties: {
		item: {
			type: Object
		},
		alignments: {
			type: Map
		},
		_subHierarchyItems: {
			type: Array,
			computed: '_getHierarchy(item)'
		},
		_collapsed: {
			type: Boolean,
			value: false
		},
		_iconStyle: {
			type: String,
			value: null
		},
		_collapseIcon: {
			type: String,
			computed: '_redrawIcon(_collapsed)'
		}
	},

	created: function() {
		const userAgent = window.navigator.userAgent;
		if (userAgent.indexOf('Trident/') >= 0) {
			this._iconStyle = 'transform: translateY( -0.6rem );';
		} else if (
			window.navigator.userAgent.indexOf('Edge/') >= 0 ||
			window.navigator.userAgent.indexOf('WebKit') < 0
		) {
			this._iconStyle = 'transform: translateY( -2px );';
		}
	},

	_getHierarchy: function(item) {
		if (!item || !item.entities) {
			return [];
		}
		return item.entities.filter(function(e) {return e.class.includes('hierarchical-outcome'); });
	},

	_isLeafNode: function(item) {
		return item.class.includes('leaf-outcome');
	},

	_getChecked: function(item) {
		return this.alignments && item && item.properties && item.properties.objectiveId && this.alignments.has(item.properties.objectiveId);
	},

	_hasOutcomeIdentifier: function(entity) {
		return !!this.getOutcomeIdentifier(entity);
	},

	_expandCollapse: function() {
		this._collapsed = !this._collapsed;
	},

	_redrawIcon: function(_collapsed) {
		if (_collapsed) {
			return "d2l-tier1:arrow-expand";
		} else {
			return "d2l-tier1:arrow-collapse";
		}
	 },
	 
	 _onOutcomeSelectChange: function(e) {
		var target = e.target;
		if (target.checked) {
			this.alignments.add(this.item.properties.objectiveId);
		} else {
			this.alignments.delete(this.item.properties.objectiveId);
		}
		this.dispatchEvent(new CustomEvent('d2l-alignment-list-changed', {
			bubbles: true,
			composed: true
		}));
	}
});