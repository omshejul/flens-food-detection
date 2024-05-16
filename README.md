# Flens: An Advanced Dietary Analysis Application

## Overview

Flens is a cutting-edge dietary analysis application designed to help users make informed dietary choices. By leveraging advanced image recognition techniques, specifically the YOLOv8 model, Flens identifies food items in images and provides detailed nutritional information along with personalized health recommendations. This project is the culmination of a final year college project, focusing on promoting nutritional awareness and healthier eating habits.

## Features

- **Image Capture:** Users can capture and upload images of their meals.
- **Image Recognition:** Utilizes YOLOv8 model to identify food items within images.
- **Nutritional Analysis:** Fetches calorific values and nutritional information from a MongoDB database.
- **Dietary Recommendations:** Provides personalized health suggestions using OpenAI's API.
- **Real-Time Results:** Displays identified food items, nutritional data, and recommendations on the frontend.

## Technology Stack

- **Frontend:** Next.js
- **Backend:** Express.js
- **Database:** MongoDB
- **Image Recognition:** YOLOv8 model deployed on Roboflow
- **Model Training:** Google Colab with T4 GPU
- **APIs:** OpenAI API for dietary recommendations, Roboflow API for food detection

## Installation

### Prerequisites

- Node.js
- MongoDB
- Python (for model training)

### Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/flens.git
   cd flens
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure Environment Variables**
   - Create a `.env` file in the `backend` directory and add your environment variables (e.g., MongoDB connection string, API keys for Roboflow and OpenAI).

5. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```

6. **Start the Frontend Server**
   ```bash
   cd ../frontend
   npm run dev
   ```

## Usage

1. **Capture or Upload an Image:** Use the frontend application to capture or upload an image of your meal.
2. **Image Processing:** The image is sent to the backend server, which forwards it to the YOLOv8 model deployed on Roboflow for food item identification.
3. **Nutritional Analysis:** The identified food items are matched with nutritional data stored in MongoDB.
4. **Dietary Recommendations:** Personalized health suggestions are provided using the OpenAI API.
5. **Results Display:** The frontend displays the identified food items, their nutritional information, and dietary recommendations.


## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License.

## Acknowledgements

- Thanks to [Roboflow](https://roboflow.com/) for providing the platform to manage datasets and deploy the YOLOv8 model.
- Thanks to [OpenAI](https://openai.com/) for their API, which enhances the user experience with personalized dietary recommendations.

## Contact

For any questions or suggestions, please reach out to [Om Shejul](mailto:contect@omshejul.com).

---

This README provides a comprehensive overview of the Flens project, including its features, technology stack, installation instructions, usage guidelines, testing strategies, and more. Feel free to modify the sections as needed to better fit your project's specifics.
