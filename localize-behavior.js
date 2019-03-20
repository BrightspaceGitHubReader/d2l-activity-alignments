import '@polymer/polymer/polymer-legacy.js';
import 'd2l-localize-behavior/d2l-localize-behavior.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.SelectOutcomes = window.D2L.PolymerBehaviors.SelectOutcomes || {};
/** @polymerBehavior D2L.PolymerBehaviors.SelectOutcomes.LocalizeBehaviorImpl */
D2L.PolymerBehaviors.SelectOutcomes.LocalizeBehaviorImpl = {
	properties: {
		locale: {
			type: String,
			value: function() {
				var locale = document.documentElement.lang
					|| document.documentElement.getAttribute('data-lang-default')
					|| 'en-us';
				return locale.toLowerCase();
			}
		},
		resources: {
			value: function() {
				return {
					'en': {
						add: 'Add',
						addLabel: 'Add selection',
						cancel: 'Cancel',
						cancelLabel: 'Cancel selection',
						error: 'An error has occured',
						removeAlignment: 'Remove alignment',
						alignmentRemoved: 'Alignment removed',
						directAlignments: '{header-title} Aligned Directly to This Activity',
						indirectAlignments: '{header-title} Aligned to Rubric Criteria'
					},
					'fr': {
						add: 'Inclure',
						addLabel: 'Inclure la sélection',
						cancel: 'Annuler',
						cancelLabel: 'Annuler la sélection',
						error: 'Une erreur est survenue',
						removeAlignment: 'Supprimer l\'alignement',
						alignmentRemoved: 'L\'alignement a été supprimé'
					}
				};
			}
		}
	}
};
/** @polymerBehavior */
window.D2L.PolymerBehaviors.SelectOutcomes.LocalizeBehavior = [
	D2L.PolymerBehaviors.LocalizeBehavior,
	D2L.PolymerBehaviors.SelectOutcomes.LocalizeBehaviorImpl
];
