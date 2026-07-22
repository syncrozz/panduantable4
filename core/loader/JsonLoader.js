export default class JsonLoader {

    static async load(path) {

        const response = await fetch(path);

        if (!response.ok) {

            return null;

        }

        console.log(await response.clone().json());

        return response.json();

    }

}