import { Selector } from 'testcafe';

fixture `Select`// eslint-disable-line no-undef
	.page `http://127.0.0.1:8081/components/d2l-activity-alignments/demo/`
	.beforeEach(async t => {
		t.ctx.checkBox = Selector(() => {
			const alignment = document.querySelector('d2l-select-outcomes').shadowRoot.querySelector('d2l-alignment-update').shadowRoot;
			return alignment.querySelector('d2l-input-checkbox').shadowRoot.querySelector('label input[type="checkbox"]');
		});
		t.ctx.addButton = Selector(() => {
			const alignments = document.querySelector('d2l-select-outcomes').shadowRoot.querySelector('d2l-alignment-update').shadowRoot;
			return alignments.querySelector('d2l-button');
		});
		await t
			.click(t.ctx.checkBox);
	});

test ('Add Button Is Not Disabled', async t => {// eslint-disable-line no-undef
	await t
		.expect(t.ctx.addButton.hasAttribute('disabled')).notOk();
});

// test ('Add Button is Disabled After Canceling Selection', async t =>{// eslint-disable-line no-undef
// 	const cancelButton = Selector(() => {
// 		const alignments = document.querySelector('d2l-select-outcomes').shadowRoot.querySelector('d2l-alignment-update').shadowRoot;
// 		return alignments.querySelectorAll('d2l-button');
// 	}).withText('Cancel');

// 	await t
// 		.click(cancelButton)
// 		.expect(t.ctx.addButton.hasAttribute('disabled')).ok();
// });
