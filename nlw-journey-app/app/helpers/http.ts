export type HttpResponse<T> = {
    success: boolean;
    moment: Date;
    statusCode: number;
    data: T;
};
