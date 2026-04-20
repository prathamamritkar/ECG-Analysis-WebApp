# ECG Analysis Web Portal

A cloud-based web application for ECG (Electrocardiogram) data analysis and patient monitoring.

## Project Structure

```
ECG-Analysis-WebApp/
├── app/                    # Main application package
│   ├── __init__.py
│   ├── main.py             # Flask application entry point
│   └── templates/          # HTML templates
│       └── index.html
├── tests/                  # Unit tests
│   └── test_main.py
├── requirements.txt        # Project dependencies
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/ECG-Analysis-WebApp.git
   cd ECG-Analysis-WebApp
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

```bash
python app/main.py
```

The application will start on `http://0.0.0.0:8080`

## Running Tests

```bash
python tests/test_main.py
```

## Deployment

This application is designed to run on AWS EC2 instances. 

### EC2 Setup Instructions:
1. Launch an EC2 instance with Ubuntu Server 22.04 LTS
2. Connect via EC2 Instance Connect
3. Clone this repository and follow the installation steps above
4. Run the Flask application or use Gunicorn for production:
   ```bash
   gunicorn -w 4 -b 0.0.0.0:8080 app.main:app
   ```

## Features

- Real-time patient data syncing
- Cloud-based ECG analysis
- Health status monitoring
- RESTful API integration (planned)

## License

MIT License

## Author

SPPU Cloud Computing Lab
