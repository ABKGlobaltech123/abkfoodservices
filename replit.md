# CloudBite - Cloud Kitchen Website

## Overview

CloudBite is a modern full-stack cloud kitchen website that provides food delivery services with both customer-facing and admin/kitchen management capabilities. The application features a React frontend with TypeScript, an Express.js backend, and PostgreSQL database using Drizzle ORM. It offers menu browsing, order management, real-time order tracking, user authentication, and comprehensive admin tools for kitchen operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with custom design tokens and shadcn/ui component library
- **Routing**: Wouter for client-side routing with pages for home, menu, order tracking, and admin dashboard
- **State Management**: React Context API for cart and authentication state, TanStack Query for server state
- **UI Components**: Radix UI primitives with custom styling through shadcn/ui components
- **Font Strategy**: Google Fonts (Inter and Poppins) for typography

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with route-based organization
- **Request Handling**: Express middleware for JSON parsing, logging, and error handling
- **Storage Interface**: Abstract storage interface allowing for different database implementations

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Management**: Centralized schema definitions in shared directory
- **Migrations**: Drizzle Kit for database schema migrations
- **Connection**: Neon Database serverless PostgreSQL connection

### Authentication & Authorization
- **Strategy**: Traditional session-based authentication with email/password
- **User Roles**: Multi-role system supporting customers, admin, and kitchen staff
- **Session Management**: Express sessions with PostgreSQL session store
- **Security**: Input validation using Zod schemas

### Project Structure
- **Monorepo Design**: Client, server, and shared code in single repository
- **Shared Types**: Common TypeScript interfaces and schemas shared between frontend and backend
- **Path Aliases**: TypeScript path mapping for clean imports (@/ for client, @shared for shared code)

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React 18 with TypeScript support
- **Build Tool**: Vite with React plugin and runtime error overlay
- **Component Library**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with PostCSS processing
- **State Management**: TanStack React Query for server state management
- **Form Handling**: React Hook Form with Hookform resolvers for validation
- **Date Utilities**: date-fns for date formatting and manipulation
- **Icons**: Lucide React for consistent iconography

### Backend Dependencies
- **Server Framework**: Express.js for HTTP server
- **Database**: Drizzle ORM with PostgreSQL dialect using Neon serverless driver
- **Development**: tsx for TypeScript execution in development
- **Session Storage**: connect-pg-simple for PostgreSQL session management
- **Build**: esbuild for production bundling

### Development Tools
- **Type Checking**: TypeScript compiler with strict mode enabled
- **Database Tools**: Drizzle Kit for schema management and migrations
- **Runtime**: Node.js with ES module support
- **Replit Integration**: Specialized plugins for Replit development environment

### Database Schema
- **Users**: Authentication and profile management with role-based access
- **Menu System**: Categories and menu items with pricing, availability, and metadata
- **Order Management**: Orders with items, status tracking, and customer information
- **Address System**: User address management for delivery
- **Review System**: Customer feedback and ratings
- **Coupon System**: Promotional codes and discounts

The application uses a modern, type-safe architecture with shared schemas between client and server, ensuring consistency and reducing errors. The modular design allows for easy extension and maintenance of both customer-facing and administrative features.