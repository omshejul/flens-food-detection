import { MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

export async function getCalories(name) {
    const uri = process.env.MONGO_URL;
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const database = client.db("LYProject");
        const collection = database.collection("Calories");

        const result = await collection.findOne({ name });

        console.log(result.calories);
        return result.calories+" kcal";
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
    }
}
 

