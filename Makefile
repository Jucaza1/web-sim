.PHONY: dev-frontend dev-backend install-frontend install-backend

# install dependencies frontend
install-frontend:
	cd frontend && npm install

# install dependencies backend
install-backend:
	cd backend && npm install

# run dev frontend
dev-frontend:
	cd frontend && npm run dev

# run dev backend
dev-backend:
	cd backend && npm run dev
