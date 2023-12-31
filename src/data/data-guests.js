// Search for: 'jo', 'fa', 'mar', 'emm', 'ah'

import { faker } from '@faker-js/faker';

export const guests = [
	{
		fullName: 'Taha DLRB',
		email: 'tahadlrb7@gmail.com',
		nationality: 'Iran',
		nationalID: '2132141322',
		countryFlag: 'https://flagcdn.com/ir.svg',
	},
	{
		// id: 1000,
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'Portugal',
		nationalID: '3525436345',
		countryFlag: 'https://flagcdn.com/pt.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'Great Britain',
		nationalID: '4534593454',
		countryFlag: 'https://flagcdn.com/gb.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'Finland',
		nationalID: '9374074454',
		countryFlag: 'https://flagcdn.com/fi.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'Germany',
		nationalID: '1233212288',
		countryFlag: 'https://flagcdn.com/de.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'Bolivia (Plurinational State of)',
		nationalID: '0988520146',
		countryFlag: 'https://flagcdn.com/bo.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'United States of America',
		nationalID: '633678543',
		countryFlag: 'https://flagcdn.com/us.svg',
	},

	// GPT
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'United Kingdom',
		nationalID: '1234578901',
		countryFlag: 'https://flagcdn.com/gb.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'Egypt',
		nationalID: '987543210',
		countryFlag: 'https://flagcdn.com/eg.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'Spain',
		nationalID: '1098765321',
		countryFlag: 'https://flagcdn.com/es.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'China',
		nationalID: '102934756',
		countryFlag: 'https://flagcdn.com/cn.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'Sudan',
		nationalID: '1023457890',
		countryFlag: 'https://flagcdn.com/sd.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'Brazil',
		nationalID: '109283465',
		countryFlag: 'https://flagcdn.com/br.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'Mexico',
		nationalID: '108765421',
		countryFlag: 'https://flagcdn.com/mx.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'Egypt',
		nationalID: '1077777777',
		countryFlag: 'https://flagcdn.com/eg.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'United States',
		nationalID: '3245908744',
		countryFlag: 'https://flagcdn.com/us.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'Pakistan',
		nationalID: '1089999363',
		countryFlag: 'https://flagcdn.com/pk.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'Australia',
		nationalID: '44450960283',
		countryFlag: 'https://flagcdn.com/au.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'France',
		nationalID: '06934233728',
		countryFlag: 'https://flagcdn.com/fr.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'India',
		nationalID: '9875412303',
		countryFlag: 'https://flagcdn.com/in.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'Kuwait',
		nationalID: '0123456789',
		countryFlag: 'https://flagcdn.com/kw.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'South Africa',
		nationalID: '2345678901',
		countryFlag: 'https://flagcdn.com/za.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'Japan',
		nationalID: '3456789012',
		countryFlag: 'https://flagcdn.com/jp.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'Saudi Arabia',
		nationalID: '4567890123',
		countryFlag: 'https://flagcdn.com/sa.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'Vietnam',
		nationalID: '5678901234',
		countryFlag: 'https://flagcdn.com/vn.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'South Korea',
		nationalID: '6789012345',
		countryFlag: 'https://flagcdn.com/kr.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'Colombia',
		nationalID: '7890123456',
		countryFlag: 'https://flagcdn.com/co.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'Canada',
		nationalID: '8901234567',
		countryFlag: 'https://flagcdn.com/ca.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'Argentina',
		nationalID: '4343433333',
		countryFlag: 'https://flagcdn.com/ar.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'Nigeria',
		nationalID: '2345678009',
		countryFlag: 'https://flagcdn.com/ng.svg',
	},
	{
		fullName: faker.person.fullName(),
		email: faker.internet.email(),
		nationality: 'Taiwan',
		nationalID: '3456117890',
		countryFlag: 'https://flagcdn.com/tw.svg',
	},
];
