import IUserCreate from "../../domain/interfaces/IUserCreate";

export default interface IUserController {
    create(email: string, password: string, name: string, username: string): Promise<IUserCreate>;
    update(id: number, email: string, password: string, name: string, username: string): Promise<IUserCreate>;
    login(email: string, password: string): Promise<string>;
    get(id: number): Promise<string>;

}