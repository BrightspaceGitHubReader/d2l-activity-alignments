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
import '@polymer/iron-collapse/iron-collapse.js';
import 's-html/s-html.js';
import './d2l-bold-text-wrapper.js';
import './localize-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import OutcomeParserBehavior from './d2l-outcome-parser-behavior.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = /*html*/`<dom-module id="d2l-outcome-hierarchy-item">
	<template strip-whitespace="">
		<style>
			:host {
				display: block;
				width: 100%;
				--sublevel-cell-margin: 6px;
			}

			* {
				outline: none;
			}

			.d2l-outcome-wrap {
				display: flex;
				flex-direction: column-reverse;
				margin-left: 10px;
				width: 100%;
			}

			.d2l-outcome-heading {
				margin-top: 10px;
				margin-right: 24px;
				line-height: 32px;
			}

			.d2l-outcome-heading > * {
				margin: -6px 0px 0px 5px !important;
				font-size: var(--d2l-heading-4_-_font-size);
				font-weight: var(--d2l-heading-4_-_font-weight);
			}

			.d2l-collapsible-node {
				display: flex;
				background-color: var(--non-leaf-background);
				border: var(--leaf-border);
			}

			.node-header-content {
				display: -webkit-inline-box;
				margin-left: var(--sublevel-cell-margin);
				line-height: 28px;
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

			d2l-icon {
				margin-top: 6px;
				margin-right: 8px;
			}

			ul {
				list-style-type:none;
				padding: 0px;
				flex: 1;
				word-break: break-word;
				margin-bottom: 0px;
				margin-block-start: 0em;
				transition:visibility 0.3s linear,opacity 0.3s linear;
			}

			li {
				list-style-type: none;
				border: 2px solid transparent;
				border-top-color: var(--d2l-color-gypsum);
				color: var(--d2l-color-ferrite);
			}

			d2l-input-checkbox {
				padding-left: var(--sublevel-cell-margin);
				padding-right: var(--sublevel-cell-margin);
				padding-top: 12px;
				padding-bottom: 12px;
				margin: 0;
			}

			.d2l-select-outcomes-leaf:hover {
				z-index: 1;
				background-color: var(--d2l-color-celestine-plus-2);
				border-top: 2px solid var(--d2l-color-celestine-plus-1);
				border-bottom: 2px solid var(--d2l-color-celestine-plus-1);
				color: var(--d2l-color-celestine);
			}

			.d2l-hierarchy-tree {
                border: 1px solid transparent;
                border-bottom-color: var(--d2l-color-gypsum);
			}

			.leaf-node-container {
				background-color: var(--leaf-background-colour);
				border: var(--leaf-border);
				margin: -2px;
			}

			#children-collapse {
				--iron-collapse-transition-duration: 200ms;
			}

		</style>
		<div 
			id="container"
			tabindex="-1"
			role="treeitem"
			aria-selected$="[[_ariaSelected]]"
			aria-expanded$="[[_ariaExpanded]]">
			<template is="dom-if" if="[[_isLeafNode(item)]]">
				<div class="leaf-node-container">
					<d2l-input-checkbox id="checkbox" tabindex="-1" not-tabbable="true" checked="[[_isSelected]]" indeterminate="[[_getIndeterminate(item)]]" on-change="_onOutcomeSelectChange" data-index$="[[index]]" >
						<div class="d2l-outcome-wrap" aria-label$="[[_leafAriaLabel]]">
							<template is="dom-if" if="[[_hasOutcomeIdentifier(item)]]">
								<div class="d2l-outcome-identifier">
									<d2l-bold-text-wrapper content="[[_getOutcomeIdentifier(item, searchText)]]"></d2l-bold-text-wrapper>
								</div>
							</template>
							<div class="d2l-outcome-text">
								<s-html hidden="[[!_fromTrustedSource(item)]]" html="[[getOutcomeDescriptionHtml(item)]]"></s-html>
								<div hidden="[[_fromTrustedSource(item)]]">
									<d2l-bold-text-wrapper content="[[getOutcomeDescriptionPlainText(item)]]"></d2l-bold-text-wrapper>
								</div>
							</div>
						</div>
					</d2l-input-checkbox>
				</div>
			</template>
			<template is="dom-if" if="[[_isNonLeafNode(item)]]">
				<div>
					<div class="d2l-collapsible-node" aria-label$="[[_headerAriaLabel]]">
						<div class="node-header-content">
							<d2l-icon icon="[[_collapseIcon]]"></d2l-icon>
							<div class="d2l-outcome-heading">
								<template is="dom-if" if="[[_hasOutcomeDescription(item)]]">
									<h4>[[getOutcomeDescriptionPlainText(item)]]</h4>
								</template>
							</div>
						</div>
					</div>
					<iron-collapse opened$=[[!_collapsed]] id="children-collapse">
						<ul>
							<template is="dom-repeat" items="[[_children]]" index-as="outcomesIndex">
								<li class$="[[_getCellClass(item)]]" tabindex="-1">
									<d2l-outcome-hierarchy-item
										id$="[[outcomesIndex]]"
										item="[[item]]"
										index="[[outcomesIndex]]"
										tabindex="-1"
										alignments="[[alignments]]"
										partial-alignments="[[partialAlignments]]"
										current-level="[[_nextLevel]]"
										parentNode="[[root]]"
										is-last="[[_getOutcomeIsLast(outcomesIndex)]]"
										search-text="[[searchText]]"
										on-focus-next="_focusNextSibling"
										on-focus-previous="_focusPreviousSibling"
										on-focus-parent="_focusSelf"
										on-focus-child="_onFocusChild"
										on-focus-last-child="_onFocusLastChild"
										on-focus-tree-start="_onFocusTreeStart"
										on-focus-tree-end="_onFocusTreeEnd">
									</d2l-outcome-hierarchy-item>
								</li>
							</template>
						</ul>
					</iron-collapse>
				</div>
			</template>
			<template is="dom-if" if="[[_isHierarchyStart(item)]]">
				<div
					class="d2l-hierarchy-tree"
					role="application tree"
					aria-multiselectable="true"
					aria-label="[[localize('outcomesHierarchicalTree')]]">
					<ul>
						<template is="dom-repeat" items="[[_children]]" index-as="outcomesIndex">
							<li class$="[[_getCellClass(item)]]" tabindex="-1">
								<d2l-outcome-hierarchy-item
									id$="[[outcomesIndex]]"
									item="[[item]]"
									index="[[outcomesIndex]]"
									tabindex="-1"
									alignments="[[alignments]]"
									partial-alignments="[[partialAlignments]]"
									current-level="[[_nextLevel]]"
									parentNode="[[root]]"
									is-last="[[_getOutcomeIsLast(outcomesIndex)]]"
									search-text="[[searchText]]"
									on-focus-next="_focusNextSibling"
									on-focus-previous="_focusPreviousSibling"
									on-focus-parent="_focusSelf"
									on-focus-last-child="_onFocusLastChild"
									on-focus-tree-start="_onFocusTreeStart"
									on-focus-tree-end="_onFocusTreeEnd">
								</d2l-outcome-hierarchy-item>
							</li>
						</template>
					</ul>
				</div>
			</template>
		</div>
	</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({

	is: 'd2l-outcome-hierarchy-item',

	behaviors: [
		window.D2L.PolymerBehaviors.SelectOutcomes.LocalizeBehavior,
		OutcomeParserBehavior,
	],

	properties: {
		item: {
			type: Object
		},
		alignments: {
			type: Set
		},
		partialAlignments: {
			type: Set
		},
		_children: {
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
		},
		_nextLevel: {
			type: Number,
			computed: '_getNextLevel(currentLevel)'
		},
		_isSelected: {
			type: Boolean
		},
		parentNode: {
			type: Object
		},
		index: {
			type: Number,
			value: -1
		},
		isLast: {
			type: Number,
			value: false
		},
		currentLevel: {
			type: Number
		},
		_ariaSelected: {
			type: String,
		},
		_ariaExpanded: {
			type: String,
			computed: '_getAriaExpanded(item, _collapsed)'
		},
		_headerAriaLabel: {
			type: String,
			computed: '_computeHeaderAriaLabel(item, _collapsed, currentLevel)',
		},
		_leafAriaLabel: {
			type: String,
			computed: '_computeLeafAriaLabel(item, _isSelected)',
		}
	},

	observers: [
		'_setIsSelectedState(item, alignments)',
		'_setAriaSelected(item, _isSelected)'
	],

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

	ready: function() {
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this._expandCollapse = this._expandCollapse.bind(this);

		const marginLeft = 12 * this.currentLevel;
		this.updateStyles({
			'--leaf-border': '2px solid transparent',
			'--non-leaf-background': '#F9FBFF',
		});
		if (this._isSelected) {
			this.updateStyles({
				'--sublevel-cell-margin': `${marginLeft}px`,
				'--leaf-background-colour': 'var(--d2l-color-celestine-plus-2)'
			});
		} else {
			this.updateStyles({
				'--sublevel-cell-margin': `${marginLeft}px`,
				'--leaf-background-colour': 'transparent',
			});
		}
	},

	attached: function() {
		this.addEventListener('focus', this.onFocus);
		this.addEventListener('blur', this.onBlur);
		this.addEventListener('click', this._expandCollapse);
	},

	detached: function() {
		this.removeEventListener('focus', this.onFocus);
		this.removeEventListener('blur', this.onBlur);
		this.removeEventListener('click', this._expandCollapse);
	},

	onFocus: function(e) {
		e.stopPropagation();
		if (this._isHierarchyStart(this.item)) {
			return this._selectFirstNode();
		} else {
			const elem = this.shadowRoot.getElementById('container');
			if (elem) {
				elem.focus({
					preventScroll: true
				});
			}
		}
		const event = new CustomEvent('focus-child');
		event.node = this;
		this.dispatchEvent(event);

		this.updateStyles({
			'--leaf-border': '2px solid var(--d2l-color-celestine-plus-1)',
			'--non-leaf-background': 'var(--d2l-color-celestine-plus-2)',
		});

		this._focus = true;
		this.keydownEventListener = this._handleKeyDown.bind(this);
		window.addEventListener('keydown', this.keydownEventListener);
	},

	onBlur: function() {
		this.updateStyles({
			'--leaf-border': '2px solid transparent',
			'--non-leaf-background': '#F9FBFF',
		});
		this._blurContainer();
		this._focus = false;
		window.removeEventListener('keydown', this.keydownEventListener);
	},

	_getAriaExpanded: function(item, _collapsed) {
		if (!item || !item.entities || !this._isNonLeafNode(item)) {
			return undefined;
		} else if (_collapsed) {
			return 'false';
		} else {
			return 'true';
		}
	},

	_setAriaSelected: function(item, _isSelected) {
		if (!item || !item.class) {
			this._ariaSelected = undefined;
		} else if (_isSelected || !this._isLeafNode(item)) {
			this._ariaSelected = 'true';
		} else {
			this._ariaSelected = 'false';
		}
	},

	_getHierarchy: function(item) {
		if (!item || !item.entities) {
			return [];
		}
		return item.entities.filter(function(e) {return e.class.includes('hierarchical-outcome'); });
	},

	_hasChildren() {
		return this._children && this._children.length;
	},

	_isLeafNode: function(item) {
		return item.class.includes('leaf-outcome');
	},

	_isNonLeafNode: function(item) {
		return item.class.includes('collection');
	},

	_isHierarchyStart: function(item) {
		return item.class.includes('hierarchy-start');
	},

	_setIsSelectedState: function(item, alignments) {
		const canSelect = alignments && item && item.properties && item.properties.objectiveId;
		this._isSelected = canSelect ? alignments.has(item.properties.objectiveId) : false;

		this.updateStyles({
			'--leaf-background-colour': this._isSelected ? 'var(--d2l-color-celestine-plus-2)' : 'transparent',
		});
	},

	_hasOutcomeIdentifier: function(entity) {
		return !!this.getOutcomeIdentifier(entity);
	},

	_hasOutcomeDescription: function(entity) {
		return !!this.getOutcomeDescriptionPlainText(entity);
	},

	_expandCollapse: function(event) {
		this._collapsed = !this._collapsed;
		this.blur();
		this._focusSelf();
		if (event) {
			event.stopPropagation();
		}
	},

	_expandCollapseIfLeaf: function() {
		if (this._isLeafNode(this.item)) {
			const elem = this.shadowRoot.getElementById('checkbox');
			if (elem) {
				elem.simulateClick();
			}
		}
	},

	_getIndeterminate: function(item) {
		return this.partialAlignments.has(this.item.properties.objectiveId);
	},

	_redrawIcon: function(_collapsed) {
		return _collapsed ? 'd2l-tier1:arrow-expand' : 'd2l-tier1:arrow-collapse';
	},

	_onOutcomeSelectChange: function(e) {
		var target = e.target;
		if (target.checked) {
			this._isSelected = true;
			this.updateStyles({
				'--leaf-background-colour': 'var(--d2l-color-celestine-plus-2)',
			});
			this.alignments.add(this.item.properties.objectiveId);
			this.partialAlignments.delete(this.item.properties.objectiveId);
		} else {
			this._isSelected = false;
			this.updateStyles({
				'--leaf-background-colour': 'transparent',
			});
			this.alignments.delete(this.item.properties.objectiveId);
			this.partialAlignments.delete(this.item.properties.objectiveId);
		}

		this.dispatchEvent(new CustomEvent('d2l-alignment-list-changed', {
			bubbles: true,
			composed: true
		}));
	},

	_getCellClass: function(item) {
		return this._isLeafNode(item) ? 'd2l-select-outcomes-leaf' : ' d2l-select-outcomes-collection';
	},

	_getNextLevel: function(currentLevel) {
		return currentLevel ? currentLevel + 1 : 1;
	},

	_getOutcomeIsLast: function(outcomeIndex) {
		return outcomeIndex === this._children.length - 1;
	},

	_handleKeyDown: function(e) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			e.stopPropagation();
			this._focusNext();
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			e.stopPropagation();
			this._moveUpTree();
		} else if (e.key === 'ArrowLeft') {
			e.preventDefault();
			e.stopPropagation();
			if (this._hasChildren() && !this._collapsed) {
				this._expandCollapse();
			} else if (this.currentLevel > 1) {
				this._focusParent();
			}
		} else if (e.key === 'ArrowRight') {
			e.preventDefault();
			e.stopPropagation();
			if (this._hasChildren() && this._collapsed) {
				this._expandCollapse();
			} else {
				this._focusChild();
			}
		} else if (e.key === 'Enter') {
			e.preventDefault();
			e.stopPropagation();
			if (this._isLeafNode(this.item)) {
				const elem = this.shadowRoot.getElementById('checkbox');
				if (elem) {
					elem.simulateClick();
				}
			} else if (this._isNonLeafNode(this.item)) {
				this._expandCollapse();
			}
		} else if (e.keyCode === 32) {
			e.preventDefault();
			e.stopPropagation();
			if (this._isLeafNode(this.item)) {
				const elem = this.shadowRoot.getElementById('checkbox');
				if (elem) {
					elem.simulateClick();
				}
			}
		} else if (e.key === 'Home') {
			e.preventDefault();
			e.stopPropagation();
			this._onFocusTreeStart();
		} else if (e.key === 'End') {
			e.preventDefault();
			e.stopPropagation();
			this._onFocusTreeEnd();
		}
	},

	_focusChild: function() {
		if (this._hasChildren() && !this._collapsed) {
			this._blurContainer();
			const elem = this.shadowRoot.getElementById('0');
			if (elem) {
				elem.focus();
			}
		}
	},

	_focusNext: function() {
		if (this._hasChildren() && !this._collapsed) {
			this._focusChild();
		} else {
			this._blurContainer();
			const event = new CustomEvent('focus-next');
			event.index = this.index;
			this.dispatchEvent(event);
		}
	},

	_moveUpTree: function() {
		if (this.index === 0) {
			this._focusParent();
		} else {
			this._blurContainer();
			const event = new CustomEvent('focus-previous');
			event.index = this.index;
			this.dispatchEvent(event);
		}
	},

	_focusNextSibling: function(e) {
		if (e.index < this._children.length - 1) {
			const element = this.shadowRoot.getElementById((e.index + 1).toString());
			if (element) {
				element.focus();
			}
		} else if (this._isHierarchyStart(this.item)) {
			this.focusLastVisibleNode();
		} else {
			const event = new CustomEvent('focus-next');
			event.index = this.index;
			this.dispatchEvent(event);
		}
	},

	_focusPreviousSibling: function(e) {
		if (e.index > 0) {
			const elem = this.shadowRoot.getElementById((e.index - 1).toString());
			if (elem) {
				elem.focusLastVisibleNode();
			}
		}
	},

	_focusParent: function() {
		if (!this.parentNode) return;
		this._blurContainer();
		const event = new CustomEvent('focus-parent');
		this.dispatchEvent(event);
	},

	_focusSelf: function(e) {
		this._blurContainer();
		if (this._isHierarchyStart(this.item)) {
			return this._selectFirstNode();
		}
		e ? this.focus() : this.focus({
			preventScroll: true
		});
	},

	_onFocusChild: function(e) {
		if (this._focus) this.onBlur();
		const event = new CustomEvent('focus-child');
		event.node = e.node;
		this.dispatchEvent(event);
	},

	_selectFirstNode: function() {
		const element = this.shadowRoot.getElementById('0');
		if (element) {
			element.focus();
		}
	},

	_onFocusTreeStart: function() {
		if (this._isHierarchyStart(this.item)) {
			this._selectFirstNode();
		} else {
			this._blurContainer();
			const event = new CustomEvent('focus-tree-start');
			this.dispatchEvent(event);
		}
	},

	_onFocusTreeEnd: function() {
		if (this._isHierarchyStart(this.item)) {
			this.focusLastVisibleNode();
		} else {
			this._blurContainer();
			const event = new CustomEvent('focus-tree-end');
			this.dispatchEvent(event);
		}
	},

	_selectLastNode: function() {
		const element = this.shadowRoot.getElementById((this._children.length - 1).toString());
		if (element) {
			element.focus();
		}
	},

	_blurContainer: function() {
		const elem = this.shadowRoot.getElementById('container');
		if (elem) {
			elem.blur();
		}
	},

	focusLastVisibleNode: function() {
		if (this._isHierarchyStart(this.item) || (this._hasChildren() && !this._collapsed)) {
			const elem = this.shadowRoot.getElementById((this._children.length - 1).toString());
			elem.focusLastVisibleNode();
		} else {
			this.focus();
		}
	},

	_computeHeaderAriaLabel: function(item, collapsed, level) {
		if (!item || !item.properties || collapsed === undefined) return undefined;
		const name = this.getOutcomeDescriptionPlainText(item);
		const status = collapsed ? 'collapsed' : 'expanded';

		return this.localize('a11yHeaderAriaLabel',
			'level', level,
			'status', this.localize(status),
			'name', name
		);
	},

	_computeLeafAriaLabel: function(item, selected) {
		if (!item || !item.properties || selected === undefined) return undefined;

		const shortCode = this.getOutcomeIdentifier(item) || '';
		const description = this.getOutcomeDescriptionPlainText(item) || '';
		const status = selected ? 'selected' : 'notSelected';

		return this.localize('a11yLeafAriaLabel',
			'shortCode', shortCode,
			'status', this.localize(status),
			'description', description
		);
	},

	_getOutcomeIdentifier(entity, searchText) {
		let content = this.getOutcomeIdentifier(entity);
		if (!content || !searchText) return content;

		const escapeRegExp = (s) => s.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
		const searchWords = [...new Set(searchText.split(' ').filter(i => i))];
		if (searchWords.indexOf('b') > 0) { // 'b' has to be the first item, otherwise all <b> tag will be messed up
			searchWords.splice(searchWords.indexOf('b'), 1);
			searchWords.unshift('b');
		}
		const dedupWords = searchWords.filter(item => {
			for (const i of searchWords) {
				if (i !== item && i.indexOf(item) > -1) {
					return false;
				}
			}
			return true;
		});

		for (const i of dedupWords) {
			const searchRegex = new RegExp(escapeRegExp(i), 'ig');
			content = content.replace(searchRegex, '<b>$&</b>');
		}
		return content;
	}
});
