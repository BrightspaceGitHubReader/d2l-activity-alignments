import { Selector } from 'testcafe';

fixture `Select`;// eslint-disable-line no-undef

test ('Add Button Available After Selecting First Outcome', async t => {// eslint-disable-line no-undef
	await t
		.navigateTo('http://127.0.0.1:8081/components/d2l-activity-alignments/demo/')
		.wait(3000);//because webcomponts don't do 'end events' correctly so we have to make sure it is loaded before we go looking for stuff in the shadowRoots
	const checkBox = Selector(() => {
		const alignment = document.querySelector('d2l-select-outcomes').shadowRoot.querySelector('d2l-alignment-update').shadowRoot;
		return alignment.querySelector('d2l-input-checkbox').shadowRoot.querySelector('label > input[type="checkbox"]');
	});
	const addButton = await Selector(() => {
		const alignments = document.querySelector('d2l-select-outcomes').shadowRoot.querySelector('d2l-alignment-update').shadowRoot;
		return alignments.querySelector('d2l-button');
	});
	await t
		.click(checkBox)
		.expect(addButton.hasAttribute('disabled')).notOk();
});
