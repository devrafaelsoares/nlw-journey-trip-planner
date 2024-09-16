const isServer = typeof window === 'undefined';

export const baseUrl = isServer ? 'http://server:8080' : 'http://localhost:8080';

export async function fetchApi<T>(url: string, options: RequestInit = {}, timeout = 8000): Promise<T> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
            },
            signal: controller.signal,
        });

        clearTimeout(id);
        if (response.status >= 400 && response.status <= 599) {
            if (response.status === 409 || response.status === 404 || response.status === 400) {
                const data = JSON.parse(await response.text());
                return data;
            }

            const errorData = await response.json();
            const errorMessage = errorData?.data?.message || response.statusText;
            if (response.status === 500) {
                throw new Error(`Erro do Servidor: ${errorMessage}`);
            }
        }

        const data = await response.json();
        return data as T;
    } catch (error: unknown) {
        if (error.name === 'AbortError') {
            return {
                success: false,
                moment: new Date(),
                statusCode: 500,
                data: { errors: [{ message: 'Serviço indisponível no momento' }] },
            };
        }
    } finally {
        clearTimeout(id);
    }
}
