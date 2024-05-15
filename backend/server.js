import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { MongoClient } from "mongodb";
import { queryOpenAI } from "./modules/openai.js";
import { queryRoboflow } from "./modules/roboflow.js";
import { getCalories } from "./modules/mongoDb.js";
import { addSuggestion } from "./modules/addSuggestion.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const corsOptions = {
  origin: "*", 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 

app.use(express.json({ limit: "50mb" }));
app.set("view engine", "ejs");
app.use(express.static("public"));

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db("LYProject");
    const collection = database.collection("ImageData");

    const query = { title: "Back to the Future" };
    const document = await collection.findOne(query);
    console.log(document);
  } finally {
    await client.close();
  }
}
// run().catch(console.dir);
async function insertData(newImage) {
  try {
    await client.connect();
    const database = client.db("LYProject");
    const imagesCollection = database.collection("ImageData");
    const result = await imagesCollection.insertOne(newImage);
    console.log(`Image inserted with id: ${result.insertedId}`);
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await client.close();
  }
}

// > GET
app.get("/api", function (req, res) {
  res.json({ message: "Server is running 🥳" });
});
app.post("/flensv2", async (req, res) => {  
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const ROBOFLOW_API_KEY = process.env.ROBOFLOW_API_KEY;
  const base64Image = req.body.image;
  const dishName = req.body.dishName;
  const resRoboflow = await queryRoboflow(base64Image, ROBOFLOW_API_KEY);
  let result = []
  for (let index = 0; index < resRoboflow.length; index++) {
    const element = resRoboflow[index];
    result = [...result,{
      name:element,
      calories: await getCalories(element),
      suggestion: await addSuggestion(element, OPENAI_API_KEY)
    } ]
  }
  console.log(result);
  res.send(result); 

});
app.post("/flens", async (req, res) => {
  console.log("Image Recevied");
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const ROBOFLOW_API_KEY = process.env.ROBOFLOW_API_KEY;
  const base64Image = req.body.image;
  const dishName = req.body.dishName;

  if (!base64Image) {
    return res.status(400).json({ error: "No image provided" });
  }

  try {
    const resRoboflow = await queryRoboflow(base64Image, ROBOFLOW_API_KEY);
    console.log(resRoboflow);
    const resOpenAI = await queryOpenAI(base64Image, OPENAI_API_KEY, resRoboflow, dishName);
    const data = resOpenAI;
    console.log(data);
    // const data = [
    //   {
    //     name: "Paneer curry",
    //     data: { calories: "200-300" },
    //     suggestion:
    //       "Recommended in moderation due to high protein content but be aware of saturated fat.",
    //   },
    //   {
    //     name: "Dal",
    //     data: { calories: "150-200" },
    //     suggestion:
    //       "Recommended for high protein and fiber content with moderate calories.",
    //   },
    //   {
    //     name: "Mixed vegetable",
    //     data: { calories: "100-150" },
    //     suggestion:
    //       "Highly recommended for being rich in micronutrients and low in calories.",
    //   },
    //   {
    //     name: "Yogurt",
    //     data: { calories: "100-150" },
    //     suggestion:
    //       "Recommended for calcium and probiotics, but watch for added sugars.",
    //   },
    //   {
    //     name: "Chapati",
    //     data: { calories: "80-120" },
    //     suggestion:
    //       "Recommended as a source of complex carbs but should be consumed in moderation.",
    //   },
    //   {
    //     name: "Rice",
    //     data: { calories: "200-250" },
    //     suggestion:
    //       "Can be consumed in moderation, preferably as brown rice for more fiber.",
    //   },
    // ];
    
    const newImage = {
      image: base64Image,
      data: data,
      resRoboflow: resRoboflow,
    };
    await insertData(newImage);

    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error 🚨" });
  }
});

app.get("/", async(req, res) => {
  const result = await getCalories("aloo_gobi")
  res.send(result); 
});

// > POST
app.post("/form", function (req, res) {
  res.render("login");
});

// > LESTEN
app.listen(PORT, function () {
  console.log("Server started at http://localhost:" + PORT);
});
