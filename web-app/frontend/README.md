# Raspberry Pi Server — Energy Monitoring Frontend (React SPA)

This Single-Page Application (SPA) provides an interactive household energy monitoring and analytics interface for the **Raspberry Pi Server** (*Bachelor's Thesis, UPM ETSI Informáticos*).

---

## Architecture & Design System

The application is built on **React 17** and follows the **Atomic Design** component hierarchy:

- **Atoms (`src/components/atoms/`)**: Fundamental UI building blocks:
  - `Alert`: Contextual feedback notifications (success, info, warning, danger).
  - `Button`: Standardized action buttons with theme variants (`primary`, `secondary`, `link`).
  - `Card`: Container components with `CardHeader`, `CardBody`, and `CardFooter`.
  - `Hamburger`: Responsive animated navigation toggle.
  - `Header`: Application header shell.
  - `Input`: Controlled input fields with validation and error states.
  - `Menu`: Navigation link bar.
  - `Spinner`: Loading indicator.
  - `Symbol`: SVG icon primitives.
- **Molecules (`src/components/molecules/`)**: Composite UI widgets:
  - `RecordChart`: Interactive Chart.js time-series visualization for consumption (kWh), price (€/kWh), and cost (€).
  - `RecordForm`: Controlled form component for creating and editing daily energy records.
  - `RecordTable`: Tabular view of historical records with direct edit and delete actions.
- **Pages (`src/pages/`)**: Route-level views:
  - `Home`: System status dashboard displaying live backend API health and quick-action cards.
  - `Records`: Main energy management view featuring synchronized chart, table, and form toggles.
  - `Components`: Living styleguide showcase displaying all atomic components.

---

## API Integration

Network requests are managed via `src/config/api.js`:
- In **development**, API calls proxy to `http://localhost:44380/api/v1` (configured via `package.json` proxy).
- In **production**, API calls resolve to `/api/v1` routed through Nginx reverse proxy.

---

## Available Scripts

In this directory, you can run:

### `npm start`
Runs the development server on `http://localhost:3000`.

### `npm test`
Launches the test runner using Jest and React Testing Library.

### `npm run build`
Bundles the application into optimized static assets in the `build/` directory for deployment via Nginx.
