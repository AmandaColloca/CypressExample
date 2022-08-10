import { faker } from '@faker-js/faker/locale/pt_BR';

export default {
    creditcard: function () {
        var data = {
            number: '5397 4431 2333 8941',
            owner: faker.fake('{{name.firstName}} Accept'),
            expMonth: faker.datatype.number({ min: 1, max: 12 }),
            expYear: faker.datatype.number({ min: 2022, max: 2032 }),
            cvv: faker.finance.creditCardCVV()
        }
        return data
    }
}