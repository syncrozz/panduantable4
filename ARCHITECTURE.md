# Panduan Table 4 Architecture

## Philosophy

Simple Outside.
Powerful Inside.

## Golden Rules

- Data is the Product.
- Core Never Knows the UI.
- One File, One Responsibility.
- No Business Logic Inside UI.
- Content First. Renderer Second. UI Last.

## Core Flow

Manifest
↓
JsonLoader
↓
GuideService
↓
Search Engine
↓
Renderer
↓
Router
↓
UI