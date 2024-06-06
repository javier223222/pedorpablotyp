import ITodo from "../../controllers/interfaces/ITodo";

export default interface ITodoPagination {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
    data: ITodo[];
}