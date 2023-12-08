export interface IBlackListService {
    isRegisterNumberBlocked(registerNumber: string): Promise<boolean>;
}