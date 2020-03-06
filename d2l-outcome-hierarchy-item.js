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

$_documentContainer.innerHTML = /*html*/`<dom-module id="d2l-outcome-hierarchy-item">
	<template strip-whitespace="">
		<style>
			:host {
				display: block;
				width: 100%;
				--sublevel-cell-margin: 6px;
			}

			.d2l-outcome-wrap {
				display: flex;
				flex-direction: column-reverse;
				margin-left: 10px;
				width: 100%;
			}

			.d2l-outcome-heading > * {
				margin: 0px;
				font-family: Lato; 
				font-size: 16px; 
				font-weight: bold;
				line-height: 100%;
			}

			.d2l-collapsible-node {
				height: 36px;
				display: flex;
				background-color: #F9FBFF;
			}

			.node-header-content {
				display: flex;
				margin-top: 10px;
				margin-left: var(--sublevel-cell-margin);
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
				margin-right: 8px;
			}

			ul {
				list-style-type:none;
				padding: 0px;
				flex: 1;
				word-break: break-word;
				margin-bottom: 0px;
				margin-block-start: 0em;
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

			d2l-outcome-hierarchy-item {
				background-color: var(--leaf-background-colour);
				border: var(--leaf-border);
				margin:-2px;
			}

		</style>
		<div 
			id="container"
			tabindex="-1"
			role="treeitem"
			aria-selected="[[_ariaSelected]]"
			aria-expanded="[[_ariaExpanded]]">
			<template is="dom-if" if="[[_isLeafNode(item)]]">
				<div>	
					<d2l-input-checkbox id="checkbox" tabindex="-1" not-tabbable="true" checked="[[_isSelected]]" on-change="_onOutcomeSelectChange" data-index$="[[index]]" >
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
				</div>
			</template>
			<template is="dom-if" if="[[_isNonLeafNode(item)]]">
				<div>
					<div class="d2l-collapsible-node">
						<div class="node-header-content">
							<d2l-icon icon="[[_collapseIcon]]"></d2l-icon>
							<div class="d2l-outcome-heading">
								<template is="dom-if" if="[[_hasOutcomeIdentifier(item)]]">
									<h4>[[getOutcomeIdentifier(item)]]</h4>
								</template>
								<template is="dom-if" if="[[!_hasOutcomeIdentifier(item)]]">
									<h4>[[getOutcomeDescriptionPlainText(item)]]</h4>
								</template>
							</div>
						</div>
					</div>
					<template is="dom-if" if="[[!_collapsed]]">
						<ul
							role="group">
							<template is="dom-repeat" items="[[_children]]" index-as="outcomesIndex">
								<li class$="[[_getCellClass(item)]]" tabindex="-1">
									<d2l-outcome-hierarchy-item
										id$="[[outcomesIndex]]"
										item="[[item]]"
										index="[[outcomesIndex]]"
										tabindex="-1"
										alignments="[[alignments]]"
										current-level="[[_nextLevel]]"
										parentNode="[[root]]"
										is-last="[[_getOutcomeIsLast(outcomesIndex)]]"
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
					</template>
				</div>
			</template>
			<template is="dom-if" if="[[_isHierarchyStart(item)]]">
				<div
					class="d2l-hierarchy-tree"
					role="application tree"
					aria-multiselectable="true"
					aria-label="Outcomes Hierarchical Tree">
					<ul>
						<template is="dom-repeat" items="[[_children]]" index-as="outcomesIndex">
							<li class$="[[_getCellClass(item)]]" tabindex="-1">
								<d2l-outcome-hierarchy-item
									id$="[[outcomesIndex]]"
									item="[[item]]"
									index="[[outcomesIndex]]"
									tabindex="-1"
									alignments="[[alignments]]"
									current-level="[[_nextLevel]]"
									parentNode="[[root]]"
									is-last="[[_getOutcomeIsLast(outcomesIndex)]]"
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
		OutcomeParserBehavior
	],

	properties: {
		item: {
			type: Object
		},
		alignments: {
			type: Set
		},
		_children: {
			type: Array,
			computed: '_getHierarchy(item)'
		},
		_collapsed: {
			type: Boolean,
			value: true
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
			type: Boolean,
			value: false
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
			'--leaf-border': '2px solid transparent'
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
				elem.focus();
			}
		}
		const event = new CustomEvent('focus-child');
		event.node = this;
		this.dispatchEvent(event);

		this.updateStyles({
			'--leaf-border': '2px solid var(--d2l-color-celestine-plus-1)'
		});

		this._focus = true;
		this.keydownEventListener = this._handleKeyDown.bind(this);
		window.addEventListener('keydown', this.keydownEventListener);
	},

	onBlur: function() {
		this.updateStyles({
			'--leaf-border': '2px solid transparent'
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
		if (!item || !item.class || !this._isLeafNode(item)) {
			this._ariaSelected = undefined;
		} else if (_isSelected) {
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
		if (alignments && item && item.properties && item.properties.objectiveId) {
			this._isSelected = alignments.has(item.properties.objectiveId);
		} else {
			this._isSelected = false;
		}
	},

	_hasOutcomeIdentifier: function(entity) {
		return !!this.getOutcomeIdentifier(entity);
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
		} else {
			this._isSelected = false;
			this.updateStyles({
				'--leaf-background-colour': 'transparent',
			});
			this.alignments.delete(this.item.properties.objectiveId);
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

	_focusSelf: function() {
		this._blurContainer();
		if (this._isHierarchyStart(this.item)) {
			this._selectFirstNode();
		} else {
			this.focus();
		}
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
	}
});
