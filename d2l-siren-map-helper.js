import { PolymerElement, html } from '@polymer/polymer';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';

class SirenMapHelper extends mixinBehaviors([
	D2L.PolymerBehaviors.Siren.EntityBehavior
], PolymerElement) {

	static get properties() {
		return {
			map: {
				type: Object,
				notify: true,
				value: {}
			}
		};
	}

	static get template() {
		return html`
			<style>
				:host {
					display: none;
				}
			</style>
		`;
	}

	_onEntityChanged(entity) {
		if (entity && entity.links) {
			this.map[this.href] = entity;
		} else if (this.map[this.href]) {
			delete this.map[this.href];
		}

		// notify object changed
		const mapping = this.map;
		this.set('map', {});
		this.set('map', mapping);
	}

}

customElements.define('d2l-siren-map-helper', SirenMapHelper);
