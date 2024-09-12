export function validateResponse<T>(
    response: any,
    interfaceProps: (keyof T)[]
) {
    const missingFields = interfaceProps.filter((prop) => !(prop in response));
    return {
        isValid: missingFields.length === 0,
        missingFields,
    };
}
