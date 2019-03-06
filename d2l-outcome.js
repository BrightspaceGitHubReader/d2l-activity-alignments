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

import 'd2l-loading-spinner/d2l-loading-spinner.js';
import 'd2l-polymer-siren-behaviors/siren-entity-loading.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 's-html/s-html.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import OutcomeParserBehavior from './d2l-outcome-parser-behavior.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-outcome">
	<template strip-whitespace="">
		<style>
			:host {
				display: block;
				width: 100%;
			}

			.d2l-outcome-wrap {
				display: flex;
				flex-direction: column-reverse;
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
		</style>
		<siren-entity-loading href="[[href]]" token="[[token]]">
			<div class="d2l-outcome-wrap">
				<template is="dom-if" if="[[_hasOutcomeIdentifier(entity)]]">
					<div class="d2l-outcome-identifier">[[getOutcomeIdentifier(entity)]]</div>
				</template>
				<div class="d2l-outcome-text">
					<s-html hidden="[[!_fromTrustedSource(entity)]]" html="[[getOutcomeDescriptionHtml(entity)]]"></s-html>
					<span hidden="[[_fromTrustedSource(entity)]]">[[getOutcomeDescriptionPlainText(entity)]]</span>
				</div>
			</div>

			<d2l-loading-spinner slot="loading"></d2l-loading-spinner>
		</siren-entity-loading>
	</template>


</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({

	is: 'd2l-outcome',

	behaviors: [
		D2L.PolymerBehaviors.Siren.EntityLoadingBehavior,
		OutcomeParserBehavior
	],

	_hasOutcomeIdentifier: function(entity) {
		return !!this.getOutcomeIdentifier(entity);
	}

});
