FROM python:3.11-slim

ENV DEBIAN_FRONTEND=noninteractive

# Install minimal system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    libglib2.0-0 libxext6 libsm6 libxrender1 \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt \
    && pip cache purge

# Copy the rest of the application
COPY . .

# Expose app port
EXPOSE 5000

# Run the application with conditional CACHE_DIR argument
CMD ["/bin/bash", "-c", "if [ -z \"$CACHE_DIR\" ]; then python -u -m main \"$HF_TOKEN\"; else python -u -m main \"$HF_TOKEN\" \"$CACHE_DIR\"; fi"]
