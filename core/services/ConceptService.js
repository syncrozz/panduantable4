export default class ConceptService {

    static async get(concept) {

        try {

            const response = await fetch(`data/concepts/${concept}.json`);

            if (!response.ok) {

                throw new Error(`Concept '${concept}' not found.`);

            }

            return await response.json();

        } catch (error) {

            console.error(error);

            return {

                id: concept,

                icon: "📘",

                title: concept.toUpperCase(),

                summary: "Maklumat konsep ini masih belum tersedia."

            };

        }

    }

}