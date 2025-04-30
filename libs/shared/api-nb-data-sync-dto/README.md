# @misiak-workspace/api-nb-data-sync-dtos

**Shared DTOs for the API-NB-Data-Sync service.**

## Overview

This library holds the Data Transfer Objects used by the `api-nb-data-sync` NestJS application—specifically the DTO returned by the `/places` endpoint.

## Contents

- **`src/lib/station-summary.dto.ts`**
  ```ts
  export interface StationSummaryDto {
    domain: string;
    cityName: string;
    uid: number;
    name: string;
    number: number;
    bikes: number;
    bikesAvailableToRent: number;
  }
  ```

- **`src/index.ts`**  
  Re-exports all DTOs from the `lib` folder.

## Usage

```ts
import { StationSummaryDto }
  from '@misiak-workspace/api-nb-data-sync-dtos';
```

Use `StationSummaryDto` as the return type for `MapsService.getPlaces()` and the controller’s `@Get('places')` handler to ensure a consistent API contract.

## Why two libraries?

- **maps3-nb-data-types**  
  Contains raw API models for any service that needs the full external response.

- **api-nb-data-sync-dtos**  
  Exposes only the trimmed DTOs used by this specific service’s endpoint, separating internal data shapes from external API contracts.
