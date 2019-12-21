import SirenParse from 'siren-parser';

window.d2lfetch.fetch = function(href) {
	return D2L.PolymerBehaviors.FetchSirenEntityBehavior._makeRequest({ url: href, formData: function() { return Promise.resolve(); } })
		.then(function(body) {
			return {
				ok: true,
				json: function() {
					return Promise.resolve(body);
				}
			};
		})
		.catch(function(err) {
			return {
				ok: false,
				text: function() {
					return Promise.resolve(err.message);
				}
			};
		});
};
D2L.PolymerBehaviors.FetchSirenEntityBehavior._makeRequest = function(request) {
	var href = request.url && request.url.href || request.url;
	switch (href) {
		case 'https://15215d45-f7e9-4967-bf9b-13a685538829.activities.api.proddev.d2l/activities/6606_3000_1/usages/6609':
			return Promise.resolve(SirenParse({
				'class': [
					'activity',
					'discussion-activity'
				],
				'rel': [
					'https://activities.api.brightspace.com/rels/activity-usage'
				],
				'entities': [
					{
						'class': [
							'date',
							'start-date'
						],
						'rel': [
							'https://api.brightspace.com/rels/date'
						],
						'properties': {
							'date': '2011-01-01T15:00:00.000Z'
						}
					}
				],
				'links': [
					{
						'rel': [
							'self'
						],
						'href': 'https://15215d45-f7e9-4967-bf9b-13a685538829.activities.api.proddev.d2l/activities/6606_3000_1/usages/6609'
					},
					{
						'rel': [
							'https://activities.api.brightspace.com/rels/my-activity-usage'
						],
						'href': 'https://15215d45-f7e9-4967-bf9b-13a685538829.activities.api.proddev.d2l/activities/6606_3000_1/usages/6609/users/169'
					},
					{
						'rel': [
							'https://discussions.api.brightspace.com/rels/topic'
						],
						'href': 'https://15215d45-f7e9-4967-bf9b-13a685538829.discussions.api.proddev.d2l/6609/forums/1/topics/1'
					},
					{
						'rel': [
							'https://api.brightspace.com/rels/organization'
						],
						'href': 'https://15215d45-f7e9-4967-bf9b-13a685538829.organizations.api.proddev.d2l/6609'
					},
					{
						'rel': [
							'https://alignments.api.brightspace.com/rels/alignments'
						],
						'href': 'https://15215d45-f7e9-4967-bf9b-13a685538829.alignments.api.proddev.d2l/activity/6606_3000_1/6609'
					},
					{
						'rel': [
							'https://api.brightspace.com/rels/organization'
						],
						'href': 'https://15215d45-f7e9-4967-bf9b-13a685538829.organizations.api.proddev.d2l/6609'
					}
				]
			}));

		case 'https://15215d45-f7e9-4967-bf9b-13a685538829.alignments.api.proddev.d2l/activity/6606_3000_1/6609':
			return Promise.resolve(SirenParse({
				'class': [
					'collection',
					'alignments'
				],
				'links': [
					{
						'rel': [
							'self'
						],
						'href': 'https://15215d45-f7e9-4967-bf9b-13a685538829.alignments.api.proddev.d2l/activity/6606_3000_1/6609'
					},
					{
						'rel': [
							'https://activities.api.brightspace.com/rels/activity-usage'
						],
						'href': 'https://15215d45-f7e9-4967-bf9b-13a685538829.activities.api.proddev.d2l/activities/6606_3000_1/usages/6609'
					}
				],
				'entities': [
					{
						'class': [ 'alignment' ],
						'rel': [ 'item' ],
						'href': 'https://15215d45-f7e9-4967-bf9b-13a685538829.alignments.api.proddev.d2l/activity-usage/6606_3000_1/6609/49c0c89e-eb55-43ce-80c7-b4e5d44c3a5a/e3797193-22d0-45ca-ac20-9b718675f991'
					},
					{
						'class': [ 'alignment' ],
						'rel': [ 'item' ],
						'href': 'https://15215d45-f7e9-4967-bf9b-13a685538829.alignments.api.proddev.d2l/activity-usage/6606_3000_1/6609/49c0c89e-eb55-43ce-80c7-b4e5d44c3a5a/af009bad-9991-4a32-847b-14fd9812c633'
					}
				],
				'actions': [
					{
						'href': 'https://15215d45-f7e9-4967-bf9b-13a685538829.alignments.api.proddev.d2l/activity/6606_3000_1/6609/update',
						'name': 'start-update-alignments',
						'method': 'POST'
					}
				]
			}));

		case 'https://15215d45-f7e9-4967-bf9b-13a685538829.outcomes.api.proddev.d2l/registries/697a50cf-9c30-4a8c-970a-b67fa0807ef8/d31d0671-bdad-4f08-9da9-65351e3b250a':
			return Promise.resolve(SirenParse({
				'class': [
					'intent'
				],
				'links': [
					{
						'rel': [
							'self'
						],
						'href': 'https://15215d45-f7e9-4967-bf9b-13a685538829.outcomes.api.proddev.d2l/registries/697a50cf-9c30-4a8c-970a-b67fa0807ef8/d31d0671-bdad-4f08-9da9-65351e3b250a'
					},
					{
						'rel': [
							'https://outcomes.api.brightspace.com/rels/outcome'
						],
						'href': 'https://15215d45-f7e9-4967-bf9b-13a685538829.outcomes.api.proddev.d2l/outcomes/d31d0671-bdad-4f08-9da9-65351e3b250a'
					}
				]
			}));

		case 'https://15215d45-f7e9-4967-bf9b-13a685538829.outcomes.api.proddev.d2l/registries/697a50cf-9c30-4a8c-970a-b67fa0807ef8/edcdd008-20f2-4934-9017-e53650505eae':
			return Promise.resolve(SirenParse({
				'class': [
					'intent'
				],
				'links': [
					{
						'rel': [
							'self'
						],
						'href': 'https://15215d45-f7e9-4967-bf9b-13a685538829.outcomes.api.proddev.d2l/registries/697a50cf-9c30-4a8c-970a-b67fa0807ef8/edcdd008-20f2-4934-9017-e53650505eae'
					},
					{
						'rel': [
							'https://outcomes.api.brightspace.com/rels/outcome'
						],
						'href': 'https://15215d45-f7e9-4967-bf9b-13a685538829.outcomes.api.proddev.d2l/outcomes/edcdd008-20f2-4934-9017-e53650505eae'
					}
				]
			}));

		case 'https://15215d45-f7e9-4967-bf9b-13a685538829.outcomes.api.proddev.d2l/outcomes/d31d0671-bdad-4f08-9da9-65351e3b250a':
			return Promise.resolve(SirenParse({
				'class': [
					'outcome'
				],
				'properties': {
					'notation': '',
					'description': 'English, Grade 11 University Preparation EAE3U',
					'jurisdiction': 'Ontario'
				},
				'links': [
					{
						'rel': [
							'self'
						],
						'href': 'https://15215d45-f7e9-4967-bf9b-13a685538829.outcomes.api.proddev.d2l/outcomes/d31d0671-bdad-4f08-9da9-65351e3b250a'
					},
					{
						'rel': [
							'about'
						],
						'href': 'http://asn.desire2learn.com/resources/S2831125'
					}
				]
			}));

		case 'https://15215d45-f7e9-4967-bf9b-13a685538829.outcomes.api.proddev.d2l/outcomes/edcdd008-20f2-4934-9017-e53650505eae':
			return Promise.resolve(SirenParse({
				'class': [
					'outcome'
				],
				'properties': {
					'altNotation': '',
					'notation': '',
					'description': 'explore the algebraic development of the quadratic formula (e.g., given the algebraic development, connect the steps to a numeric example; follow a demonstration of the algebraic development, with technology, such as computer algebra systems, or without technology [student reproduction of the development of the general case is not required]), and apply the formula to solve quadratic equations, using technology',
					'label': 'Specific Expecation',
					'listId': '1.6'
				},
				'links': [
					{
						'rel': [
							'self'
						],
						'href': 'https://15215d45-f7e9-4967-bf9b-13a685538829.outcomes.api.proddev.d2l/outcomes/edcdd008-20f2-4934-9017-e53650505eae'
					},
					{
						'rel': [
							'about'
						],
						'href': 'http://asn.desire2learn.com/resources/S2686684'
					}
				]
			}));

		case 'https://15215d45-f7e9-4967-bf9b-13a685538829.alignments.api.proddev.d2l/activity-usage/6606_3000_1/6609/49c0c89e-eb55-43ce-80c7-b4e5d44c3a5a/e3797193-22d0-45ca-ac20-9b718675f991':
			return Promise.resolve(SirenParse({
				'class': [
					'alignment'
				],
				'properties': {
					'relationshipType': 'owned'
				},
				'links': [
					{
						rel: [ 'collection' ],
						href: 'https://15215d45-f7e9-4967-bf9b-13a685538829.alignments.api.proddev.d2l/activity/6606_3000_1/6609'
					},
					{
						rel: [ 'self' ],
						href: 'https://15215d45-f7e9-4967-bf9b-13a685538829.alignments.api.proddev.d2l/activity-usage/6606_3000_1/6609/49c0c89e-eb55-43ce-80c7-b4e5d44c3a5a/e3797193-22d0-45ca-ac20-9b718675f991'
					},
					{
						rel: [ 'https://outcomes.api.brightspace.com/rels/intent' ],
						href: 'https://15215d45-f7e9-4967-bf9b-13a685538829.outcomes.api.proddev.d2l/registries/697a50cf-9c30-4a8c-970a-b67fa0807ef8/d31d0671-bdad-4f08-9da9-65351e3b250a'
					}
				]
			}));

		case 'https://15215d45-f7e9-4967-bf9b-13a685538829.alignments.api.proddev.d2l/activity-usage/6606_3000_1/6609/49c0c89e-eb55-43ce-80c7-b4e5d44c3a5a/af009bad-9991-4a32-847b-14fd9812c633':
			return Promise.resolve(SirenParse({
				'class': [
					'alignment'
				],
				'properties': {
					'relationshipType': 'owned'
				},
				'links': [
					{
						rel: [ 'collection' ],
						href: 'https://15215d45-f7e9-4967-bf9b-13a685538829.alignments.api.proddev.d2l/activity/6606_3000_1/6609'
					},
					{
						rel: [ 'self' ],
						href: 'https://15215d45-f7e9-4967-bf9b-13a685538829.alignments.api.proddev.d2l/activity-usage/6606_3000_1/6609/49c0c89e-eb55-43ce-80c7-b4e5d44c3a5a/af009bad-9991-4a32-847b-14fd9812c633'
					},
					{
						rel: [ 'https://outcomes.api.brightspace.com/rels/intent' ],
						href: 'https://15215d45-f7e9-4967-bf9b-13a685538829.outcomes.api.proddev.d2l/registries/697a50cf-9c30-4a8c-970a-b67fa0807ef8/edcdd008-20f2-4934-9017-e53650505eae'
					}
				]
			}));

		case 'https://15215d45-f7e9-4967-bf9b-13a685538829.alignments.api.proddev.d2l/activity/6606_3000_1/6609/update':
		case 'https://15215d45-f7e9-4967-bf9b-13a685538829.alignments.api.proddev.d2l/activity/6606_3000_1/6609/update?submit=0':
			return request.formData().then(function(body) {
				var actions;
				var state = body && body.get('state');
				if (state === '["https://15215d45-f7e9-4967-bf9b-13a685538829.outcomes.api.proddev.d2l/registries/697a50cf-9c30-4a8c-970a-b67fa0807ef8/d31d0671-bdad-4f08-9da9-65351e3b250a"]') {
					actions = [
						{
							'href': 'https://15215d45-f7e9-4967-bf9b-13a685538829.alignments.api.proddev.d2l/activity/6606_3000_1/6609/update?submit=0',
							'name': 'deselect',
							'method': 'POST',
							'fields': [
								{
									'type': 'hidden',
									'name': 'state',
									'value': ''
								}
							]
						}
					];
				} else {
					actions = [
						{
							'href': 'https://15215d45-f7e9-4967-bf9b-13a685538829.alignments.api.proddev.d2l/activity/6606_3000_1/6609/update?submit=0',
							'name': 'select',
							'method': 'POST',
							'fields': [
								{
									'type': 'hidden',
									'name': 'state',
									'value': '["https://15215d45-f7e9-4967-bf9b-13a685538829.outcomes.api.proddev.d2l/registries/697a50cf-9c30-4a8c-970a-b67fa0807ef8/d31d0671-bdad-4f08-9da9-65351e3b250a"]'
								}
							]
						}
					];
				}
				return SirenParse({
					'class': [
						'collection'
					],
					'entities': [
						{
							'class': [
								'alignment-candidate',
								'selected'
							],
							'rel': [
								'item'
							],
							'actions': actions,
							'links': [
								{
									'rel': [
										'https://outcomes.api.brightspace.com/rels/intent'
									],
									'href': 'https://15215d45-f7e9-4967-bf9b-13a685538829.outcomes.api.proddev.d2l/registries/697a50cf-9c30-4a8c-970a-b67fa0807ef8/d31d0671-bdad-4f08-9da9-65351e3b250a'
								}
							]
						}, {
							'class': [
								'alignment-candidate',
								'indeterminate'
							],
							'rel': [
								'item'
							],
							'actions': actions,
							'links': [
								{
									'rel': [
										'https://outcomes.api.brightspace.com/rels/intent'
									],
									'href': 'https://15215d45-f7e9-4967-bf9b-13a685538829.outcomes.api.proddev.d2l/registries/697a50cf-9c30-4a8c-970a-b67fa0807ef8/edcdd008-20f2-4934-9017-e53650505eae'
								}
							]
						}, {
							'class': [
								'alignment-candidate'
							],
							'rel': [
								'item'
							],
							'actions': actions,
							'links': [
								{
									'rel': [
										'https://outcomes.api.brightspace.com/rels/intent'
									],
									'href': 'https://15215d45-f7e9-4967-bf9b-13a685538829.outcomes.api.proddev.d2l/registries/697a50cf-9c30-4a8c-970a-b67fa0807ef8/d31d0671-bdad-4f08-9da9-65351e3b250a'
								}
							]
						}
					],
					'links': [
						{
							'rel': [
								'self'
							],
							'href': 'https://15215d45-f7e9-4967-bf9b-13a685538829.alignments.api.proddev.d2l/activity/6606_3000_1/6609/update?submit=0'
						}
					],
					'actions': [
						{
							'href': 'https://15215d45-f7e9-4967-bf9b-13a685538829.alignments.api.proddev.d2l/activity/6606_3000_1/6609/update?submit=1',
							'name': 'submit',
							'method': 'POST',
							'fields': [
								{
									'type': 'text',
									'name': 'state',
									'value': '[]'
								}
							]
						}
					]
				});
			});
		default:
			return Promise.reject(new Error('Not Found: ' + href));
	}
};
