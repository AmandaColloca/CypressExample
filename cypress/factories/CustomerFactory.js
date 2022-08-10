//var faker = require('faker')
//var cpf = require('gerador-validador-cpf')
import { generate } from 'gerador-validador-cpf'

export default {
    guest: function () {
        var data = {
            address: {
                street: "Rua Barão de Jundiaí",
                streetNumber: "251",
                district: "Centro",
                city: "Jundiaí",
                state: "SP",
                cep: "13201010"
            },
            first_name: "Emmanuel Teste",
            last_name: "Guest",
            email: "emmanuelteste0@mailinator.com",
            person_type: "fisical",
            cpf: generate(),
            telephone: "61991231234"
        }
        return data
    },

    guest_cadastrado: function () {
        var data = {
            address: {
                street: "Rua Barão de Jundiaí",
                streetNumber: "251",
                district: "Centro",
                city: "Jundiaí",
                state: "SP",
                cep: "13201010"
            },
            first_name: "Emmanuel Teste",
            last_name: "Guest Cadastrado",
            email: "emmanuelteste2@mailinator.com",
            person_type: "fisical",
            cpf: "81917363060",
            telephone: "61991231234"
        }
        return data
    },

    customer_sem: function () {
        var data = {
            address: {
                street: "Rua Barão de Jundiaí",
                streetNumber: "251",
                district: "Centro",
                city: "Jundiaí",
                state: "SP",
                cep: "13201010"
            },
            first_name: "Emmanuel Teste",
            last_name: "Com Endereço",
            email: "emmanuelteste2@mailinator.com",
            person_type: "fisical",
            cpf: "43287248006",
            telephone: "61991231234",
            password: "Senha.123"
        }
        return data
    },

    customer_com: function () {
        var data = {
            address: {
                street: "Rua Barão de Jundiaí",
                streetNumber: "251",
                district: "Centro",
                city: "Jundiaí",
                state: "SP",
                cep: "13201010"
            },
            first_name: "Emmanuel Teste",
            last_name: "Com endereço",
            email: "emmanuelteste1@mailinator.com",
            person_type: "fisical",
            cpf: "",
            telephone: "61991231234",
            password: "Senha.123"
        }
        return data
    }

}