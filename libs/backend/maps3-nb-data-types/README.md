# @misiak-workspace/maps3-nb-data-types

**Type definitions for the NB Maps API response.**

## Overview

This library contains the TypeScript interfaces modeling the JSON structure returned by the external NB Maps API:

```
GET https://api.sdfsdf.net/api/maps?loginkey=…&city=…&details=…&bikes=…&format=json
```

Use these interfaces to strongly type your HTTP calls and data handling in any service or application.

## Contents

- **`src/lib/models.ts`**  
  Defines interfaces for:
    - `Country`
    - `City`
    - `Place`
    - `Bounds`, `Coordinate`
    - `BikeTypes`, `BikeList`, `BikeTypes2`

- **`src/lib/response.interface.ts`**
  ```ts
  export interface MapsApiResponse {
    countries: Country[];
  }
  ```

- **`src/index.ts`**  
  Re-exports all types from the `lib` folder.

## Usage

```ts
import { MapsApiResponse, Country, City, Place }
  from '@misiak-workspace/maps3-nb-data-types';
```

Then fetch and type the response:

```ts
const response = await httpService.get<MapsApiResponse>(url).toPromise();
console.log(response.data.countries[0].cities);
```
