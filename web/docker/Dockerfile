FROM node:20

# Cài bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

WORKDIR /app

# Copy trước package để cài sớm
COPY bun.lockb package.json ./

# Cài dependencies một lần
RUN bun install

# Copy phần còn lại
COPY . .

RUN bun run build

ENV HOST=0.0.0.0