
# **Featured Task Management Application**  

A full-featured task management application built with React and Firebase, allowing users to create, edit, update, and delete tasks. The application provides seamless CRUD operations and efficient status management for tasks.  

## **Demo**  
🚀 [Live Demo](https://astonishing-griffin-a1bf80.netlify.app/)  

## **Features**  
- **CRUD Operations**:  
  - Add new tasks.  
  - Edit existing tasks.  
  - Delete tasks.  
  - Update the status of tasks (Not Started, Ongoing, Completed).  

- **Firebase Integration**:  
  - Uses Firebase Realtime Database for storing and managing task data.  

- **Dynamic UI**:  
  - Task cards update dynamically as users interact with the app.  
  - Status updates reflected immediately.  

- **Tooltips**:  
  - Shows contextual information on hover for a better user experience.  

- **Responsive Design**:  
  - Fully functional across devices, ensuring accessibility for all users.  

## **Technologies Used**  
- **Frontend**: React (with hooks like `useState` and `useEffect`)  
- **Backend**: Firebase Realtime Database  
- **Styling**: Custom CSS  
- **Deployment**: Netlify  

## **Getting Started**  

### **1. Clone the Repository**  
```bash  
git clone https://github.com/HimanshuRajputt/Featured-Task-Management-Application-/tree/main/vite-project  
```  

### **2. Install Dependencies**  
Navigate to the project folder and run:  
```bash  
npm install  
```  

### **3. Set Up Firebase**  
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).  
- Set up a Realtime Database and get your API configuration.  
- Add your Firebase configuration to the `.env` file in the root directory:  
  ```env  
  REACT_APP_FIREBASE_API_KEY=your_api_key  
  REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain  
  REACT_APP_FIREBASE_DATABASE_URL=your_database_url  
  REACT_APP_FIREBASE_PROJECT_ID=your_project_id  
  REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket  
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id  
  REACT_APP_FIREBASE_APP_ID=your_app_id  
  ```  

### **4. Start the Application**  
Run the following command to start the development server:  
```bash  
npm start  
```  

### **5. Build for Production**  
To create a production build, use:  
```bash  
npm run build  
```  

## **Project Structure**  
```plaintext  
vite-project/  
├── public/           # Static assets  
├── src/  
│   ├── components/   # React components  
│   ├── styles/       # CSS files  
│   ├── App.js        # Main application file  
│   ├── index.js      # Entry point  
│   
├── package.json      # Dependencies and scripts  
├── .env              # Environment variables  
└── README.md         # Project documentation  
```  

## **Contributing**  
Contributions are welcome! Please feel free to submit a pull request or open an issue if you find bugs or have suggestions.  

## **License**  
This project is licensed under the MIT License.  

## **Author**  
👤 **Himanshu Rajput**  
- [GitHub](https://github.com/HimanshuRajputt)  
- [LinkedIn](www.linkedin.com/in/himanshurajput-00796a322)  
