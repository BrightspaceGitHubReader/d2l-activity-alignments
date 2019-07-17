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

import 'd2l-button/d2l-button-icon.js';
import 'd2l-icons/tier1-icons.js';
import 'd2l-polymer-siren-behaviors/store/entity-store.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import { Actions, Rels } from 'd2l-hypermedia-constants';
import 'd2l-outcomes-level-of-achievements/d2l-outcomes-level-of-achievements.js';
import 'd2l-resize-aware/d2l-resize-aware.js';
import './d2l-alignment-intent.js';
import './localize-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-alignment">
	<template strip-whitespace="">
		<style>
			div#outer {
				display: flex;
				flex-direction: row;
				align-items: center;
			}

			div.alignment-container {
				display: flex;
				flex: 1;
			}

			d2l-alignment-intent {
				flex: 1;
			}

			d2l-button-icon {
				padding-left: 0.25rem;
			}

			:host-context([dir="rtl"]) {
				padding-right: 0.25rem;
				padding-left: 0;
			}

			d2l-outcomes-level-of-achievements {
				flex: 1;
			}

			div#outer.side-by-side div.alignment-container {
				padding-right: 15px;
			}

			:host-context([dir="rtl"]) div#outer.side-by-side div.alignment-container {
				padding-right: 0px;
				padding-left: 15px;
			}

			div#outer.side-by-side d2l-outcomes-level-of-achievements {
				padding-left: 15px;
			}

			:host-context([dir="rtl"]) div#outer.side-by-side d2l-outcomes-level-of-achievements {
				padding-left: 0px;
				padding-right: 15px;
			}

			div#outer.stack {
				flex-direction: column;
				align-items: stretch;
			}

			div#outer.stack d2l-outcomes-level-of-achievements {
				margin-top: 0.6rem;
			}
			
			d2l-resize-aware {
				width: 100%;
			}
		</style>
		<d2l-resize-aware on-d2l-resize-aware-resized="_stack">
			<div id="outer">
				<div class="alignment-container">
					<d2l-alignment-intent href="[[_getIntent(entity)]]" token="[[token]]"></d2l-alignment-intent>
					<template is="dom-if" if="[[_isRemovable(entity, readOnly)]]">
						<d2l-button-icon icon="d2l-tier1:close-default" text="[[localize('removeAlignment')]]" on-click="_remove"></d2l-button-icon>
					</template>
				</div>
				<template is="dom-if" if="[[_hasDemonstrations(entity)]]">
					<d2l-outcomes-level-of-achievements token="[[token]]" href="[[_getDemonstrations(entity)]]" read-only$="[[readOnly]]"></d2l-outcomes-level-of-achievements>
				</template>
			</div>
		</d2l-resize-aware>
	</template>


</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({

	is: 'd2l-alignment',

	properties: {
		readOnly: Boolean
	},

	behaviors: [
		D2L.PolymerBehaviors.Siren.EntityBehavior,
		D2L.PolymerBehaviors.Siren.SirenActionBehavior,
		window.D2L.PolymerBehaviors.SelectOutcomes.LocalizeBehavior,
	],

	ready: function() {
		this._stack = this._stack.bind(this);
	},

	_getIntent: function(entity) {
		return entity && entity.hasLinkByRel(Rels.Outcomes.intent) && entity.getLinkByRel(Rels.Outcomes.intent).href;
	},

	_hasDemonstrations: function(entity) {
		// TODO: Add to hmConstants when this gets finalized
		return entity && entity.hasLinkByRel('https://achievements.api.brightspace.com/rels/demonstration');
	},

	_getDemonstrations: function(entity) {
		// TODO: Add to hmConstants when this gets finalized
		return this._hasDemonstrations(entity) && entity.getLinkByRel('https://achievements.api.brightspace.com/rels/demonstration').href;
	},

	_isRemovable: function(entity, readOnly) {
		if (readOnly) {
			return false;
		}

		if (!entity) {
			return false;
		}

		if (!entity.hasActionByName(Actions.alignments.removeAlignment)) {
			return false;
		}

		return true;
	},

	_remove: function() {
		var action = this.entity && this.entity.getActionByName(Actions.alignments.removeAlignment);
		if (action) {
			this.dispatchEvent(new CustomEvent('d2l-alignment-remove', {
				bubbles: true,
				composed: true,
				detail: {
					entity: this.entity,
					action: action
				}
			}));
			this.performSirenAction(action);
		}
	},

	_stack: function(e) {
		var width = e.detail.current.width;
		if (width > 630) {
			this.$.outer.classList.add('side-by-side');
			this.$.outer.classList.remove('stack');
		} else {
			this.$.outer.classList.add('stack');
			this.$.outer.classList.remove('side-by-side');
		}
	}

});
