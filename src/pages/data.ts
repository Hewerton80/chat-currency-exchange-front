import { Message } from '../types';

export const defaultMessagesLogged: Message[] = [
    {
        is_me: false,
        text: '1️ - Ver saldo',
        created_at: new Date()
    },
    {
        is_me: false,
        text: '2️ - Depositar',
        created_at: new Date()
    },
    {
        is_me: false,
        text: '3 - Retirar',
        created_at: new Date()
    },
]

export const defaultMessagesLoggedOut: Message[] = [
    {
        is_me: false,
        text: '1️ - Login',
        created_at: new Date()
    },
    {
        is_me: false,
        text: '2️ - Cadastro',
        created_at: new Date()
    },
]
export const defaultMessagesLoggedOutIniital: Message[] = [
    {
        is_me: false,
        text: 'Olá, seja bem vindo(a) 🖖🤖',
        created_at: new Date()
    },
    {
        is_me: false,
        text: 'Escolha uma opção ❕',
        created_at: new Date()
    },
    ...defaultMessagesLoggedOut
]
export const invalidOptionMessage: Message[] = [
    {
        is_me: false,
        text: 'Ops, opção inválida! 😅',
        created_at: new Date()
    },
    {
        is_me: false,
        text: 'Opções disponíveis 👇',
        created_at: new Date()
    },
]
export const currencyOptionsMessage: Message[] = [
    {
        is_me: false,
        text: '1 - escolher moeda',
        created_at: new Date()
    },
]

export const getFormatMsgObject = (text: string, is_me?: boolean, is_loading?: boolean): Message => {
    return {
        is_me: Boolean(is_me),
        text,
        created_at: new Date(),
        is_loading: Boolean(is_loading)
    }
}
export const currenciescode = [
    "AED",
    "AFN",
    "ALL",
    "AMD",
    "ANG",
    "AOA",
    "ARS",
    "AUD",
    "AWG",
    "AZN",
    "BAM",
    "BBD",
    "BDT",
    "BGN",
    "BHD",
    "BIF",
    "BMD",
    "BND",
    "BOB",
    "BRL",
    "BSD",
    "BTC",
    "BTN",
    "BWP",
    "BYN",
    "BYR",
    "BZD",
    "CAD",
    "CDF",
    "CHF",
    "CLF",
    "CLP",
    "CNY",
    "COP",
    "CRC",
    "CUC",
    "CUP",
    "CVE",
    "CZK",
    "DJF",
    "DKK",
    "DOP",
    "DZD",
    "EGP",
    "ERN",
    "ETB",
    "EUR",
    "FJD",
    "FKP",
    "GBP",
    "GEL",
    "GGP",
    "GHS",
    "GIP",
    "GMD",
    "GNF",
    "GTQ",
    "GYD",
    "HKD",
    "HNL",
    "HRK",
    "HTG",
    "HUF",
    "IDR",
    "ILS",
    "IMP",
    "INR",
    "IQD",
    "IRR",
    "ISK",
    "JEP",
    "JMD",
    "JOD",
    "JPY",
    "KES",
    "KGS",
    "KHR",
    "KMF",
    "KPW",
    "KRW",
    "KWD",
    "KYD",
    "KZT",
    "LAK",
    "LBP",
    "LKR",
    "LRD",
    "LSL",
    "LTL",
    "LVL",
    "LYD",
    "MAD",
    "MDL",
    "MGA",
    "MKD",
    "MMK",
    "MNT",
    "MOP",
    "MRO",
    "MUR",
    "MVR",
    "MWK",
    "MXN",
    "MYR",
    "MZN",
    "NAD",
    "NGN",
    "NIO",
    "NOK",
    "NPR",
    "NZD",
    "OMR",
    "PAB",
    "PEN",
    "PGK",
    "PHP",
    "PKR",
    "PLN",
    "PYG",
    "QAR",
    "RON",
    "RSD",
    "RUB",
    "RWF",
    "SAR",
    "SBD",
    "SCR",
    "SDG",
    "SEK",
    "SGD",
    "SHP",
    "SLL",
    "SOS",
    "SRD",
    "STD",
    "SVC",
    "SYP",
    "SZL",
    "THB",
    "TJS",
    "TMT",
    "TND",
    "TOP",
    "TRY",
    "TTD",
    "TWD",
    "TZS",
    "UAH",
    "UGX",
    "USD",
    "UYU",
    "UZS",
    "VEF",
    "VND",
    "VUV",
    "WST",
    "XAF",
    "XAG",
    "XAU",
    "XCD",
    "XDR",
    "XOF",
    "XPF",
    "YER",
    "ZAR",
    "ZMK",
    "ZMW",
    "ZWL",
]

