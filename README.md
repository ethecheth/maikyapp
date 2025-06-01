# Maiky Application

A modern web application built with a microservices architecture, featuring a Next.js frontend and .NET Core backend, containerized with Docker for easy deployment and scalability.

## 🚀 Key Features

- **Modern Web Interface**: Built with Next.js for optimal performance and user experience
- **Robust Backend**: .NET Core API providing secure and scalable services
- **Database Integration**: MySQL database for reliable data storage
- **Containerized Architecture**: Docker-based deployment for consistent environments
- **Development & Testing**: Comprehensive testing setup with dedicated test environment
- **CI/CD Ready**: Jenkins integration for automated builds and deployments

## 📋 System Requirements

- Docker and Docker Compose
- Git
- Minimum 4GB RAM
- 10GB free disk space
- Ports 8080, 3500, and 3307 available

## 🛠️ Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd maikyapp
```

2. Build and start the services:
```bash
# Build and start the API service
docker compose build api
docker compose up -d api

# Build and start the Web service
docker compose build web
docker compose up -d web
```

3. Verify the services are running:
```bash
docker compose ps
```

## 🚀 Usage

The application will be available at:
- Web Interface: http://localhost:8080
- API Endpoints: http://localhost:3500/api

To view service logs:
```bash
docker compose logs --follow
```

## 🧪 Testing

Run the test suite using:
```bash
# Development environment
docker compose -f docker-compose.dev.yml up

# Test environment
docker compose -f docker-compose.test.yml up testing --abort-on-container-exit --build
```

## 🔧 Development

### Project Structure
- `maikyweb/`: Next.js frontend application
- `maikyapi/`: .NET Core backend API
- `maikytest/`: Test suite and testing utilities
- `reports/`: Test reports and documentation

### Environment Variables
The application uses the following key environment variables:
- `NEXTAUTH_URL`: Authentication URL for the web application
- `NEXT_PUBLIC_API_URL`: API endpoint URL
- Database credentials (configured in docker-compose files)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

MIT License
Copyright (c) 2025 Ethecheth

## 🔍 Additional Notes

- The application uses a bridge network for inter-service communication
- Database data is persisted using Docker volumes
- The API service runs on port 3500, while the web interface runs on port 8080
- MySQL database is accessible on port 3307

For any issues or questions, please open an issue in the repository.