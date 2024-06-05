import IUser from "./IUser";
import IUserCreate from "./IUserCreate";

export default interface IUserOrm {
    create(IUser : IUser): Promise<IUserCreate>;
    update(IUser : IUser): Promise<IUserCreate>;
    login(email: string, password: string): Promise<any>;
    get(id: number): Promise<string>;
}