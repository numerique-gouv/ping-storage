type anonymousControllerType<paramsT, queryT, bodyT> = (params: {
    urlParams: paramsT;
    query: queryT;
    body: bodyT;
}) => any | Promise<any>;

export type { anonymousControllerType };
