import { PolymerElement, html } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import OutcomeParserBehavior from './d2l-outcome-parser-behavior.js';
import 'd2l-multi-select/localize-behavior.js';
import 'd2l-multi-select/d2l-multi-select-list-item.js';
import 'd2l-multi-select/d2l-multi-select-list.js';
import 'd2l-hypermedia-constants/d2l-hypermedia-constants.js';
import 'd2l-button/d2l-button-icon.js';
import './localize-behavior.js';
import './d2l-siren-map-helper.js';

class ActivityAlignmentTagList extends mixinBehaviors([
	D2L.PolymerBehaviors.Siren.EntityBehavior,
	D2L.PolymerBehaviors.Siren.SirenActionBehavior,
	D2L.PolymerBehaviors.SelectOutcomes.LocalizeBehavior,
	D2L.Hypermedia.HMConstantsBehavior,
	OutcomeParserBehavior
], PolymerElement) {

	static get properties() {
		return {
			readOnly: {
				type: Boolean,
				value: false
			},
			_alignmentMap: {
				type: Object,
				value: {}
			},
			_intentMap: {
				type: Object,
				value: {}
			},
			_outcomeMap: {
				type: Object,
				value: {}
			},
			_iconStyle: {
				type: String,
				value: null
			}
		};
	}

	static get template() {
		return html`
			<d2l-multi-select-list>
				<template is="dom-repeat" items="[[_getAlignmentToOutcomeMap(_alignmentMap,_intentMap,_outcomeMap)]]">
					<d2l-multi-select-list-item
						text="[[_getOutcomeTextDescription(item)]]"
						short-text="[[_getOutcomeTagText(item)]]"
						max-chars="40"
						deletable="[[_canDelete(item,readOnly)]]"
						on-d2l-multi-select-list-item-deleted="_removeOutcome"
					></d2l-multi-select-list-item>
				</template>
				<template is="dom-if" if="[[_canUpdate(entity,readOnly)]]">
					<d2l-button-icon
						icon="d2l-tier1:add"
						text="[[localize('removeAlignment')]]"
						style$="[[_iconStyle]]"
						on-click="_updateAlignments"
					></d2l-button-icon>
				</template>
			</d2l-multi-select-list>
			<div style="display: none;">
				<template is="dom-repeat" items="[[_getAlignmentHrefs(entity)]]">
					<d2l-siren-map-helper href="[[item]]" token="[[token]]" map="{{_alignmentMap}}"></d2l-siren-map-helper>
				</template>
				<template is="dom-repeat" items="[[_getIntentHrefs(_alignmentMap)]]">
					<d2l-siren-map-helper href="[[item]]" token="[[token]]" map="{{_intentMap}}"></d2l-siren-map-helper>
				</template>
				<template is="dom-repeat" items="[[_getOutcomeHrefs(_intentMap)]]">
					<d2l-siren-map-helper href="[[item]]" token="[[token]]" map="{{_outcomeMap}}"></d2l-siren-map-helper>
				</template>
			</div>
		`;
	}

	constructor() {
		super();
		const userAgent = window.navigator.userAgent;
		if (userAgent.indexOf( 'Trident/' ) >= 0) {
			this._iconStyle = 'transform: translateY( -0.6rem );';
		} else if(
			window.navigator.userAgent.indexOf('Edge/') >= 0 ||
			window.navigator.userAgent.indexOf('WebKit') < 0
		) {
			this._iconStyle = 'transform: translateY( -2px );';
		}
	}

	_getAlignmentHrefs(entity) {
		if (!entity) return [];
		const alignmentEntities = entity.getSubEntitiesByClass('alignment');
		return alignmentEntities.map(alignment => alignment.href);
	}

	_getIntentHrefs(alignmentMap) {
		return Object.keys(alignmentMap).map(alignmentHref =>
			alignmentMap[alignmentHref].getLinkByRel(this.HypermediaRels.Outcomes.intent).href
		);
	}

	_getOutcomeHrefs(intentMap) {
		return Object.keys(intentMap).map(intentHref =>
			intentMap[intentHref].getLinkByRel(this.HypermediaRels.Outcomes.outcome).href
		);
	}

	_getAlignmentToOutcomeMap(alignmentMap, intentMap, outcomeMap) {
		const mappings = [];
		Object.keys(alignmentMap).forEach(alignmentHref => {
			const alignment = alignmentMap[alignmentHref];
			if (!alignment) return;
			const intent = intentMap[alignment.getLinkByRel(this.HypermediaRels.Outcomes.intent).href];
			if (!intent) return;
			const outcome = outcomeMap[intent.getLinkByRel(this.HypermediaRels.Outcomes.outcome).href];
			if (!outcome) return;
			mappings.push({
				alignmentHref: alignmentHref,
				outcomeEntity: outcome
			});
		});
		return mappings;
	}

	_getOutcomeTagText(outcomeMapping) {
		const outcome = outcomeMapping.outcomeEntity;
		if (this.outcomeHasNotation(outcome)) {
			return outcome.properties.notation || outcome.properties.altNotation;
		} else if (this.outcomeHasNotationOrLabel(outcome)) {
			return this.getOutcomeIdentifier(outcome);
		} else {
			return this.getOutcomeDescriptionPlainText(outcome);
		}
	}

	_getOutcomeTextDescription(outcomeMapping) {
		return this.getOutcomeDescriptionPlainText(outcomeMapping.outcomeEntity);
	}

	_canDelete(outcomeMapping, readOnly) {
		if (readOnly) return false;
		const alignment = this._alignmentMap[outcomeMapping.alignmentHref];
		return alignment && alignment.hasActionByName(this.HypermediaActions.alignments.removeAlignment);
	}

	_removeOutcome(event) {
		const alignment = this._alignmentMap[event.model.item.alignmentHref];
		if (!alignment) return;
		const deleteAlignmentAction = alignment.getActionByName(this.HypermediaActions.alignments.removeAlignment);
		if (!deleteAlignmentAction) return;
		this.performSirenAction(deleteAlignmentAction);
	}

	_canUpdate(entity, readOnly) {
		return !readOnly && entity && entity.hasActionByName(this.HypermediaActions.alignments.startUpdateAlignments);
	}

	_updateAlignments(event) {
		this.dispatchEvent(
			new CustomEvent(
				'd2l-activity-alignment-tags-update', {
					composed: true,
					bubbles: true,
					sirenAction: this.entity.getActionByName(this.HypermediaActions.alignments.startUpdateAlignments),
					innerEvent: event
				}
			)
		);
	}

}

customElements.define( 'd2l-activity-alignment-tag-list', ActivityAlignmentTagList );
