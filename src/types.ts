export interface Message {
    is_me: boolean;
    text: string,
    created_at: Date,
    is_loading?: boolean
}
export type menuType = 
    'initial' | 'insertName' | 'insertEmailRegister' | 'insertPassowrd' | 'insertConfirmPassowrd'
    | 'insertEmailLogin' | 'insertPasswordLogin' | 'initialLogged' |'insertDefaultCode' | 'insertDepositBalanceOptions' 
    | 'insertDepositBalanceMotant' | 'insertDepositcurrency'