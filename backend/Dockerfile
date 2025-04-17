FROM nvidia/cuda:12.1.1-base-ubuntu20.04

ENV DEBIAN_FRONTEND=noninteractive \
    CONDA_DIR=/opt/conda \
    PATH=/opt/conda/bin:$PATH

# Install system dependencies, Miniconda, Python packages, then cleanup
RUN apt-get update && apt-get install -y --no-install-recommends \
        wget bzip2 ca-certificates curl git \
        libglib2.0-0 libxext6 libsm6 libxrender1 \
        libssl-dev libffi-dev libnss3 libncurses5 libreadline-dev \
        libsqlite3-dev libbz2-dev liblzma-dev zlib1g-dev \
    && wget --quiet https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O miniconda.sh \
    && bash miniconda.sh -b -p $CONDA_DIR \
    && rm miniconda.sh \
    && $CONDA_DIR/bin/conda create -y -n backend_env python=3.11 \
    && $CONDA_DIR/envs/backend_env/bin/pip install --no-cache-dir --upgrade pip \
    && apt-get purge -y build-essential \
    && apt-get autoremove -y && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /root/.cache

# Set working directory
WORKDIR /app

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN apt-get update && apt-get install -y build-essential \
    && $CONDA_DIR/envs/backend_env/bin/pip install --no-cache-dir -r requirements.txt \
    && rm -rf /var/lib/apt/lists/*

# Copy the rest of the application
COPY . .

# Expose app port
EXPOSE 5000

# Run the application with conditional CACHE_DIR argument
CMD ["/bin/bash", "-c", "if [ -z \"$CACHE_DIR\" ]; then /opt/conda/envs/backend_env/bin/python -u -m main \"$HF_TOKEN\"; else /opt/conda/envs/backend_env/bin/python -u -m main \"$HF_TOKEN\" \"$CACHE_DIR\"; fi"]
