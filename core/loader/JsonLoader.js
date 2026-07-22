export default class JsonLoader {

    static async load(path) {

        const response = await fetch(path);

        if (!response.ok) {
            throw new Error(`Failed to load: ${path}`);
        }

        return response.json();

    }

}