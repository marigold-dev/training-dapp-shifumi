
import { ContractAbstractionFromContractType, WalletContractAbstractionFromContractType } from './type-utils';
import {  } from './type-aliases';

export type Storage = {
    
};

type Methods = {
    
};

type MethodsObject = {
    
};

type contractTypes = { methods: Methods, methodsObject: MethodsObject, storage: Storage, code: { __type: 'MainDefaultStorageCode', protocol: string, code: object[] } };
export type MainDefaultStorageContractType = ContractAbstractionFromContractType<contractTypes>;
export type MainDefaultStorageWalletType = WalletContractAbstractionFromContractType<contractTypes>;
